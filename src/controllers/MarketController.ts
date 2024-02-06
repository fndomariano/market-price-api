import { Request, Response } from 'express'
import { MarketRepository } from '../repositories/MarketRepository';

class MarketController {

  private repository: MarketRepository;

  constructor (repository: MarketRepository) {
    this.repository = repository;
  }
  
  async index(req: Request, res: Response): Promise<Response> {

    const markets = await this.repository.fetchAll();
    
    return res.json(markets);
  }
}

export default new MarketController(new MarketRepository());
