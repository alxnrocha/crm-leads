import bcrypt from 'bcryptjs';
import { sequelize, User, Stage, LeadSource, Lead, Activity } from '../models/index.js';
import { runMigrations } from './migrate.js';

async function clearAllTables() {
  // Vacía todas las tablas respetando las claves foráneas (DDL y DML)
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
  for (const table of ['activities', 'leads', 'lead_sources', 'stages', 'users']) {
    await sequelize.query(`TRUNCATE TABLE \`${table}\``);
  }
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
}

async function seed() {
  console.log('🌱 Iniciando población de datos de demostración (Seed)...');

  try {
    // Asegurar que el esquema esté al día mediante migraciones versionadas
    await runMigrations();
    console.log('✅ Esquema de base de datos actualizado vía migraciones.');

    await clearAllTables();
    console.log('✅ Tablas vaciadas correctamente.');

    // 1. Crear Usuarios
    const hashedPassword = await bcrypt.hash('Password123!', 10);
    const users = await User.bulkCreate([
      {
        id: 1,
        name: 'Carlos Gómez',
        email: 'carlos.gomez@leadflow.io',
        password_hash: hashedPassword,
        role: 'admin',
        avatar_url:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      },
      {
        id: 2,
        name: 'Elena Navarro',
        email: 'elena.navarro@leadflow.io',
        password_hash: hashedPassword,
        role: 'sales',
        avatar_url:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      },
      {
        id: 3,
        name: 'Marc Serrat',
        email: 'marc.serrat@leadflow.io',
        password_hash: hashedPassword,
        role: 'sales',
        avatar_url:
          'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      },
    ]);
    console.log(`✅ ${users.length} usuarios creados.`);

    // 2. Crear Etapas del Pipeline
    const stages = await Stage.bulkCreate([
      { id: 1, name: 'Nuevo', order_index: 1, color: '#0ea5e9', is_won: false, is_lost: false },
      {
        id: 2,
        name: 'En Contacto',
        order_index: 2,
        color: '#f59e0b',
        is_won: false,
        is_lost: false,
      },
      {
        id: 3,
        name: 'Calificado',
        order_index: 3,
        color: '#8b5cf6',
        is_won: false,
        is_lost: false,
      },
      { id: 4, name: 'Propuesta', order_index: 4, color: '#6366f1', is_won: false, is_lost: false },
      { id: 5, name: 'Ganado', order_index: 5, color: '#10b981', is_won: true, is_lost: false },
      { id: 6, name: 'Perdido', order_index: 6, color: '#f43f5e', is_won: false, is_lost: true },
    ]);
    console.log(`✅ ${stages.length} etapas de pipeline creadas.`);

    // 3. Crear Canales de Origen
    const sources = await LeadSource.bulkCreate([
      { id: 1, name: 'Sitio Web Orgánico' },
      { id: 2, name: 'Campaña Google Ads' },
      { id: 3, name: 'Meta Ads B2B' },
      { id: 4, name: 'Recomendación B2B' },
      { id: 5, name: 'Evento Comercial Barcelona' },
    ]);
    console.log(`✅ ${sources.length} canales de captación creados.`);

    // 4. Crear Leads
    const leads = await Lead.bulkCreate([
      {
        id: 1,
        user_id: 2,
        stage_id: 1,
        source_id: 1,
        company_name: 'InnovaTech Solutions S.L.',
        contact_name: 'Sofía Balaguer',
        email: 'sofia.b@innovatech.es',
        phone: '+34 932 112 344',
        value_amount: 18500.0,
        priority: 'high',
        notes: 'Interesados en automatización de procesos para 40 usuarios.',
      },
      {
        id: 2,
        user_id: 2,
        stage_id: 1,
        source_id: 2,
        company_name: 'Barcelona Logística Global',
        contact_name: 'Jordi Mas',
        email: 'j.mas@bcnlogistics.com',
        phone: '+34 934 556 789',
        value_amount: 24000.0,
        priority: 'medium',
        notes: 'Solicitó información mediante landing de Google Ads.',
      },
      {
        id: 3,
        user_id: 3,
        stage_id: 2,
        source_id: 3,
        company_name: 'Mediterráneo Retail Group',
        contact_name: 'Clara Valls',
        email: 'cvalls@medretail.cat',
        phone: '+34 931 889 001',
        value_amount: 32000.0,
        priority: 'high',
        notes: 'Primera llamada realizada; requiere demostración técnica en directo.',
      },
      {
        id: 4,
        user_id: 2,
        stage_id: 2,
        source_id: 4,
        company_name: 'Consultores Ibérica',
        contact_name: 'Pablo Alarcón',
        email: 'p.alarcon@ciberica.es',
        phone: '+34 911 223 344',
        value_amount: 12500.0,
        priority: 'low',
        notes: 'Recomendado por cliente actual. Presupuesto aprobado para Q4.',
      },
      {
        id: 5,
        user_id: 3,
        stage_id: 3,
        source_id: 1,
        company_name: 'Finanzas & Cloud Digital',
        contact_name: 'Laura Puig',
        email: 'lpuig@finanzacloud.es',
        phone: '+34 933 445 566',
        value_amount: 45000.0,
        priority: 'high',
        notes: 'Reunión de discovery completada. Cumplen todos los criterios B2B.',
      },
      {
        id: 6,
        user_id: 2,
        stage_id: 3,
        source_id: 5,
        company_name: 'Hotel Arts Suites BCN',
        contact_name: 'Mateo Riera',
        email: 'mriera@artsbcn.com',
        phone: '+34 932 998 877',
        value_amount: 19800.0,
        priority: 'medium',
        notes: 'Contacto obtenido en el Mobile World Congress.',
      },
      {
        id: 7,
        user_id: 3,
        stage_id: 4,
        source_id: 1,
        company_name: 'Clínica Dental Diagonal',
        contact_name: 'Dra. Marta Vidal',
        email: 'mvidal@diagonalclinic.es',
        phone: '+34 935 667 788',
        value_amount: 8900.0,
        priority: 'medium',
        notes: 'Propuesta formal enviada; esperando feedback del comité de compras.',
      },
      {
        id: 8,
        user_id: 2,
        stage_id: 4,
        source_id: 2,
        company_name: 'Distribuciones Gràcia',
        contact_name: 'Albert Bosch',
        email: 'abosch@distgracia.cat',
        phone: '+34 937 112 233',
        value_amount: 27500.0,
        priority: 'high',
        notes: 'Revisando términos comerciales del contrato de servicio anual.',
      },
      {
        id: 9,
        user_id: 3,
        stage_id: 5,
        source_id: 4,
        company_name: 'Construcciones Eixample S.A.',
        contact_name: 'Ramon Casals',
        email: 'casals@eixamplebuild.com',
        phone: '+34 938 334 455',
        value_amount: 38000.0,
        priority: 'high',
        notes: 'Contrato firmado por 2 años con soporte premium.',
      },
      {
        id: 10,
        user_id: 2,
        stage_id: 5,
        source_id: 1,
        company_name: 'Agencia Creativa Zenith',
        contact_name: 'Nuria Font',
        email: 'nuria@zenithcreativa.es',
        phone: '+34 931 445 577',
        value_amount: 15200.0,
        priority: 'medium',
        notes: 'Implementación en curso; pago del anticipo recibido.',
      },
      {
        id: 11,
        user_id: 3,
        stage_id: 6,
        source_id: 2,
        company_name: 'Transportes Sant Martí',
        contact_name: 'Vicente Ortiz',
        email: 'vortiz@tsantmarti.es',
        phone: '+34 933 778 899',
        value_amount: 9500.0,
        priority: 'low',
        notes: 'Decidieron aplazar la digitalización por recorte presupuestario.',
      },
    ]);
    console.log(`✅ ${leads.length} prospectos comerciales creados.`);

    // 5. Crear Actividades
    const now = new Date();
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
    const twoDaysAhead = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);

    const activities = await Activity.bulkCreate([
      {
        id: 1,
        lead_id: 1,
        user_id: 2,
        type: 'email',
        summary: 'Envío de dossier corporativo y catálogo de servicios',
        scheduled_at: twoDaysAgo,
        completed_at: twoDaysAgo,
      },
      {
        id: 2,
        lead_id: 3,
        user_id: 3,
        type: 'call',
        summary: 'Llamada de prospección inicial de 15 minutos',
        scheduled_at: threeDaysAgo,
        completed_at: threeDaysAgo,
      },
      {
        id: 3,
        lead_id: 3,
        user_id: 3,
        type: 'meeting',
        summary: 'Demostración de producto por videollamada',
        scheduled_at: twoDaysAhead,
        completed_at: null,
      },
      {
        id: 4,
        lead_id: 5,
        user_id: 3,
        type: 'meeting',
        summary: 'Reunión de análisis de requerimientos técnicos',
        scheduled_at: twoDaysAgo,
        completed_at: twoDaysAgo,
      },
      {
        id: 5,
        lead_id: 9,
        user_id: 3,
        type: 'meeting',
        summary: 'Firma de contrato y kick-off de integración',
        scheduled_at: threeDaysAgo,
        completed_at: threeDaysAgo,
      },
    ]);
    console.log(`✅ ${activities.length} actividades comerciales registradas.`);

    console.log('\n🎉 ¡Población de datos completada con éxito!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error durante el seed:', error);
    process.exit(1);
  }
}

seed();
