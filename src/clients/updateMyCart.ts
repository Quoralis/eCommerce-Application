import { apiUrl, projectKey } from '../config.js';
import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';
import { updateMyCart } from '../types/types.js';
import { showNotification } from '../services/notification/showNotification.js';
export const updateCart = async (
  id: string,
  body: updateMyCart,
  token: string,
  notification?: boolean
) => {
  const url = `${apiUrl}/${projectKey}/me/carts/${id}`;

  try {
    const response = await wrapperTryCatch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (notification) {
      showNotification('product add to cart', 'success');
    }
    return response;
  } catch (err) {
    if (notification) {
      showNotification('something went wrong so try again', 'danger');
    }
    console.log('updateCustomerInf', err);
  }
};
