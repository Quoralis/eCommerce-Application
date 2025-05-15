import './assets/styles/app.scss';
import '../node_modules/uikit/dist/js/uikit.min.js';
import '../node_modules/uikit/dist/js/uikit-icons.js';
import Router from './router/Router.js';
import { showBurgerMenu } from './components/header/burgerMenu.js';
import { showHeaderComponent } from './components/header/headerStructure.js';

document.addEventListener('DOMContentLoaded', () => {
  showBurgerMenu();
  showHeaderComponent();
  const router = Router.getInstance();
  router.initialRender();
  document.querySelectorAll('.login-btn, .sign-up-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const path = btn.classList.contains('login-btn')
        ? '/login'
        : '/registration';
      router.navigate(path);
    });
  });
});
