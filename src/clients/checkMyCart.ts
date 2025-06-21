import { apiUrl, projectKey } from '../config.js';
import { requestToken } from './authClient.js';
export const checkMyCart = async () => {
  const url = `${apiUrl}/${projectKey}/me/carts/${localStorage.getItem('cartId')}`;
  try {
    return fetch(url, {
      method: 'HEAD',
      headers: {
        Authorization: `Bearer ${await requestToken()}`,
      },
    }).then((response) => {
      return response.status;
    });
  } catch (err) {
    console.log('createMyCart', err);
  }
};
