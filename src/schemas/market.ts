import { z as schema } from "zod";

export const MarketSchema = schema.object({
  id: schema.string().uuid(),
  content: schema.string(),
});

export type Market = schema.infer<typeof MarketSchema>;
