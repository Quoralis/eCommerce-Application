import { createEl } from '../../utils/createElement.js';
import img from '../../assets/images/logo.png';
import { paths } from '../../constants/paths.js';
// import { openPage } from '../openPage.js';
import { openPage } from '../openPage.js';
import Uikit from 'uikit';
import { logOut } from '../../services/authService.js';
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
  classes: ['el-nav'],
  parent: generalLinks,
});

mainBtn.addEventListener('click', (): void => {
  openPage(paths.main);
});

const catalogBtn = createEl({
  tag: 'a',
  text: 'Catalog',
  classes: ['el-nav'],
  parent: generalLinks,
});
catalogBtn.addEventListener('click', (): void => {
  openPage(paths.catalog);
});

const aboutBtn = createEl({
  tag: 'a',
  text: 'About',
  classes: ['el-nav'],
  parent: generalLinks,
});

aboutBtn.addEventListener('click', (): void => {
  openPage(paths.detailedProduct);
});

const autorisationWrapper = createEl({
  tag: 'nav',
  classes: ['uk-flex', 'uk-flex-middle', 'autorisation-wrapper', 'link'],
  parent: header,
});

const basketBtn = createEl({
  tag: 'a',
  classes: ['el-nav', 'uk-border-rounded', 'basket-btn', 'icon'],
  attributes: { 'uk-icon': 'cart' },
  parent: autorisationWrapper,
});

const profileBtn = createEl({
  tag: 'a',
  classes: [
    'uk-border-rounded',
    'uk-button-primary',
    'profile-btn',
    'hidden',
    'el-nav',
    'icon',
  ],
  attributes: { 'uk-icon': 'user' },
  parent: autorisationWrapper,
});

profileBtn.addEventListener('click', (): void => {
  openPage(paths.user);
});

const loginBtn = createEl({
  tag: 'button',
  text: 'Login',
  classes: [
    'uk-button',
    'uk-border-rounded',
    'uk-button-primary',
    'login-btn',
    'el-nav',
  ],
  parent: autorisationWrapper,
});

loginBtn.addEventListener('click', (): void => {
  openPage(paths.login);
});

const signOut = createEl({
  tag: 'button',
  text: 'Sign out',
  classes: [
    'uk-button',
    'uk-border-rounded',
    'uk-button-primary',
    'sign-out-btn',
    'hidden',
    'el-nav',
  ],
  parent: autorisationWrapper,
});

signOut.addEventListener('click', async (): Promise<void> => {
  await logOut();
});

const signBtn = createEl({
  tag: 'button',
  text: 'Sign Up',
  classes: [
    'uk-button',
    'uk-border-rounded',
    'uk-button-primary',
    'sign-up-btn',
    'el-nav',
  ],
  parent: autorisationWrapper,
});

signBtn.addEventListener('click', (): void => {
  openPage(paths.registration);
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

const closeHeaderBurger = (): void => {
  Uikit.offcanvas('#offcanvas-flip').hide();
  headerBurgerMenu.classList.remove('open');
};

window.addEventListener('resize', (): void => {
  if (window.innerWidth > 700) {
    closeHeaderBurger();
  }
});

const cloneMainBtn = mainBtn.cloneNode(true);
const cloneCatalogBtn = catalogBtn.cloneNode(true);
const cloneAboutBtn = aboutBtn.cloneNode(true);
const cloneBasketBtn = basketBtn.cloneNode(true);
const cloneLoginBtn = loginBtn.cloneNode(true);
const cloneSignBtn = signBtn.cloneNode(true);
const cloneSignOut = signOut.cloneNode(true);
const cloneProfileBtn = profileBtn.cloneNode(true);

cloneMainBtn.addEventListener('click', (): void => {
  openPage(paths.main);
});

cloneLoginBtn.addEventListener('click', (): void => {
  openPage(paths.login);
});

cloneSignBtn.addEventListener('click', (): void => {
  openPage(paths.registration);
});

cloneSignOut.addEventListener('click', async (): Promise<void> => {
  await logOut();
});

cloneCatalogBtn.addEventListener('click', (): void => {
  openPage(paths.catalog);
});

const showHeaderComponent = (): void => {
  document.body.append(header);
};

setTimeout(() => {
  document.querySelectorAll('.icon').forEach((el) => {
    el.addEventListener('click', closeHeaderBurger);
  });
}, 50);

document.addEventListener('click', (event: Event): void => {
  if (event.target instanceof HTMLElement) {
    if (event.target.classList.contains('el-nav')) {
      closeHeaderBurger();
    }
  }
});

export {
  cloneMainBtn,
  cloneCatalogBtn,
  cloneAboutBtn,
  cloneBasketBtn,
  cloneLoginBtn,
  cloneSignBtn,
  cloneSignOut,
  showHeaderComponent,
  headerBurgerMenu,
  cloneProfileBtn,
  mainBtn,
  signBtn,
  loginBtn,
  closeHeaderBurger,
  header,
};
