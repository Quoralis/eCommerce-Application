import { apiUrl, projectKey } from '../config.js';
import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';
import { updateMyCart } from '../types/types.js';
// import { showNotification } from '../services/notification/showNotification.js';
export const updateCart = async (
  id: string,
  body: updateMyCart,
  token: string
) => {
  // const bearerToken = localStorage.getItem('bearerToken');
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
    // console.log('2');
    console.log(response);
    // showNotification('update data successfully', 'success');
    return response;
  } catch (err) {
    // showNotification('something went wrong so try again', 'danger');
    console.log('updateCustomerInf', err);
  }
};
