CREATE TABLE IF NOT EXISTS `deleted_accounts` (
  `id` text PRIMARY KEY NOT NULL,
  `deleted_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `photo_index` (
  `account_id` text NOT NULL,
  `hash` text NOT NULL,
  `content_type` text,
  `location` text,
  `created_at` text NOT NULL,
  PRIMARY KEY(`account_id`, `hash`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `idempotency_keys` (
  `account_id` text NOT NULL,
  `key` text NOT NULL,
  `response` text NOT NULL,
  PRIMARY KEY(`account_id`, `key`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `apple_subjects` (
  `sub` text PRIMARY KEY NOT NULL,
  `account_id` text NOT NULL
);
