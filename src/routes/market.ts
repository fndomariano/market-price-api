import { Router, Request, Response } from 'express'
import MarketController from '../controllers/MarketController'

const marketRoutes = Router();

marketRoutes.get('/', async (req: Request, res: Response) =>{
  await MarketController.index(req, res);
});
  
export default marketRoutes;
