import { Router } from 'express';
import { GenericRouter } from '../../generic-router-abstract';
import { IGenericExpressRouter } from '../../generic-router.interface';
import { BrandsController } from './brands.controller';

const expressRouter = Router();
const brandsController = new BrandsController();

class BrandsRouter extends GenericRouter implements IGenericExpressRouter {
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
    expressRouter.get('/', brandsController.getBrands);
    expressRouter.get('/:id/models', brandsController.getBrandsByModel);
    expressRouter.post('/', brandsController.createNewBrand);
    expressRouter.post('/:id/models', brandsController.addModelToBrand);
  }
}

const brandsRouter = new BrandsRouter('Brands', expressRouter);

export { brandsRouter };
