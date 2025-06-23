import { createEl } from '../../utils/createElement.js';
import { createUserAddressInputs } from './userAddressInputs.js';
import { getNewAddressForm } from './newAddressForm.js';
import { clearDom } from '../../utils/clearDom.js';

const userAddressesContainer = createEl({
  tag: 'div',
  classes: ['uk-height-1-1', 'user-addresses-container'],
});

export const userAddressesWrapper = createEl({
  tag: 'div',
  classes: ['user-addresses'],
  parent: userAddressesContainer,
});

export const showAddressesWrapper = async () => {
  createEl({
    tag: 'button',
    text: 'Back to user profile',
    classes: ['button', 'uk-button', 'uk-button-primary'],
    attributes: {
      'data-path': '/user',
    },
    parent: userAddressesWrapper,
  });

  await createUserAddressInputs();

  createEl({
    tag: 'button',
    text: 'Add new address',
    classes: ['button', 'uk-button', 'uk-button-primary'],
    parent: userAddressesWrapper,
    onClick: getNewAddressForm,
    attributes: {
      'uk-toggle': 'target: #address-modal',
      'data-path': '/user/addresses',
      id: 'new-address-btn',
    },
  });
};

showAddressesWrapper();

export const showUserAddresses = () => {
  document.querySelector('main')?.append(userAddressesContainer);
};

export const updateAddressPage = () => {
  const form = document.querySelector('.user-addresses');
  if (form) {
    clearDom('user-addresses');
    showAddressesWrapper();
    showUserAddresses();
  }
};
