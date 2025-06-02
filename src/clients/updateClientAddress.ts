import { apiUrl, projectKey } from '../config.js';
import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';
import { AddressDelete, AddressUpdate, Customer } from '../types/types.js';
import { showNotification } from '../services/notification/showNotification.js';

export const updateClientAddress = async (
  id: string,
  body: AddressUpdate | AddressDelete
) => {
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

    if (body.actions[0].action === 'changeAddress') {
      showNotification('Address updated successfully', 'success');
    } else if (body.actions[0].action === 'addAddress') {
      showNotification('New address added successfully', 'success');
    } else if (body.actions[0].action === 'removeAddress') {
      showNotification('Address deleted from your account', 'success');
    }

    return response;
  } catch (err) {
    console.error('updateClientAddress error:', err);
  }
};
