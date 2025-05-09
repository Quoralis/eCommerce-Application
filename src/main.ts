import './assets/styles/app.scss';
import '../node_modules/uikit/dist/js/uikit.min.js';
import '../node_modules/uikit/dist/js/uikit-icons.js';
import {
  requestAnonymousToken,
  requestBearerToken,
  requestLoginToken,
} from './clients/authClient.js';

// ф-я для демонстрации работы запросов токенов.
async function init() {
  await requestBearerToken(); //  получили главный токен для дальнейших действий
  await requestAnonymousToken();
  await requestLoginToken('unfeel00@gmail.com', '123456');
}

document.addEventListener('DOMContentLoaded', init);
