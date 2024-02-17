import { Request, Response } from 'express'
import { MarketRepository } from '../repositories/MarketRepository';
import { MarketService } from '../services/MarketService';
import { insertMarketSchema } from '../../db/schema';
import { formatZodError } from '../utils/formatErrors';
import { ZodError } from 'zod';

class MarketController {

  private repository: MarketRepository;
  private service: MarketService;

  constructor (repository: MarketRepository, service: MarketService) {
    this.repository = repository;
    this.service = service;
  }
  
  public async index(req: Request, res: Response) {
    const markets = await this.repository.fetchAll();
    return res.status(200).json(markets);
  }  
  
  public async create(req: Request, res: Response) {

    const body = insertMarketSchema.safeParse(req.body);

    if (!body.success) {
      const error = body.error;
      res.status(400).json({
        error: formatZodError(error)
      });
      return;
    }
    
    try {

      const createdMarket = await this.service.create(body.data.name);
      res.status(201).json({
        market: createdMarket
      });
      
    } catch (error) {
      
      res.status(500).json({
        error: {
          message: "Failed to create market",
        },
      });
    }
  }
}

export default new MarketController(new MarketRepository(), new MarketService());
