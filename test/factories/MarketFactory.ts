import { db } from "../../db/db";
import { markets } from "../../db/schema";
import { faker } from '@faker-js/faker';

export class MarketFactory{
  
  static generate() {
    return {
      id: faker.string.uuid(),
      name: faker.company.name(),
    }      
  }

  static create(marketData) {
    return db.insert(markets).values(marketData).returning();
  }
}
