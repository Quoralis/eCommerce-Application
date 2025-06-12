import { apiUrl, projectKey } from '../config.js';
import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';
import { ICart, IChangeQuantity, updateMyCart } from '../types/types.js';
import { requestToken } from './authClient.js';
import { productCart } from '../types/types.js';

export const updateCart = async (
  body: updateMyCart | IChangeQuantity
): Promise<productCart | ICart | void> => {
  const url = `${apiUrl}/${projectKey}/me/carts/${localStorage.getItem('cartId')}`;

  try {
    const response: productCart = await wrapperTryCatch(url, {
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
