import { apiUrl, projectKey } from '../config.js';
// import { updateBadgeNumber } from '../pages/header/updateBadgeNumber.js';
import { responseMyCart } from '../types/types.js';
import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';
import { requestToken } from './authClient.js';

export const getMyCart = async () => {
  const url = `${apiUrl}/${projectKey}/me/carts/${localStorage.getItem('cartId')}`;
  // const url = `${apiUrl}/${projectKey}/me/active-cart`;
  try {
    const response = await wrapperTryCatch<responseMyCart>(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await requestToken()}`,
      },
    });
    // console.log('get', response);
    // updateBadgeNumber(response);
    return response;
  } catch (err) {
    console.log('createMyCart', err);
  }
};

export const getMyCarts = async () => {
  const url = `${apiUrl}/${projectKey}/me/carts/`;
  // const url = `${apiUrl}/${projectKey}/me/active-cart`;
  try {
    const response = await wrapperTryCatch<responseMyCart>(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await requestToken()}`,
      },
    });
    // console.log('get', response);
    // updateBadgeNumber(response);
    return response;
  } catch (err) {
    console.log('createMyCart', err);
  }
};

export const getMyProduct = async (): Promise<responseMyCart> => {
  return <responseMyCart>await getMyCart();
};
