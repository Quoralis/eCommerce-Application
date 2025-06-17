import { createEl } from '../../utils/createElement.js';
import { deleteMyCart } from '../../clients/deleteMyCart.js';
import { getMyCart } from '../../clients/getMyCart.js';
import { closeModal } from '../../ui/modalWindow.js';
import { getListItem } from './showCartPage.js';
import { updateBadgeNumber } from '../header/updateBadgeNumber.js';
import { responseMyCart } from '../../types/types.js';
export const confirmationOfDeletion = (parent: HTMLElement): void => {
  const titleAndBtnsWrapper = createEl({
    tag: 'div',
    classes: ['uk-flex', 'uk-flex-middle', 'uk-flex-column'],
    parent: parent,
  });
  createEl({
    tag: 'h4',
    classes: ['uk-text-center'],
    text: 'Are you sure you want to delete all products?',
    parent: titleAndBtnsWrapper,
  });

  const wrapperBtns = createEl({
    tag: 'div',
    classes: ['uk-margin-small-top'],
    parent: titleAndBtnsWrapper,
  });

  createEl({
    tag: 'button',
    text: 'Cancel',
    classes: [
      'uk-button',
      'uk-border-rounded',
      'uk-button-primary',
      'login-btn',
      'el-nav',
    ],
    onClick: closeModal,
    parent: wrapperBtns,
  });

  const confirmBtn = createEl({
    tag: 'button',
    text: 'Confirm',
    classes: [
      'uk-margin-small-left',
      'uk-button',
      'uk-border-rounded',
      'uk-button-primary',
      'login-btn',
      'el-nav',
    ],
    parent: wrapperBtns,
    onClick: () => {
      localStorage.removeItem('promoCode');
    },
  });
  confirmBtn.addEventListener('click', async (): Promise<void> => {
    await deleteCart();
    const cardWrapper = <HTMLElement>(
      document.querySelector('.card-product-wrapper')
    );
    await getListItem(cardWrapper);
    closeModal();
  });
};

const deleteCart = async (): Promise<void> => {
  const version = <responseMyCart>await getMyCart();
  await deleteMyCart(version.version);
  const updateData = <responseMyCart>await getMyCart();
  updateBadgeNumber(updateData);
};
