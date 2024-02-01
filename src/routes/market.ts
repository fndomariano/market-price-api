import { Router } from 'express'
import MarketController from '../controllers/MarketController'

const marketRoutes = Router();

marketRoutes.use('/', MarketController.index);

export default marketRoutes;
