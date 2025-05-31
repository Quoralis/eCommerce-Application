import { apiUrl, projectKey } from '../config.js';
import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';
import { AddressUpdate, Customer } from '../types/types.js';
import { showNotification } from '../services/notification/showNotification.js';

export const updateClientAddress = async (id: string, body: AddressUpdate) => {
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

    console.log('updateClientAddress success:', response);
    showNotification('Address updated successfully', 'success');

    return response;
  } catch (err) {
    console.error('updateClientAddress error:', err);
  }
};
