import { Router } from 'express';
import { GenericRouter } from '../../generic-router-abstract';
import { IGenericExpressRouter } from '../../generic-router.interface';
import { BrandsModelsController } from './brand-models.controller';

const expressRouter = Router();
const brandsModelsController = new BrandsModelsController();

class BrandsModelsRouter extends GenericRouter implements IGenericExpressRouter {
  constructor(
    public readonly resourceName: string,
    protected readonly expressRouter: Router
  ) {
    super(resourceName, expressRouter);
    this.middleware();
    this.enable();
    this.errorHandler();
  }

  enable() {
    expressRouter.get('/', brandsModelsController.getModelsByAveragePriceRange);
    expressRouter.put('/:id', brandsModelsController.editModel);
  }
}

const brandsModelsRouter = new BrandsModelsRouter('BrandsModels', expressRouter);

export { brandsModelsRouter };
