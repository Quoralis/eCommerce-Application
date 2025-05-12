import { createEl } from '../../utils/createElement.js';
import {
  cloneMainBtn,
  cloneAboutBtn,
  cloneBasketBtn,
  cloneCatalogBtn,
  cloneLoginBtn,
  cloneSignBtn,
} from './headerStructure.js';

export const showBurgerMenu = (): void => {
  const burgerMenuWrapper = createEl({
    tag: 'div',
    attributes: {
      id: 'offcanvas-flip',
      'uk-offcanvas': 'flip: true; overlay: true',
    },
    parent: document.body,
  });
  const burgerMenu = createEl({
    tag: 'div',
    classes: [
      'uk-background-default',
      'uk-offcanvas-bar',
      'uk-flex',
      'uk-flex-column',
      'uk-flex-middle',
      'uk-flex-center',
      'burger-menu',
    ],
    parent: burgerMenuWrapper,
  });
  createEl({
    tag: 'button',
    classes: ['uk-offcanvas-close'],
    attributes: { 'uk-close': '' },
    parent: burgerMenuWrapper,
  });

  burgerMenu.append(
    cloneMainBtn,
    cloneCatalogBtn,
    cloneAboutBtn,
    cloneLoginBtn,
    cloneSignBtn,
    cloneBasketBtn
  );
};
