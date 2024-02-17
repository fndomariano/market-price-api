import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { uuid, pgTable, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const markets = pgTable('markets', {
  id: uuid('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
});

export const selectMarketSchema = createSelectSchema(markets);
export const insertMarketSchema = createInsertSchema(markets, {
  id: z.string().uuid(),
  name: z.string().trim().min(1)
});

export const requestMarketSchema = insertMarketSchema.pick({ name: true });
export type Market = z.infer<typeof selectMarketSchema>;
export type InsertMarket = z.infer<typeof insertMarketSchema>;

// =================================================================

export const products = pgTable('products', {
  id: uuid('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
});

export type Product = InferSelectModel<typeof products>
export type InsertProduct = InferInsertModel<typeof products>

// =================================================================

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull(),
  password: varchar('password', { length: 256 }).notNull(),
});

export type User = InferSelectModel<typeof users>
export type InsertUser = InferInsertModel<typeof users>

// =================================================================
