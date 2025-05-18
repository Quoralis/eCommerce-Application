import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';
import { apiUrl, projectKey } from '../config.js';
import { Customer, CustomerSearchResponse } from '../types/types.js';

export async function getCustomerByEmail(
  bearerToken: string,
  email: string
): Promise<Customer[]> {
  const url = `${apiUrl}/${projectKey}/customers?where=email="${email}"`;
  const response = await wrapperTryCatch<CustomerSearchResponse>(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json', // для GET лучше application/json
      Authorization: `Bearer ${bearerToken}`,
    },
  });
  return response.results;
}
