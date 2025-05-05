import { apiRoot } from '../clients/apiClient.js';

const customerDraft = {
  key: 'Milan',
  email: 'test@gmail.com',
  password: 'test',
  firstName: 'firstName',
  lastName: 'lastName',
  addresses: [
    {
      country: 'DE',
      key: 'customer-address-1',
    },
  ],
  defaultBillingAddress: 0,
  defaultShippingAddress: 0,
};

async function customerCreate() {
  try {
    const response = await apiRoot
      .customers()
      .post({ body: customerDraft })
      .execute();

    console.log('Success', JSON.stringify((await response).body, null, 2));
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
  }
}
customerCreate();
