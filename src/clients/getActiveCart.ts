import { apiUrl, projectKey } from '../config.js';
import { responseMyCart } from '../types/types.js';
import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';
import { requestToken } from './authClient.js';

export const getActiveCart = async () => {
  const url = `${apiUrl}/${projectKey}/me/active-cart`;
  try {
    const response = await wrapperTryCatch<responseMyCart>(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await requestToken()}`,
      },
    });
    return response;
  } catch (err) {
    console.log('createMyCart', err);
  }
};
