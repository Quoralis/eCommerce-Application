import './assets/styles/app.scss';
import '../node_modules/uikit/dist/js/uikit.min.js';
import '../node_modules/uikit/dist/js/uikit-icons.js';
import { showMainPage } from './components/mainPage/mainStructure.js';

async function init() {
  showMainPage();
}

document.addEventListener('DOMContentLoaded', init);
