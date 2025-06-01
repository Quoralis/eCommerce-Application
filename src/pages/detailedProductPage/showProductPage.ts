import { createEl } from '../../utils/createElement.js';
import { getCurrentProductClient } from '../../clients/getCurrentProductClient.js';
import { CurrentProduct } from '../../types/types.js';
import { showModalWindow } from '../../ui/modalWindow.js';
import { showSlideShow } from '../../ui/slideShow.js';
import { productComponentText } from './productComponentText.js';
import { deleteModalWindow } from '../../ui/modalWindow.js';
import { slideShowInProductPage } from '../../ui/slideShow.js';

const productAllComponents = (
  data: CurrentProduct,
  parent: HTMLElement
): void => {
  createEl({
    tag: 'button',
    text: 'Back',
    classes: [
      'uk-margin-small-top',
      'uk-margin-small-left',
      'uk-button',
      'uk-border-rounded',
      'uk-button-primary',
      'login-btn',
    ],
    onClick: deleteModalWindow,
    attributes: { 'data-path': '/catalog' },
    parent: parent,
  });
  const detailedProductPage = createEl({
    tag: 'div',
    classes: [
      'uk-height-viewport',
      'uk-flex',
      'uk-flex-center',
      'uk-flex-middle',
      'detailed-product-page',
    ],
    parent: parent,
  });

  const childProductPage = createEl({
    tag: 'div',
    classes: [
      'uk-flex',
      'uk-width-1-1',
      'uk-flex-center',
      'uk-flex-middle',
      'uk-padding-small',
      'child-product-page',
    ],
    parent: detailedProductPage,
  });
  showSlideShow(slideShowInProductPage, childProductPage, data);
  productComponentText(data, childProductPage);
};

export const showProductPage = async (key: string) => {
  if (key) {
    const data = await getCurrentProductClient(key);
    const main = <HTMLElement>document.querySelector('main');
    createEl({
      tag: 'nav',
      classes: ['nav-breadcrumb'],
      parent: main,
    });
    showModalWindow('pagination', data);
    productAllComponents(data, main);
  }
};
