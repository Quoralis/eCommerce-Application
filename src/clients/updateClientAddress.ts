import { apiUrl, projectKey } from '../config.js';
import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';
import { AddressModify, AddressUpdate, Customer } from '../types/types.js';
import { showNotification } from '../services/notification/showNotification.js';
import { getCurrentUser } from './customerSearchClient.js';

export const updateClientAddress = async (
  id: string,
  body: AddressUpdate | AddressModify
) => {
  const bearerToken = localStorage.getItem('bearerToken');
  const url = `${apiUrl}/${projectKey}/customers/${id}`;

  if (body.version === undefined) {
    const currentUser = <Customer>await getCurrentUser();
    body.version = currentUser.version;
  }

  try {
    // console.log('updateClientAddress:', body);
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
    // console.error('updateClientAddress error:', err);
    const errorMessage = err instanceof Error ? err.message : `${err}`;

    if (errorMessage.includes('409')) {
      console.log('Data version conflict');

      const currentUser = await getCurrentUser();
      body.version = currentUser.version; // Обновляем версию
      return await updateClientAddress(id, body); // Повторяем запрос
    } else if (errorMessage.includes('400')) {
      console.log('Required data is missing');
    }
  }
};
