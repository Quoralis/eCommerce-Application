import { apiUrl, projectKey } from '../config.js';
import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';
import { UserFormValues } from '../types/types.js';

export async function registerCustomer(
  data: UserFormValues,
  bearerToken: string,
  defShipIdx: number,
  defBillIdx: number
): Promise<{
  id: string;
  version: number;
}> {
  const dataUser = {
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: data.dateOfBirth,
    addresses: data.addresses,
    defaultShippingAddress: defShipIdx,
    defaultBillingAddress: defBillIdx,
  };

  const dataCustomer = await wrapperTryCatch<{
    customer: {
      id: string;
      version: number;
    };
  }>(`${apiUrl}/${projectKey}/customers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearerToken}`,
    },
    body: JSON.stringify(dataUser),
  });
  const costumerIdVersion = {
    id: dataCustomer.customer.id,
    version: dataCustomer.customer.version,
  };
  console.log(costumerIdVersion);
  return costumerIdVersion;
}
