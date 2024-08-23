import { Request } from 'express';
import { ControllerMethod } from '../../../helpers/controller-method.decorator';
import { BrandsModelsService } from '../../../services/brands-models.service';

const brandsModelsService = new BrandsModelsService();

export class BrandsModelsController {
  constructor() {
    this.editModel = this.editModel.bind(this);
    this.getModelsByAveragePriceRange = this.getModelsByAveragePriceRange.bind(this);
  }

  @ControllerMethod({ errMsg: 'Error on edit model' })
  async editModel(req: Request) {
    const { id } = req.params;
    const { average_price } = req.body;

    const brandModel = await brandsModelsService.editAveragePriceModel(id, average_price);
    return brandModel;
  }

  @ControllerMethod({ errMsg: 'Error on get models by average price range' })
  async getModelsByAveragePriceRange(req: Request) {
    const { greater, lower } = req.query;

    const models = await brandsModelsService.getBrandsModelsByAveragePriceRange(
      Number(greater),
      Number(lower)
    );
    return models;
  }
}
