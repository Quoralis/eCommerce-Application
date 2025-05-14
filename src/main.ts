import './assets/styles/app.scss';
import '../node_modules/uikit/dist/js/uikit.min.js';
import '../node_modules/uikit/dist/js/uikit-icons.js';
import Router from './router/Router.js';

Router.getInstance().navigate(window.location.pathname);

document.addEventListener('DOMContentLoaded', () => {
  const router = Router.getInstance();

  // покажем текущий путь при загрузке
  router.navigate(window.location.pathname);

  // навигация по кнопкам
  document
    .querySelector('.login-btn')
    ?.addEventListener('click', () => router.navigate('/login'));
  document
    .querySelector('.sign-up-btn')
    ?.addEventListener('click', () => router.navigate('/registration'));
});
