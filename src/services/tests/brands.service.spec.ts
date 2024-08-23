import { Brand } from '../../models/brands.model';
import { BrandsService } from '../brands.service';

jest.mock('../models/brands.model');

describe('BrandsService', () => {
  const service = new BrandsService();

  describe('createNewBrand', () => {
    it('should throw an error if brand name is not provided', async () => {
      await expect(service.createNewBrand({ name: '' })).rejects.toThrow('Brand name is required');
    });

    it('should throw an error if brand already exists', async () => {
      const mockFindOne = jest.spyOn(Brand, 'findOne');
      mockFindOne.mockResolvedValue({ id: '1', name: 'ExistingBrand' });

      await expect(service.createNewBrand({ name: 'ExistingBrand' })).rejects.toThrow(
        'Brand already exists'
      );
    });
  });
});
