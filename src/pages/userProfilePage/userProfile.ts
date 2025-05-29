import { createEl } from '../../utils/createElement.js';
import { createUserProfileInputs } from './userProfileInputs.js';

const userProfileContainer = createEl({
  tag: 'div',
  classes: [
    'uk-height-1-1',
    'user-profile-container',
    'container-registration',
  ],
});

export const userProfileWrapper = createEl({
  tag: 'div',
  classes: ['user-profile'],
  parent: userProfileContainer,
});

createUserProfileInputs();

export const showUserProfilePage = () => {
  document.querySelector('main')?.append(userProfileContainer);
};
