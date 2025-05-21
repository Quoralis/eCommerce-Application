import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';
import { projectKey } from '../config.js';
import { apiUrl } from '../config.js';
// import { CurrentProduct } from '../types/types.js';
export const getCurrentProduct = async (id?: string) => {
  const bearerToken = localStorage.getItem('bearerToken');
  let url = ``;
  if (id) {
    url = `${apiUrl}/${projectKey}/product-projections/${id}`;
  } else {
    url = `${apiUrl}/${projectKey}/product-projections/`;
  }
  try {
    const response = await wrapperTryCatch(url, {
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
getCurrentProduct('4dbb3fb7-24e6-4c31-84fd-f76e414de2fd');
