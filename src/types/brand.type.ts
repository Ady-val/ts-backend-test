export type TBrand = {
  id: string;
  name: string;
};

export type TNewBrand = Omit<TBrand, 'id'>;

export type TBrandsModels = {
  id: string;
  name: string;
  average_price?: number;
  brand_name: string;
};

export type TNewBrandModel = Omit<TBrandsModels, 'id' | 'brand_name'>;
