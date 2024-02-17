import { v4 as uuidv4 } from 'uuid';
import { markets } from "../../db/schema";
import { db } from '../../db/db';

export class MarketService {
  
  public async create(name : string) {
    
    const id = uuidv4()

    const newMarket = await db.insert(markets).values({ id, name}).returning();

    return newMarket[0];
  }

  
}
