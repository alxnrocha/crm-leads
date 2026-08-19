-- Migration 0005: create `activities` table
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