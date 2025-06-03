import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';
import { apiUrl, projectKey } from '../config.js';

export async function fetchFromApi<T>(endpoint?: string): Promise<T> {
  const bearerToken = localStorage.getItem('bearerToken');
  if (!bearerToken) {
    throw new Error('No auth token found');
  }
  const url = `${apiUrl}/${projectKey}/${endpoint}`;
  try {
    return await wrapperTryCatch<T>(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  } catch (err) {
    console.error('fetchFromApi', err);
    throw err;
  }
}
