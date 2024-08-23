import { TryCatch } from '../helpers/try-catch.decorator';
import { BrandModels } from '../models/brand-models.model';
import { TBrandsModels } from '../types/brand.type';

export class BrandsModelsService {
  @TryCatch('Error on edit average price model')
  async editAveragePriceModel(id: string, averagePrice: number): Promise<TBrandsModels> {
    const brandModel = await BrandModels.findById(id);

    if (!brandModel) {
      throw {
        status: 400,
        message: 'Brand model does not exists'
      };
    }

    if (!averagePrice) {
      throw {
        status: 400,
        message: 'Average price is required'
      };
    }

    if (averagePrice < 100000) {
      throw {
        status: 400,
        message: 'Average price must be greater than 100000'
      };
    }

    brandModel.average_price = averagePrice;

    await brandModel.save();

    return {
      id: brandModel.id.toString(),
      name: brandModel.name,
      average_price: brandModel.average_price,
      brand_name: brandModel.brand_name
    };
  }

  @TryCatch('Error on get brands models by average price range')
  async getBrandsModelsByAveragePriceRange(
    greater: number,
    lower: number
  ): Promise<TBrandsModels[]> {
    if (!greater || !lower) {
      throw {
        status: 400,
        message: 'Greater and lower prices are required'
      };
    }

    if (greater < 100000) {
      throw {
        status: 400,
        message: 'Greater price must be greater than 100000'
      };
    }

    const brandsModels = await BrandModels.find({
      average_price: { $gte: greater, $lte: lower }
    }).sort({ average_price: 1 });

    return brandsModels.map(brandModel => ({
      id: brandModel.id.toString(),
      name: brandModel.name,
      average_price: brandModel.average_price,
      brand_name: brandModel.brand_name
    }));
  }
}
