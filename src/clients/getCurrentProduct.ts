import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';
import { projectKey } from '../config.js';
import { apiUrl } from '../config.js';
// export const bearerToken = await requestBearerToken();

export const getCurrentProductOrGetAllProducts = async (id?: string) => {
  const bearerToken = localStorage.getItem('bearerToken');
  // console.log('bearerToken', bearerToken);
  let url = ``;
  if (id) {
    url = `${apiUrl}/${projectKey}/product-projections/${id}`;
  } else {
    url = `${apiUrl}/${projectKey}/product-projections/`;
  }
  // console.log('token', bearerToken);
  try {
    const response = await wrapperTryCatch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
};
// getCurrentProductOrGetAllProducts('4dbb3fb7-24e6-4c31-84fd-f76e414de2fd');
