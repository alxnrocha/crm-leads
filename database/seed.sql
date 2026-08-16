-- ============================================================================
-- LeadFlow CRM — Initial Seed Data
-- Target RDBMS: MySQL 8.4 LTS
-- ============================================================================

USE `crm_leads_db`;

-- Disable foreign key checks for clean insertion
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE `activities`;
TRUNCATE TABLE `leads`;
TRUNCATE TABLE `lead_sources`;
TRUNCATE TABLE `stages`;
TRUNCATE TABLE `users`;
SET FOREIGN_KEY_CHECKS = 1;

-- ----------------------------------------------------------------------------
-- Seed: users (Password for all demo users is: 'Password123!')
-- BCrypt hash for 'Password123!' with 10 salt rounds
-- ----------------------------------------------------------------------------
INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `role`, `avatar_url`) VALUES
(1, 'Carlos Gómez', 'carlos.gomez@leadflow.io', '$2b$10$0kR1e4E5K8o7Z3qGvL9P9O9ZqB3fV2xS1kL5nQ9Z7vH3mP8iQjVla', 'admin', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'),
(2, 'Elena Navarro', 'elena.navarro@leadflow.io', '$2b$10$0kR1e4E5K8o7Z3qGvL9P9O9ZqB3fV2xS1kL5nQ9Z7vH3mP8iQjVla', 'sales', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'),
(3, 'Marc Serrat', 'marc.serrat@leadflow.io', '$2b$10$0kR1e4E5K8o7Z3qGvL9P9O9ZqB3fV2xS1kL5nQ9Z7vH3mP8iQjVla', 'sales', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80');

-- ----------------------------------------------------------------------------
-- Seed: stages (6 Fases del Pipeline)
-- ----------------------------------------------------------------------------
INSERT INTO `stages` (`id`, `name`, `order_index`, `color`, `is_won`, `is_lost`) VALUES
(1, 'Nuevo', 1, '#0ea5e9', FALSE, FALSE),
(2, 'En Contacto', 2, '#f59e0b', FALSE, FALSE),
(3, 'Calificado', 3, '#8b5cf6', FALSE, FALSE),
(4, 'Propuesta', 4, '#6366f1', FALSE, FALSE),
(5, 'Ganado', 5, '#10b981', TRUE, FALSE),
(6, 'Perdido', 6, '#f43f5e', FALSE, TRUE);

-- ----------------------------------------------------------------------------
-- Seed: lead_sources
-- ----------------------------------------------------------------------------
INSERT INTO `lead_sources` (`id`, `name`) VALUES
(1, 'Sitio Web Orgánico'),
(2, 'Campaña Google Ads'),
(3, 'Meta Ads B2B'),
(4, 'Recomendación B2B'),
(5, 'Evento Comercial Barcelona');

-- ----------------------------------------------------------------------------
-- Seed: leads
-- ----------------------------------------------------------------------------
INSERT INTO `leads` (`id`, `user_id`, `stage_id`, `source_id`, `company_name`, `contact_name`, `email`, `phone`, `value_amount`, `priority`, `notes`) VALUES
(1, 2, 1, 1, 'InnovaTech Solutions S.L.', 'Sofía Balaguer', 'sofia.b@innovatech.es', '+34 932 112 344', 18500.00, 'high', 'Interesados en automatización de procesos para 40 usuarios.'),
(2, 2, 1, 2, 'Barcelona Logística Global', 'Jordi Mas', 'j.mas@bcnlogistics.com', '+34 934 556 789', 24000.00, 'medium', 'Solicitó información mediante landing de Google Ads.'),
(3, 3, 2, 3, 'Mediterráneo Retail Group', 'Clara Valls', 'cvalls@medretail.cat', '+34 931 889 001', 32000.00, 'high', 'Primera llamada realizada; requiere demostración técnica en directo.'),
(4, 2, 2, 4, 'Consultores Ibérica', 'Pablo Alarcón', 'p.alarcon@ciberica.es', '+34 911 223 344', 12500.00, 'low', 'Recomendado por cliente actual. Presupuesto aprobado para Q4.'),
(5, 3, 3, 1, 'Finanzas & Cloud Digital', 'Laura Puig', 'lpuig@finanzacloud.es', '+34 933 445 566', 45000.00, 'high', 'Reunión de discovery completada. Cumplen todos los criterios B2B.'),
(6, 2, 3, 5, 'Hotel Arts Suites BCN', 'Mateo Riera', 'mriera@artsbcn.com', '+34 932 998 877', 19800.00, 'medium', 'Contacto obtenido en el Mobile World Congress.'),
(7, 3, 4, 1, 'Clínica Dental Diagonal', 'Dra. Marta Vidal', 'mvidal@diagonalclinic.es', '+34 935 667 788', 8900.00, 'medium', 'Propuesta formal enviada; esperando feedback del comité de compras.'),
(8, 2, 4, 2, 'Distribuciones Gràcia', 'Albert Bosch', 'abosch@distgracia.cat', '+34 937 112 233', 27500.00, 'high', 'Revisando términos comerciales del contrato de servicio anual.'),
(9, 3, 5, 4, 'Construcciones Eixample S.A.', 'Ramon Casals', 'casals@eixamplebuild.com', '+34 938 334 455', 38000.00, 'high', 'Contrato firmado por 2 años con soporte premium.'),
(10, 2, 5, 1, 'Agencia Creativa Zenith', 'Nuria Font', 'nuria@zenithcreativa.es', '+34 931 445 577', 15200.00, 'medium', 'Implementación en curso; pago del anticipo recibido.'),
(11, 3, 6, 2, 'Transportes Sant Martí', 'Vicente Ortiz', 'vortiz@tsantmarti.es', '+34 933 778 899', 9500.00, 'low', 'Decidieron aplazar la digitalización por recorte presupuestario.');

-- ----------------------------------------------------------------------------
-- Seed: activities (Interacciones y Tareas Comerciales)
-- ----------------------------------------------------------------------------
INSERT INTO `activities` (`id`, `lead_id`, `user_id`, `type`, `summary`, `scheduled_at`, `completed_at`) VALUES
(1, 1, 2, 'email', 'Envío de dossier corporativo y catálogo de servicios', NOW() - INTERVAL 2 DAY, NOW() - INTERVAL 2 DAY),
(2, 3, 3, 'call', 'Llamada de prospección inicial de 15 minutos', NOW() - INTERVAL 3 DAY, NOW() - INTERVAL 3 DAY),
(3, 3, 3, 'meeting', 'Demostración de producto por videollamada', NOW() + INTERVAL 2 DAY, NULL),
(4, 5, 3, 'meeting', 'Reunión de análisis de requerimientos técnicos', NOW() - INTERVAL 1 DAY, NOW() - INTERVAL 1 DAY),
(5, 5, 3, 'note', 'Cliente requiere exportación de datos en formato Excel y API abierta', NOW() - INTERVAL 1 DAY, NOW() - INTERVAL 1 DAY),
(6, 7, 3, 'email', 'Envío de propuesta económica v1.2 con descuento por pago anual', NOW() - INTERVAL 4 DAY, NOW() - INTERVAL 4 DAY),
(7, 8, 2, 'call', 'Llamada de negociación con el director financiero', NOW() + INTERVAL 1 DAY, NULL),
(8, 9, 3, 'meeting', 'Firma de contrato y kick-off de integración', NOW() - INTERVAL 5 DAY, NOW() - INTERVAL 5 DAY),
(9, 11, 3, 'call', 'Llamada de seguimiento para confirmar motivo de descarte', NOW() - INTERVAL 6 DAY, NOW() - INTERVAL 6 DAY);
