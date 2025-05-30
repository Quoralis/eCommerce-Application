import { apiUrl, projectKey } from '../config.js';
import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';
import { Customer, updateCustomerPasswordType } from '../types/types.js';
import { showNotification } from '../services/notification/showNotification.js';
export const updateCustomerPassword = async (
  body: updateCustomerPasswordType
) => {
  const bearerToken = localStorage.getItem('bearerToken');
  const url = `${apiUrl}/${projectKey}/customers/password`;

  try {
    const response = await wrapperTryCatch<Customer>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(body),
    });
    console.log(response);
    showNotification('update password successfully', 'success');
    return response;
  } catch (err) {
    showNotification('something went wrong so try again', 'danger');
    console.log('updateCustomerInf', err);
  }
};
