import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { uuid, pgTable, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const markets = pgTable('markets', {
  id: uuid('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
});

export const insertMarketSchema = createInsertSchema(markets, {
  id: z.string().uuid(),
  name: z.string().transform(value => value.replace(/\s+/g, ''))
    .pipe(z.string().min(1, { message: 'This field is required' }))
});

export type Market = InferSelectModel<typeof markets>
export type InsertMarket = z.infer<typeof insertMarketSchema>

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
