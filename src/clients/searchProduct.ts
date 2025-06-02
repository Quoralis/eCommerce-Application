import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';
import { apiUrl, projectKey } from '../config.js';
import { ProductsResponse } from '../types/types.js';

export const searchProduct = async (text: string) => {
  const bearerToken = localStorage.getItem('bearerToken');
  const url = `${apiUrl}/${projectKey}/product-projections/search?&text.en=$${text}`;

  try {
    const response = await wrapperTryCatch<ProductsResponse>(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return response.results;
  } catch (err) {
    console.log('updateCustomerInf', err);
  }
};
