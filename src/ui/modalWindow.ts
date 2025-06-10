import { createEl } from '../utils/createElement.js';
import { CurrentProduct } from '../types/types.js';
import { showSlideShow } from './slideShow.js';
import { slideShowInProductPage } from './slideShow.js';
import { confirmationOfDeletion } from '../pages/cartPage/deleteCart.js';
import UIkit from 'uikit';
// import { clearDom } from '../utils/clearDom.js';
export const modalInProductPage = 'paginationInProductPage';
export const modalInCartPage = 'modalInCartPage';

export const deleteModalWindow = (): void => {
  document.getElementById('modal')?.remove();
};

export const closeModal = (): void => {
  UIkit.modal('#modal').hide();
};

export const showModalWindow = <T>(str: string, content?: T): void => {
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
    ],
    parent: modalWindow,
  });

  createEl({
    tag: 'button',
    classes: ['uk-modal-close-default'],
    attributes: { 'uk-close': '' },
    parent: dialog,
  });

  if (str === modalInProductPage) {
    // clearDom('uk-modal-dialog');
    showSlideShow(slideShowInProductPage, dialog, <CurrentProduct>content);
  }
  if (str === modalInCartPage) {
    // clearDom('uk-modal-dialog');
    confirmationOfDeletion(dialog);
    dialog.classList.remove('dialog');
  }
};
