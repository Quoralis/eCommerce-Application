import { apiUrl, projectKey } from '../config.js';
import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';
import { updateMyCart, responseMyCart } from '../types/types.js';
import { requestToken } from './authClient.js';
import { updateBadgeNumber } from '../pages/header/updateBadgeNumber.js';

export const updateCart = async (body: updateMyCart) => {
  const url = `${apiUrl}/${projectKey}/me/carts/${localStorage.getItem('cartId')}`;

  try {
    const response = await wrapperTryCatch<responseMyCart>(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${await requestToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    updateBadgeNumber(response);
    return response;
  } catch (err) {
    console.log('updateCustomerInf', err);
  }
};
