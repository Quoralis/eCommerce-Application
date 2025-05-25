import { createEl } from '../../utils/createElement.js';
import { createUserAddressInputs } from './userAddressInputs.js';
import { openPage } from '../openPage.js';
import { paths } from '../../constants/paths.js';

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
  const userPageButton = createEl({
    tag: 'button',
    text: 'Back to user profile',
    classes: ['button', 'uk-button', 'uk-button-primary'],
    parent: userAddressesWrapper,
  });

  userPageButton.addEventListener('click', (): void => {
    openPage(paths.user);
  });

  await createUserAddressInputs();

  createEl({
    tag: 'button',
    text: 'Edit addresses',
    classes: ['button', 'uk-button', 'uk-button-primary'],
    parent: userAddressesWrapper,
  });
};

showAddressesWrapper();

export const showUserAddresses = () => {
  document.querySelector('main')?.append(userAddressesContainer);
};
