import { Market, markets } from "../../db/schema";
import { db }  from "../../db/db";

export class MarketRepository {

  public async fetchAll() : Promise<Market[]> {    
    return await db.select().from(markets);
  }

  public async create() {
    
  }

}
