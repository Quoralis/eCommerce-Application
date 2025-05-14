import { createEl } from '../../utils/createElement.js';
import img from '../../assets/images/logo.png';
import Uikit from 'uikit';
const startNum = 0;
const limit = 3;

const header = createEl({
  tag: 'header',
  classes: ['uk-background-default', 'uk-flex', 'uk-flex-around', 'header'],
});

const navWrapper = createEl({
  tag: 'nav',
  classes: ['uk-flex', 'uk-flex-middle', 'nav-wrapper'],
  parent: header,
});

createEl({
  tag: 'img',
  classes: ['logo'],
  attributes: { src: img },
  parent: navWrapper,
});

const generalLinks = createEl({
  tag: 'div',
  classes: ['link'],
  parent: navWrapper,
});

const mainBtn = createEl({
  tag: 'a',
  text: 'Main',
  parent: generalLinks,
});

const catalogBtn = createEl({
  tag: 'a',
  text: 'Catalog',
  parent: generalLinks,
});

const aboutBtn = createEl({
  tag: 'a',
  text: 'About',
  parent: generalLinks,
});

const autorisationWrapper = createEl({
  tag: 'nav',
  classes: ['uk-flex', 'uk-flex-middle', 'autorisation-wrapper', 'link'],
  parent: header,
});

const basketBtn = createEl({
  tag: 'a',
  classes: ['uk-border-rounded', 'uk-button-primary', 'basket-btn'],
  attributes: { 'uk-icon': 'cart' },
  parent: autorisationWrapper,
});

const loginBtn = createEl({
  tag: 'button',
  text: 'Login',
  classes: ['uk-button', 'uk-border-rounded', 'uk-button-primary', 'login-btn'],
  parent: autorisationWrapper,
});

const signBtn = createEl({
  tag: 'button',
  text: 'Sign Up',
  classes: [
    'uk-button',
    'uk-border-rounded',
    'uk-button-primary',
    'sign-up-btn',
  ],
  parent: autorisationWrapper,
});

const headerBurgerMenu = createEl({
  tag: 'a',
  classes: ['logo-burger-menu', 'uk-margin-small-right'],
  attributes: {
    'uk-toggle': 'target: #offcanvas-flip',
  },
  parent: header,
});

headerBurgerMenu.addEventListener('click', (): void => {
  headerBurgerMenu.classList.toggle('open');
});

const createLine = (): void => {
  createEl({
    tag: 'span',
    classes: ['line'],
    parent: headerBurgerMenu,
  });
};

for (let i = startNum; i < limit; i++) {
  createLine();
}

window.addEventListener('resize', (): void => {
  if (window.innerWidth > 700) {
    Uikit.offcanvas('#offcanvas-flip').hide();
    headerBurgerMenu.classList.remove('open');
  }
});

const cloneMainBtn = mainBtn.cloneNode(true);
const cloneCatalogBtn = catalogBtn.cloneNode(true);
const cloneAboutBtn = aboutBtn.cloneNode(true);
const cloneBasketBtn = basketBtn.cloneNode(true);
const cloneLoginBtn = loginBtn.cloneNode(true);
const cloneSignBtn = signBtn.cloneNode(true);

const showHeaderComponent = (): void => {
  document.body.append(header);
};

export {
  cloneMainBtn,
  cloneCatalogBtn,
  cloneAboutBtn,
  cloneBasketBtn,
  cloneLoginBtn,
  cloneSignBtn,
  showHeaderComponent,
  headerBurgerMenu,
};
