import { createEl } from '../../utils/createElement.js';
import { createUserProfileInputs } from './userProfileInputs.js';
import { clearDom } from '../../utils/clearDom.js';

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

export const showUserProfilePage = (email: string) => {
  console.log('showUserProfilePage', email);
  document.querySelector('main')?.append(userProfileContainer);
  const form = <HTMLElement>document.querySelector('.user-profile__form');
  if (form) {
    clearDom('.user-profile');
  }
  createUserProfileInputs(email);
};
