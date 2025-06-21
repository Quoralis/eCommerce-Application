import { createEl } from '../../utils/createElement.js';
import {
  cloneMainBtn,
  cloneAboutBtn,
  cloneCatalogBtn,
  cloneLoginBtn,
  cloneSignBtn,
  headerBurgerMenu,
  cloneSignOut,
  cloneProfileBtn,
  cloneCartPageModal,
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

  document.addEventListener('click', (event): void => {
    if (event.target && event.target instanceof HTMLElement) {
      if (
        !burgerMenu.contains(event.target) &&
        !headerBurgerMenu.contains(event.target)
      ) {
        headerBurgerMenu.classList.remove('open');
      }
    }
  });

  burgerMenu.append(
    cloneMainBtn,
    cloneCatalogBtn,
    cloneAboutBtn,
    cloneLoginBtn,
    cloneSignBtn,
    cloneSignOut,
    cloneCartPageModal,
    cloneProfileBtn
  );
};
