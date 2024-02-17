import { Router, Request, Response } from 'express'
import MarketController from '../controllers/MarketController'

const marketRoutes = Router();

marketRoutes.get('/', (req: Request, res: Response) => MarketController.index(req, res));
marketRoutes.post('/', (req: Request, res: Response) => MarketController.create(req, res));
  
export default marketRoutes;
