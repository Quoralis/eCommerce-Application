import { createEl } from '../../utils/createElement.js';
import { createUserAddressInputs } from './userAddressInputs.js';

const userAddressesContainer = createEl({
  tag: 'div',
  classes: ['uk-height-1-1', 'user-addresses-container'],
});

export const userAddressesWrapper = createEl({
  tag: 'div',
  classes: ['user-addresses'],
  parent: userAddressesContainer,
});

const showAddressesWrapper = async () => {
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
  });
};

showAddressesWrapper();

export const showUserAddresses = () => {
  document.querySelector('main')?.append(userAddressesContainer);
};
