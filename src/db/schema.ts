import { mysqlTable } from 'drizzle-orm/mysql-core';
import { varchar, boolean, timestamp, text } from 'drizzle-orm/mysql-core';

export const user = mysqlTable('user', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: text('name').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: boolean('emailVerified').notNull(),
  image: text('image'),
  createdAt: timestamp('createdAt', { mode: 'date', fsp: 3 }).notNull(),
  updatedAt: timestamp('updatedAt', { mode: 'date', fsp: 3 }).notNull()
});

export const session = mysqlTable('session', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  token: varchar('token', { length: 255 }).notNull().unique(),
  expiresAt: timestamp('expiresAt', { mode: 'date', fsp: 3 }).notNull(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  createdAt: timestamp('createdAt', { mode: 'date', fsp: 3 }).notNull(),
  updatedAt: timestamp('updatedAt', { mode: 'date', fsp: 3 }).notNull()
});

export const account = mysqlTable('account', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt', { mode: 'date', fsp: 3 }),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt', { mode: 'date', fsp: 3 }),
  scope: text('scope'),
  idToken: text('idToken'),
  password: text('password'),
  createdAt: timestamp('createAt', { mode: 'date', fsp: 3 }).notNull(),
  updatedAt: timestamp('updatedAt', { mode: 'date', fsp: 3 }).notNull()
});

export const verification = mysqlTable('verification', {
  id: varchar('id', { length: 36 }).primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt', { mode: 'date', fsp: 3 }).notNull(),
  createdAt: timestamp('createdAt', { mode: 'date', fsp: 3 }).notNull(),
  updatedAt: timestamp('updatedAt', { mode: 'date', fsp: 3 }).notNull()
});
