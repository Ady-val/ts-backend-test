import { TryCatch } from '../helpers/try-catch.decorator';
import { BrandModels } from '../models/brand-models.model';
import { Brand } from '../models/brands.model';
import { TBrand, TBrandsModels, TNewBrand } from '../types/brand.type';

export class BrandsService {
  @TryCatch('Error on get brands models')
  async getBrands(): Promise<TBrandsModels[]> {
    const brandsModels = await BrandModels.aggregate([
      {
        $project: {
          _id: 0,
          id: '$_id',
          name: 1,
          average_price: 1,
          brand_name: 1
        }
      }
    ]);
    return brandsModels;
  }

  @TryCatch('Error on get brands models by model')
  async getBrandsByModel(id: string): Promise<TBrandsModels[]> {
    const model = await Brand.findById(id);

    if (!model) {
      throw {
        status: 400,
        message: 'Brand does not exists'
      };
    }

    const brandsModels = await BrandModels.aggregate([
      {
        $match: { brand_name: model.name }
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          name: 1,
          average_price: 1,
          brand_name: 1
        }
      }
    ]);
    return brandsModels;
  }

  @TryCatch('Error on create new brand')
  async createNewBrand(brand: TNewBrand): Promise<TBrand> {
    if (!brand.name) {
      throw {
        status: 400,
        message: 'Brand name is required'
      };
    }

    const brandExist = await Brand.findOne({ name: brand.name });

    if (brandExist) {
      throw {
        status: 400,
        message: 'Brand already exists'
      };
    }

    const newBrand = Brand.build(brand);

    await newBrand.save();

    return {
      id: newBrand.id.toString(),
      name: newBrand.name
    };
  }

  @TryCatch('Error on create new brand model')
  async createNewBrandModel(
    brandId: string,
    brandModel: { name: string; average_price?: number }
  ): Promise<TBrandsModels> {
    const brandExist = await Brand.findById(brandId);

    if (!brandExist) {
      throw {
        status: 400,
        message: 'Brand does not exists'
      };
    }

    if (!brandModel.name) {
      throw {
        status: 400,
        message: 'Brand name are required'
      };
    }

    const brandModelExist = await BrandModels.findOne({
      name: brandModel.name,
      brand_name: brandExist.name
    });

    if (brandModelExist) {
      throw {
        status: 400,
        message: 'Brand model already exists'
      };
    }

    if (brandModel.average_price) {
      if (brandModel.average_price < 100000) {
        throw {
          status: 400,
          message: 'Average price must be greater than 100000'
        };
      }
    }

    const newBrandModel = BrandModels.build({
      name: brandModel.name,
      average_price: brandModel.average_price,
      brand_name: brandExist.name
    });

    await newBrandModel.save();

    return {
      id: newBrandModel.id.toString(),
      name: newBrandModel.name,
      average_price: newBrandModel.average_price,
      brand_name: newBrandModel.brand_name
    };
  }
}
