import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal, Button, Input, Select } from '../ui/index.js';
import { Lead, Stage } from '../../types/pipeline.types.js';
import { Building2, User, Mail, Phone, DollarSign, Sparkles } from 'lucide-react';

const leadFormSchema = z.object({
  company_name: z.string().min(2, 'El nombre de empresa debe tener al menos 2 caracteres'),
  contact_name: z.string().min(2, 'El nombre de contacto debe tener al menos 2 caracteres'),
  email: z.string().email('Debe introducir un correo electrónico válido'),
  phone: z.string().optional(),
  value_amount: z.number().min(0, 'El valor no puede ser negativo'),
  stage_id: z.number().int().positive('Debe seleccionar una etapa'),
  priority: z.enum(['low', 'medium', 'high']),
  notes: z.string().optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LeadFormData) => Promise<void>;
  stages: Stage[];
  initialData?: Lead | null;
  isLoading?: boolean;
}

export const LeadFormModal: React.FC<LeadFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  stages,
  initialData,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      company_name: '',
      contact_name: '',
      email: '',
      phone: '',
      value_amount: 15000,
      stage_id: 1,
      priority: 'medium',
      notes: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        company_name: initialData.company_name,
        contact_name: initialData.contact_name,
        email: initialData.email,
        phone: initialData.phone || '',
        value_amount: initialData.value_amount,
        stage_id: initialData.stage_id,
        priority: initialData.priority,
        notes: initialData.notes || '',
      });
    } else {
      reset({
        company_name: '',
        contact_name: '',
        email: '',
        phone: '',
        value_amount: 15000,
        stage_id: stages[0]?.id || 1,
        priority: 'medium',
        notes: '',
      });
    }
  }, [initialData, reset, stages, isOpen]);

  const handleFormSubmit = async (data: LeadFormData) => {
    await onSubmit(data);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Editar Prospecto Comercial' : 'Nuevo Prospecto Comercial'}
      description={
        initialData
          ? 'Actualice los datos comerciales y de contacto de la oportunidad.'
          : 'Introduzca los datos para registrar el nuevo lead en el pipeline.'
      }
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            size="sm"
            isLoading={isLoading}
            onClick={handleSubmit(handleFormSubmit)}
            leftIcon={<Sparkles className="w-4 h-4" />}
            className="bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20"
          >
            {initialData ? 'Guardar Cambios' : 'Crear Lead'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <Input
          label="Nombre de Empresa *"
          placeholder="Ej. BrightFuture SA"
          leftIcon={<Building2 className="w-4 h-4" />}
          error={errors.company_name?.message}
          {...register('company_name')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            label="Persona de Contacto *"
            placeholder="Sophie Martin"
            leftIcon={<User className="w-4 h-4" />}
            error={errors.contact_name?.message}
            {...register('contact_name')}
          />
          <Input
            label="Teléfono"
            placeholder="+33 6 12 34 56 78"
            leftIcon={<Phone className="w-4 h-4" />}
            error={errors.phone?.message}
            {...register('phone')}
          />
        </div>

        <Input
          label="Correo Electrónico *"
          type="email"
          placeholder="sophie.martin@brightfuture.fr"
          leftIcon={<Mail className="w-4 h-4" />}
          error={errors.email?.message}
          {...register('email')}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Input
            label="Valor Estimado (€) *"
            type="number"
            placeholder="15000"
            leftIcon={<DollarSign className="w-4 h-4" />}
            error={errors.value_amount?.message}
            {...register('value_amount', { valueAsNumber: true })}
          />

          <Select
            label="Etapa Inicial *"
            error={errors.stage_id?.message}
            options={stages.map((s) => ({ value: s.id, label: s.name }))}
            {...register('stage_id', { valueAsNumber: true })}
          />

          <Select
            label="Prioridad *"
            error={errors.priority?.message}
            options={[
              { value: 'low', label: 'Baja' },
              { value: 'medium', label: 'Media' },
              { value: 'high', label: 'Alta' },
            ]}
            {...register('priority')}
          />
        </div>
      </form>
    </Modal>
  );
};
