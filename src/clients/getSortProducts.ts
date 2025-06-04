import { apiUrl, projectKey } from '../config.js';
import { ProductsResponse } from '../types/types.js';
import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';

export const getSortProducts = async (field: string, order: string) => {
  const bearerToken = localStorage.getItem('bearerToken');
  const url = `${apiUrl}/${projectKey}/product-projections/search?sort=${field} ${order}`;

  try {
    const response = await wrapperTryCatch<ProductsResponse>(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return response.results;
  } catch (err) {
    console.log('updateCustomerInf', err);
  }
};
