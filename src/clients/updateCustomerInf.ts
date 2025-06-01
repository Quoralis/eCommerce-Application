import { apiUrl, projectKey } from '../config.js';
import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';
import { Customer, updateCustomer } from '../types/types.js';
import { showNotification } from '../services/notification/showNotification.js';
export const updateCustomerInf = async (id: string, body: updateCustomer) => {
  const bearerToken = localStorage.getItem('bearerToken');
  const url = `${apiUrl}/${projectKey}/customers/${id}`;

  try {
    const response = await wrapperTryCatch<Customer>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(body),
    });
    showNotification('update data successfully', 'success');
    return response;
  } catch (err) {
    showNotification('something went wrong so try again', 'danger');
    console.log('updateCustomerInf', err);
  }
};
