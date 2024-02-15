import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { uuid, pgTable, varchar } from 'drizzle-orm/pg-core';

export const markets = pgTable('markets', {
  id: uuid('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
});

export type Market = InferSelectModel<typeof markets>
export type InsertMarket = InferInsertModel<typeof markets>

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
