import { createEl } from '../../utils/createElement.js';

let addressModal: HTMLElement | undefined;

export const getAddressModal = () => {
  if (!addressModal) {
    const modal = createEl({
      tag: 'div',
      classes: ['modal'],
      attributes: {
        'uk-modal': '',
        id: 'address-modal',
      },
    });

    const main = document.querySelector('.main-page-wrapper');
    main?.append(modal);

    const modalInner = createEl({
      tag: 'div',
      parent: modal,
      classes: ['uk-modal-dialog', 'uk-modal-body', 'modal__inner'],
    });

    createEl({
      tag: 'button',
      classes: ['uk-modal-close-default'],
      parent: modalInner,
      attributes: {
        'uk-close': '',
      },
    });

    addressModal = modal;
  }

  if (
    addressModal &&
    addressModal.querySelector('.modal__inner') instanceof HTMLElement
  ) {
    return addressModal.querySelector('.modal__inner');
  }
};
