import { apiRoot } from '../clients/apiClient.js';

const email = 'unfeel00@gmail.com'; //  будем брать из инпута
const password = '123456'; //  будем брать из инпута

async function authLoginFetchById(email: string, password: string) {
  try {
    const response = await apiRoot
      .login()
      .post({
        body: {
          email: email,
          password: password,
        },
      })
      .execute();

    if (response.statusCode === 200) {
      console.log('Success authorization');
    }
  } catch (error) {
    console.log(JSON.stringify(error));
  }
}

authLoginFetchById(email, password);
