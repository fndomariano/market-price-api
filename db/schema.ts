import { uuid, pgTable, varchar } from 'drizzle-orm/pg-core';

export const markets = pgTable('markets', {
  id: uuid('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
});


export const products = pgTable('products', {
  id: uuid('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
});
