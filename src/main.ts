import './assets/styles/app.scss';
import '../node_modules/uikit/dist/js/uikit.min.js';
import '../node_modules/uikit/dist/js/uikit-icons.js';
import {
  requestAnonymousToken,
  requestBearerToken,
} from './clients/authClient.js';
import { login } from './services/authService.js';

//для теста и получения данных/токенов при логине
const data = {
  email: 'unfeel00@gmail.com',
  password: '123456',
};

// ф-я для демонстрации работы запросов токенов.
async function init() {
  await requestBearerToken(); //  получили главный токен для дальнейших действий
  await requestAnonymousToken();
  await login(data);
}
document.addEventListener('DOMContentLoaded', init);
