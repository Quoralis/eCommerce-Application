import { CurrentProduct, ProductsResponse } from '../types/types.js';
import { fetchFromApi } from '../services/fetchFromApi.js';

export const getCurrentProductClient = async (
  key: string
): Promise<CurrentProduct> => {
  return await fetchFromApi(`product-projections/key=${key}`);
};

export const getAllProductsClients = async (): Promise<ProductsResponse> => {
  return await fetchFromApi(`product-projections`);
};
