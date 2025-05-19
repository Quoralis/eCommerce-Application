import { apiUrl, projectKey } from '../config.js';
import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';
import { RegistrationLoginData } from '../types/types.js';
import { showNotification } from '../services/notification/showNotification.js';

export async function registerCustomer(data: RegistrationLoginData): Promise<{
  id: string;
  version: number;
}> {
  const dataUser = {
    email: data.userData.email,
    password: data.userData.password,
    firstName: data.userData.firstName,
    lastName: data.userData.lastName,
    dateOfBirth: data.userData.dateOfBirth,
    addresses: data.userData.addresses,
    defaultShippingAddress: data.defShipIdx,
    defaultBillingAddress: data.defBillIdx,
  };

  const dataCustomer = await wrapperTryCatch<{
    customer?: {
      id: string;
      version: number;
    };
    statusCode?: number;
    message?: string;
  }>(`${apiUrl}/${projectKey}/customers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.bearerToken}`,
    },
    body: JSON.stringify(dataUser),
  });

  if (
    dataCustomer.statusCode === 400 &&
    dataCustomer.message ===
      'There is already an existing customer with the provided email.'
  ) {
    showNotification('The customer with this email already exists', 'danger');
  }
  const costumerIdVersion = {
    id: dataCustomer.customer?.id ?? '',
    version: dataCustomer.customer?.version ?? 0,
  };
  console.log(costumerIdVersion);
  return costumerIdVersion;
}
