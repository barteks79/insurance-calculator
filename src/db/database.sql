CREATE TABLE IF NOT EXISTS `user` (
	`id` varchar(36) NOT NULL PRIMARY KEY,
	`name` text NOT NULL,
	`email` varchar(255) NOT NULL UNIQUE,
	`emailVerified` boolean NOT NULL,
	`image` text,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `session` (
	`id` varchar(36) NOT NULL PRIMARY KEY,
	`userId` varchar(36) NOT NULL,
	`token` varchar(255) NOT NULL UNIQUE,
	`expiresAt` timestamp(3) NOT NULL,
	`ipAddress` text,
	`userAgent` text,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `account` (
	`id` varchar(36) NOT NULL PRIMARY KEY,
	`userId` varchar(36) NOT NULL,
	`accountId` text NOT NULL,
	`providerId` text NOT NULL,
	`accessToken` text,
	`refreshToken` text,
	`accessTokenExpiresAt` timestamp(3) NULL,
	`refreshTokenExpiresAt` timestamp(3) NULL,
	`scope` text,
	`idToken` text,
	`password` text,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `verification` (
	`id` varchar(36) NOT NULL PRIMARY KEY,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expiresAt` timestamp(3) NOT NULL,
	`createdAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);