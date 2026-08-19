-- Migration 0004: create `leads` table
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