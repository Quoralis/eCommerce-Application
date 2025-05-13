import './assets/styles/app.scss';
import '../node_modules/uikit/dist/js/uikit.min.js';
import '../node_modules/uikit/dist/js/uikit-icons.js';
import {
  requestAnonymousToken,
  requestBearerToken,
} from './clients/authClient.js';
import { registerCustomer } from './clients/customerClient.js';
import { UserFormValues } from './types/types.js';


//для теста и получения данных/токенов при логине
const data: UserFormValues = {
  email: 'unfeel00@gmai.wedd',
  password: '123456',
  firstName: 'stas',
  lastName: 'Ts',
  dateOfBirth: '2015-10-21',
  addresses: [
    {
      streetName: 'asdad',
      city: 'string',
      postalCode: 'string',
      country: 'DE',
    },
    {
      streetName: 'aaa',
      city: 'ssd',
      postalCode: 'aaaa',
      country: 'DE',
    },
  ],
};

// ф-я для демонстрации работы запросов токенов.
async function init() {
  const token = await requestBearerToken(); //  получили главный токен для дальнейших действий
  await requestAnonymousToken();
  // await login(data);
  await registerCustomer(data, token, 0, 1);
}
document.addEventListener('DOMContentLoaded', init);
