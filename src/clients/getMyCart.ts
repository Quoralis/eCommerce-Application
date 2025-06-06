import { apiUrl, projectKey } from '../config.js';
import { responseMyCart } from '../types/types.js';
import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';

export const getMyCart = async (id: string, token: string) => {
  //   const bearerToken = localStorage.getItem('bearerToken');
  const url = `${apiUrl}/${projectKey}/me/carts/${id}`;
  //   console.log('+', bearerToken);
  try {
    const response = await wrapperTryCatch<responseMyCart>(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'application/json',
        // 'manage_orders':{projectKey}
        // scope: 'manage_orders',
      },
    });
    return response;
  } catch (err) {
    console.log('createMyCart', err);
  }
};
