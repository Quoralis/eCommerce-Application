import { apiUrl, projectKey } from '../config.js';
import { ProductsResponse } from '../types/types.js';
import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';

export const getSortProducts = async (
  field: string,
  order: string,
  categoryId: string,
  limit: number,
  offset: number
): Promise<ProductsResponse | undefined> => {
  const bearerToken = localStorage.getItem('bearerToken');
  const url = `${apiUrl}/${projectKey}/product-projections/search?filter=categories.id:"${categoryId}"&sort=${field} ${order}&limit=${limit}&offset=${offset}`;

  try {
    return await wrapperTryCatch<ProductsResponse>(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  } catch (err) {
    console.log('getSortProducts error', err);
  }
};
