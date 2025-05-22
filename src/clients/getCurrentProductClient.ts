import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';
import { projectKey } from '../config.js';
import { apiUrl } from '../config.js';
import { CurrentProduct } from '../types/types.js';
export const getCurrentProductClient = async (
  key?: string
): Promise<CurrentProduct> => {
  const bearerToken = localStorage.getItem('bearerToken');
  let url = ``;
  if (key) {
    url = `${apiUrl}/${projectKey}/product-projections/key=${key}`;
  } else {
    url = `${apiUrl}/${projectKey}/product-projections/`;
  }
  try {
    const response = await wrapperTryCatch<CurrentProduct>(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    console.log('nc', response);
    return response;
  } catch (err) {
    console.error('getCurrentProduct', err);
    throw err;
  }
};
