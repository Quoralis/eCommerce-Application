import { apiUrl, projectKey } from '../config.js';
import { responseMyCart } from '../types/types.js';
import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';
import { requestToken } from './authClient.js';
export const deleteMyCart = async (version: number) => {
  const url = `${apiUrl}/${projectKey}/me/carts/${localStorage.getItem('cartId')}?version=${version}`;
  try {
    const response = await wrapperTryCatch<responseMyCart>(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${await requestToken()}`,
      },
    });
    return response;
  } catch (err) {
    console.log('createMyCart', err);
  }
};
