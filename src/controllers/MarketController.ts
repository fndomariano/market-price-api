import { Request, Response } from 'express'
import { MarketRepository } from '../repositories/MarketRepository';
import { formatZodError } from '../utils/formatErrors';
import { StatusCode } from '../utils/statusCode';
import { requestMarketSchema } from '../../db/schema';
import { HttpNotFoundError } from '../errors/HttpNotFoundError';

class MarketController {

  private repository: MarketRepository;

  constructor (repository: MarketRepository) {
    this.repository = repository;
  }
  
  public async index(req: Request, res: Response) {
    
    try {
      
      const markets = await this.repository.findAll();

      return res.status(StatusCode.OK).json({ data: markets });

    } catch (error) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        error : "Failed to get markets."
      });
    }
    
  }  
  
  public async create(req: Request, res: Response) {

    const body = requestMarketSchema.safeParse(req.body);

    if (!body.success) {
      const error = body.error;
      res.status(StatusCode.BAD_REQUEST).json({
        error: formatZodError(error)
      });
      return;
    }
    
    try {
      const createdMarket = await this.repository.insert(body.data.name);

      res.status(StatusCode.CREATED).json({
        market: createdMarket
      });
      
    } catch (error) {
      
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        error: {
          message: "Failed to create market.",
        },
      });
    }
  }

  public async update(req: Request, res: Response) {
    
    const marketId = req.params.id;
  
    if (!marketId || typeof marketId !== "string") {
      res.status(StatusCode.BAD_REQUEST).json({
        error: "You must provide an ID."
      });
      return;
    }

    const body = requestMarketSchema.safeParse(req.body);

    if (!body.success) {
      const error = body.error;
      res.status(StatusCode.BAD_REQUEST).json({
        error: formatZodError(error)
      });
      return;
    }

    try {
      
      await this.repository.update(marketId, body.data.name);

      res.status(StatusCode.NO_CONTENT).send();

    } catch (error) {

      if (error instanceof HttpNotFoundError) {
        res.status(StatusCode.NOT_FOUND).json({
          error: {
            message: error.message,
          },
        });
        return;
      }

      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        error: {
          message: "Failed to update market.",
        },
      });
    }
  }

  public async delete(req: Request, res: Response) {
    const marketId = req.params.id;
  
    if (!marketId || typeof marketId !== "string") {
      res.status(StatusCode.BAD_REQUEST).json({
        error: "You must provide an ID."
      });
      return;
    }

    try {
      
      await this.repository.delete(marketId);

      res.status(StatusCode.NO_CONTENT).send();

    } catch (error) {

      if (error instanceof HttpNotFoundError) {
        res.status(StatusCode.NOT_FOUND).json({
          error: {
            message: error.message,
          },
        });
        return;
      }

      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        error: {
          message: "Failed to update market.",
        },
      });
    }
  } 
}

export default new MarketController(new MarketRepository());
