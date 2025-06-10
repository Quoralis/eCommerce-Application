import { apiUrl, projectKey } from '../config.js';
import { responseMyCart } from '../types/types.js';
import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';
import { requestToken } from './authClient.js';

const bodyCreateMyCart = {
  currency: 'EUR',
  country: 'DE',
};

export const createMyCart = async (body = bodyCreateMyCart) => {
  const url = `${apiUrl}/${projectKey}/me/carts`;
  try {
    const response = await wrapperTryCatch<responseMyCart>(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${await requestToken()}`,
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(body),
    });
    return response;
  } catch (err) {
    console.log('createMyCart', err);
  }
};
