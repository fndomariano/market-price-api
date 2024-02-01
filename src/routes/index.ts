import { Router } from 'express'
import IndexController from '../controllers/IndexController';
import marketRoutes from './market';

const routes = Router();

routes.get('/', IndexController.index)
routes.use('/market', marketRoutes);

export default routes;
