import { Router } from 'express';
import { brandsModelsRouter } from './routes/brand-models/brand-models.router';
import { brandsRouter } from './routes/brands/brands.router';

const router = Router();

router.use('/brands', brandsRouter.getRouterObj());
router.use('/models', brandsModelsRouter.getRouterObj());

export { router };
