import { CurrentProduct, ProductsResponse } from '../types/types.js';
import { fetchFromApi } from '../services/fetchFromApi.js';
import { apiUrl, projectKey } from '../config.js';
import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';

export const getCurrentProductClient = async (
  key: string
): Promise<CurrentProduct> => {
  return await fetchFromApi(`product-projections/key=${key}`);
};

export const getAllProductsClients = async (): Promise<ProductsResponse> => {
  return await fetchFromApi(`product-projections`);
};

export async function getProductsInCategory(
  bearerToken: string,
  categoryId: string,
  limit = 8,
  offset = 0
): Promise<ProductsResponse> {
  const url = `${apiUrl}/${projectKey}/product-projections/search`;

  const form = new URLSearchParams();
  form.append('filter', `categories.id:"${categoryId}"`);
  form.append('limit', limit.toString());
  form.append('offset', offset.toString());
  form.append('sort', 'price asc');

  return await wrapperTryCatch<ProductsResponse>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${bearerToken}`,
    },
    body: form.toString(),
  });
}
