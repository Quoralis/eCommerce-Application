import { apiUrl, projectKey } from '../config.js';
import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';
import { updateMyCart } from '../types/types.js';
export const updateCart = async (
  id: string,
  body: updateMyCart,
  token: string
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
    return response;
  } catch (err) {
    console.log('updateCustomerInf', err);
  }
};
