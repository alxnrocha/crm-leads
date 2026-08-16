-- ============================================================================
-- LeadFlow CRM — Database Schema DDL
-- Target RDBMS: MySQL 8.4 LTS
-- Character Set: utf8mb4 (Collation: utf8mb4_unicode_ci)
-- ============================================================================

CREATE DATABASE IF NOT EXISTS `crm_leads_db`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `crm_leads_db`;

-- ----------------------------------------------------------------------------
-- Table: users (Comerciales y Administradores)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('admin', 'sales') NOT NULL DEFAULT 'sales',
  `avatar_url` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_users_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: stages (Fases del Pipeline de Ventas)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `stages` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL,
  `order_index` INT UNSIGNED NOT NULL DEFAULT 0,
  `color` VARCHAR(20) NOT NULL DEFAULT '#6366f1',
  `is_won` BOOLEAN NOT NULL DEFAULT FALSE,
  `is_lost` BOOLEAN NOT NULL DEFAULT FALSE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_stages_order` (`order_index`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: lead_sources (Canales de Captación)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `lead_sources` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL UNIQUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: leads (Prospectos Comerciales y Oportunidades)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `leads` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNSIGNED NULL,
  `stage_id` INT UNSIGNED NOT NULL,
  `source_id` INT UNSIGNED NULL,
  `company_name` VARCHAR(150) NOT NULL,
  `contact_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(30) NULL,
  `value_amount` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `priority` ENUM('low', 'medium', 'high') NOT NULL DEFAULT 'medium',
  `notes` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_leads_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_leads_stage`
    FOREIGN KEY (`stage_id`) REFERENCES `stages` (`id`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_leads_source`
    FOREIGN KEY (`source_id`) REFERENCES `lead_sources` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE,
  INDEX `idx_leads_user` (`user_id`),
  INDEX `idx_leads_stage` (`stage_id`),
  INDEX `idx_leads_priority` (`priority`),
  INDEX `idx_leads_company` (`company_name`),
  INDEX `idx_leads_email` (`email`),
  INDEX `idx_leads_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: activities (Historial de Interacciones y Tareas Comerciales)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `activities` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `lead_id` INT UNSIGNED NOT NULL,
  `user_id` INT UNSIGNED NULL,
  `type` ENUM('call', 'meeting', 'email', 'note') NOT NULL,
  `summary` VARCHAR(255) NOT NULL,
  `scheduled_at` DATETIME NULL,
  `completed_at` DATETIME NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_activities_lead`
    FOREIGN KEY (`lead_id`) REFERENCES `leads` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_activities_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE,
  INDEX `idx_activities_lead` (`lead_id`),
  INDEX `idx_activities_user` (`user_id`),
  INDEX `idx_activities_type` (`type`),
  INDEX `idx_activities_scheduled` (`scheduled_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
