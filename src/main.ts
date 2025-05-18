import './assets/styles/app.scss';
import '../node_modules/uikit/dist/js/uikit.min.js';
import '../node_modules/uikit/dist/js/uikit-icons.js';
import Router from './router/Router.js';
import { showBurgerMenu } from './components/header/burgerMenu.js';
import { showHeaderComponent } from './components/header/headerStructure.js';
import { updateAuthUI } from './utils/auth.js';
import { requestBearerToken } from './clients/authClient.js';

document.addEventListener('DOMContentLoaded', async () => {
  showBurgerMenu();
  showHeaderComponent();
  localStorage.setItem('bearerToken', await requestBearerToken());
  const accessToken = localStorage.getItem('accessToken');
  const router = Router.getInstance();
  router.initialRender();
  if (accessToken) {
    updateAuthUI();
  }
  document.querySelectorAll('.login-btn, .sign-up-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const path = btn.classList.contains('login-btn')
        ? '/login'
        : '/registration';
      router.navigate(path);
    });
  });
});
