import { apiUrl, projectKey } from '../config.js';
import { responseMyCart } from '../types/types.js';
import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';

export const deleteMyCart = async (
  id: string,
  token: string,
  version: number
) => {
  //   const bearerToken = localStorage.getItem('bearerToken');
  const url = `${apiUrl}/${projectKey}/me/carts/${id}?version=${version}`;
  //   console.log('+', bearerToken);
  try {
    const response = await wrapperTryCatch<responseMyCart>(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (err) {
    console.log('createMyCart', err);
  }
};
