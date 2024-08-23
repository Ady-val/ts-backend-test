import { Request } from 'express';
import { ControllerMethod } from '../../../helpers/controller-method.decorator';
import { BrandsService } from '../../../services/brands.service';

const brandsService = new BrandsService();

export class BrandsController {
  constructor() {
    this.getBrands = this.getBrands.bind(this);
    this.getBrandsByModel = this.getBrandsByModel.bind(this);
    this.createNewBrand = this.createNewBrand.bind(this);
    this.addModelToBrand = this.addModelToBrand.bind(this);
  }

  @ControllerMethod({ errMsg: 'Error on get brands' })
  async getBrands(_req: Request) {
    return await brandsService.getBrands();
  }

  @ControllerMethod({ errMsg: 'Error on get brands by model' })
  async getBrandsByModel(req: Request) {
    const { id } = req.params;
    return await brandsService.getBrandsByModel(id);
  }

  @ControllerMethod({ errMsg: 'Error on create new brand' })
  async createNewBrand(req: Request) {
    const { name } = req.body;
    return await brandsService.createNewBrand({ name });
  }

  @ControllerMethod({ errMsg: 'Error on create model to brand' })
  async addModelToBrand(req: Request) {
    const { name, average_price } = req.body;
    const { id } = req.params;
    return await brandsService.createNewBrandModel(id, { name, average_price });
  }
}
