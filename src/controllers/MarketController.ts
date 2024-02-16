import { Request, Response } from 'express'
import { MarketRepository } from '../repositories/MarketRepository';
import { MarketService } from '../services/MarketService';

class MarketController {

  private repository: MarketRepository;
  private service: MarketService;

  constructor (repository: MarketRepository, service: MarketService) {
    this.repository = repository;
    this.service = service;
  }
  
  async index(req: Request, res: Response): Promise<Response> {
    const markets = await this.repository.fetchAll();
    return res.status(200).json(markets);
  }  
  
  public async add(req: Request, res: Response) {
    try {
      await this.service.add(req.body);
      res.status(201).json("The market was registered successfully.");
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

export default new MarketController(new MarketRepository(), new MarketService());
