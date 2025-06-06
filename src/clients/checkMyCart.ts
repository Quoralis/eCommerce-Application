import { apiUrl, projectKey } from '../config.js';

export const checkMyCart = async (id: string, token: string) => {
  //   const bearerToken = localStorage.getItem('bearerToken');
  const url = `${apiUrl}/${projectKey}/me/carts/${id}`;
  //   console.log('+', bearerToken);
  try {
    return fetch(url, {
      method: 'HEAD',
      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'application/json',
        // 'manage_orders':{projectKey}
        // scope: 'manage_orders',
      },
    }).then((response) => {
      //   console.log(response.status);
      return response.status;
    });
  } catch (err) {
    console.log('createMyCart', err);
  }
};
