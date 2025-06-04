import { apiUrl, projectKey } from '../config.js';
import { MyCart, responseMyCart } from '../types/types.js';
import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';
import { showNotification } from '../services/notification/showNotification.js';

const bodyCreateMyCart = {
  currency: 'EUR',
  country: 'DE',
};

export const createMyCart = async (
  token: string,
  body: MyCart = bodyCreateMyCart
) => {
  //   const bearerToken = localStorage.getItem('bearerToken');
  const url = `${apiUrl}/${projectKey}/me/carts`;
  //   console.log('+', bearerToken);
  try {
    const response = await wrapperTryCatch<responseMyCart>(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        // 'manage_orders':{projectKey}
        // scope: 'manage_orders',
      },
      body: JSON.stringify(body),
    });
    showNotification('product add to cart', 'success');
    console.log('1');
    return response;
  } catch (err) {
    showNotification('something went wrong so try again', 'danger');
    console.log('createMyCart', err);
  }
};
