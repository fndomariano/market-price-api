import { v4 as uuidv4 } from 'uuid';
import { insertMarketSchema, markets, InsertMarket } from "../../db/schema";
import { db } from '../../db/db';

export class MarketService {
  
  public async add(data : InsertMarket) {
    
      const id = uuidv4()

      const market = insertMarketSchema.safeParse({
        ...data,
        id
      });


      if (market.success)
        await db.insert(markets).values(market.data);
    
    
    
  }
}
