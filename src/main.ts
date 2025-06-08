import './assets/styles/app.scss';
import '../node_modules/uikit/dist/js/uikit.min.js';
import '../node_modules/uikit/dist/js/uikit-icons.js';
import { showBurgerMenu } from './pages/header/burgerMenu.js';
import { showHeaderComponent } from './pages/header/headerStructure.js';
import { updateAuthUI } from './utils/auth.js';
import { requestBearerToken } from './clients/authClient.js';
import Router from './router/Router.js';
import { showMainPageContent } from './pages/mainPage/mainPageContent.js';

document.addEventListener('DOMContentLoaded', async () => {
  showBurgerMenu();
  showHeaderComponent();
  localStorage.setItem('bearerToken', await requestBearerToken());
  // const bearerToken = await requestBearerToken();
  const accessToken = localStorage.getItem('accessToken');
  const path = window.location.pathname;
  if (accessToken) {
    await updateAuthUI();
  } else if (path.startsWith('/user')) {
    await Router.getInstance().navigate('/login');
  }
  const router = Router.getInstance();
  await router.initialRender();

  showMainPageContent();
});
