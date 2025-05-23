import { createEl } from '../utils/createElement.js';
// import { productComponentImgsPagination } from '../pages/detailedProductPage/showProductPage.js';
import { CurrentProduct } from '../types/types.js';
import { showSlideShow } from './slideShow.js';
export const showModalWindow = <T>(str: string, content: T): void => {
  const modalWindow = createEl({
    tag: 'div',
    attributes: { id: 'modal', 'uk-modal': '' },
    parent: document.body,
  });

  const dialog = createEl({
    tag: 'div',
    classes: [
      'uk-modal-dialog',
      'uk-margin-auto-vertical',
      'uk-padding-large',
      'dialog',
      // 'uk-width-1-1',
    ],
    parent: modalWindow,
  });

  createEl({
    tag: 'button',
    classes: ['uk-modal-close-default'],
    attributes: { 'uk-close': '' },
    parent: dialog,
  });

  if (str === 'pagination') {
    showSlideShow('slide', dialog, <CurrentProduct>content);
  }
};
