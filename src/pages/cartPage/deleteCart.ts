import { createEl } from '../../utils/createElement.js';
import { deleteMyCart } from '../../clients/deleteMyCart.js';
import { getMyCart } from '../../clients/getMyCart.js';

export const confirmationOfDeletion = (parent: HTMLElement): void => {
  const titleAndBtnsWrapper = createEl({
    tag: 'div',
    parent: parent,
  });
  createEl({
    tag: 'h4',
    text: 'Are you sure you want to delete all products?',
    parent: titleAndBtnsWrapper,
  });

  const wrapperBtns = createEl({
    tag: 'div',
    parent: titleAndBtnsWrapper,
  });

  /* const cancelBtn = */ createEl({
    tag: 'button',
    text: 'Cancel',
    classes: [
      'uk-button',
      'uk-border-rounded',
      'uk-button-primary',
      'login-btn',
      'el-nav',
    ],
    parent: wrapperBtns,
  });

  const confirmBtn = createEl({
    tag: 'button',
    text: 'Confirm',
    classes: [
      'uk-button',
      'uk-border-rounded',
      'uk-button-primary',
      'login-btn',
      'el-nav',
    ],
    parent: wrapperBtns,
  });
  confirmBtn.addEventListener('click', async (): Promise<void> => {
    await deleteCart();
  });
};

const deleteCart = async (/* parent: HTMLElement */): Promise<void> => {
  const cart = <string>localStorage.getItem('cart');
  const loginToken = <string>localStorage.getItem('accessToken');
  const version = await getMyCart(cart, loginToken);
  await deleteMyCart(cart, loginToken, <number>version?.version);
};
