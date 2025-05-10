import './assets/styles/app.scss';
import './components/loginPage/showPassword.js';
import '../node_modules/uikit/dist/js/uikit.min.js';
import '../node_modules/uikit/dist/js/uikit-icons.js';

import { getToken } from './clients/authClient.js';

async function init() {
  const bearerToken = await getToken(); //  получили главный токен для дальнейших действий
  console.log(bearerToken);
}

document.addEventListener('DOMContentLoaded', init);
