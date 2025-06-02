import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';
import { apiUrl, projectKey } from '../config.js';
import { Customer, CustomerSearchResponse } from '../types/types.js';

export async function getCustomerByEmail(email: string): Promise<Customer[]> {
  const bearerToken = localStorage.getItem('bearerToken');
  if (!bearerToken) {
    throw new Error(
      "getCustomerByEmail: doesn't exist  bearerToken в localStorage"
    );
  }
  const url = `${apiUrl}/${projectKey}/customers?where=email="${email}"`;
  try {
    const response = await wrapperTryCatch<CustomerSearchResponse>(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // для GET лучше application/json
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return response.results;
  } catch (err) {
    console.error('getCustomerByEmail', err);
    throw err;
  }
}

export const getCurrentUser = async () => {
  const email = localStorage.getItem('email');
  if (!email) return;

  console.log(email);
  const users = await getCustomerByEmail(email);
  return users[0];
};
