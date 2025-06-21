import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';
import { apiUrl, projectKey } from '../config.js';
import { UserFormValues } from '../types/types.js';

export const mergeCartWithCustomer = async (body: UserFormValues) => {
  const bearerToken = localStorage.getItem('bearerToken');
  const url = `${apiUrl}/${projectKey}/login`;

  try {
    const response = await wrapperTryCatch<UserFormValues>(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(body),
    });
    return response;
  } catch (err) {
    console.log('margeCartWithCustomer', err);
  }
};
