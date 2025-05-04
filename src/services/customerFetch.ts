import { apiRoot } from '../clients/apiClient.js';

// need to get ID customer in future

const customerId = '3b7d945f-f64f-434e-a69a-2af0c2abd391'; //  id Stas-a
async function customerFetchById(customerId: string) {
  try {
    const response = await apiRoot

      .customers()
      .withId({
        ID: customerId,
      })
      .get()
      .execute();
    // console.log('Success', JSON.stringify(response.body, null, 2)); //  Отключил, т.к. и так сервер ответ дает в консоль
    return response.body;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
  }
}

async function wrapperAsAw() {
  console.log(await customerFetchById(customerId)!);
}
wrapperAsAw(); //   will be error , wrong scopes
