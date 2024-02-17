import { v4 as uuidv4 } from 'uuid';
import { InsertMarket, Market, insertMarketSchema, markets, selectMarketSchema } from "../../db/schema";
import { db }  from "../../db/db";
import { eq } from 'drizzle-orm';
import { HttpNotFoundError } from '../errors/HttpNotFoundError';

export class MarketRepository {

  public async insert(name : string) : Promise<InsertMarket> {
    const id = uuidv4()

    const newMarket = await db.insert(markets).values({ id, name }).returning();
    
    return insertMarketSchema.parse(newMarket[0]);
  }

  public async update(id : string, name: string) : Promise<void> {
    const market = await this.findByIdOrThrowNotFound(id);
    if (market !== null) 
      await db.update(markets).set({ name }).where(eq(markets.id, market.id));
  }

  public async delete(id : string) : Promise<void> {
    const market = await this.findByIdOrThrowNotFound(id);
    if (market !== null) 
      await db.delete(markets).where(eq(markets.id, market.id));
  }

  public async findAll(page?:number, pageSize?:number) : Promise<Market[]> {

    const currentPage: number = page || 1;
    const currentLimit: number = pageSize || 10;
    const offset: number = (currentPage - 1) * currentLimit;

    const query = await db.select()
      .from(markets)
      .limit(currentLimit)
      .offset(offset)
      .orderBy(markets.name);


    return selectMarketSchema.array().parse(query);
  }

  public async findByIdOrThrowNotFound(id : string) : Promise<Market> {    
    const market = await db.select().from(markets).where(eq(markets.id, id));

    if (!market.length)
      throw new HttpNotFoundError('Market not found.')

    return selectMarketSchema.parse(market[0]);
  }
}
