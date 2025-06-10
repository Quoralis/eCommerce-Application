import { apiUrl, projectKey } from '../config.js';
import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';
import { updateMyCart } from '../types/types.js';
import { requestToken } from './authClient.js';

export const updateCart = async (body: updateMyCart) => {
  const url = `${apiUrl}/${projectKey}/me/carts/${localStorage.getItem('cartId')}`;

  try {
    const response = await wrapperTryCatch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${await requestToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    console.log(response);
    return response;
  } catch (err) {
    console.log('updateCustomerInf', err);
  }
};
