import { createEl } from '../../utils/createElement.js';
import { getCurrentProductClient } from '../../clients/getCurrentProductClient.js';
import { CurrentProduct } from '../../types/types.js';
import { showModalWindow } from '../../ui/modalWindow.js';
import { showSlideShow } from '../../ui/slideShow.js';
import { productComponentText } from './productComponentText.js';

const productAllComponents = (
  data: CurrentProduct,
  parent: HTMLElement
): void => {
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
  showSlideShow('slide', childProductPage, data);
  productComponentText(data, childProductPage);
};

export const showProductPage = async () => {
  const data = await getCurrentProductClient('MB-Air');
  const main = <HTMLElement>document.querySelector('main');
  showModalWindow('pagination', data);
  productAllComponents(data, main);
};
