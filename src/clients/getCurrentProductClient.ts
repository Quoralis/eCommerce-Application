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
  limit = 20,
  offset = 0
): Promise<[]> {
  const url = `${apiUrl}/${projectKey}/product-projections/search`;

  const form = new URLSearchParams();
  form.append('filter', `categories.id:"${categoryId}"`);
  form.append('limit', limit.toString());
  form.append('offset', offset.toString());

  const response = await wrapperTryCatch<{ results: [] }>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${bearerToken}`,
    },
    body: form.toString(),
  });
  return response.results;
}
