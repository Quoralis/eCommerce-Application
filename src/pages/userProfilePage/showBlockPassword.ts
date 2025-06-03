import { createEl } from '../../utils/createElement.js';
import { userProfileWrapper } from './userProfile.js';
import { showPasswordOrHide } from '../loginPage/showPassword.js';
import { validateEmailOrPassword } from '../loginPage/authorization.js';
import { loginType } from '../loginPage/authorization.js';
import { toggleInputsState } from './toggleInputsState.js';
import { changeBlock } from './userProfileInputs.js';
const passwordsPlaceholders = ['Current Password', 'New Password'];

export const showBlockPassword = (email: string): void => {
  createEl({
    tag: 'p',
    text: 'Password:',
    classes: ['user-profile__label'],
    parent: userProfileWrapper,
    attributes: {
      id: 'addresses',
    },
  });
  const containerPassword = createEl({
    tag: 'form',
    classes: [
      'user-profile__form',
      'uk-flex',
      'uk-flex-column',
      'form-password',
    ],
    parent: userProfileWrapper,
  });
  for (let i = 0; i < 2; i++) {
    const passwordWrapper = createEl({
      tag: 'div',
      classes: ['uk-inline', 'password-wrapper'],
      parent: containerPassword,
    });

    const iconEyeSlash = createEl({
      tag: 'a',
      classes: ['uk-form-icon', 'uk-form-icon-flip', 'non-active'],
      attributes: { 'uk-icon': 'icon: eye-slash' },
      parent: passwordWrapper,
    });

    iconEyeSlash.addEventListener('click', (): void => {
      showPasswordOrHide(inputPassword, iconEyeSlash);
    });

    const inputPassword = createEl({
      tag: 'input',
      classes: ['uk-input', 'user-profile__input'],
      attributes: {
        placeholder: passwordsPlaceholders[i],
        type: 'password',
        autocomplete: 'current-password',
      },
      parent: passwordWrapper,
    });
    inputPassword.addEventListener('input', (event: Event): void => {
      if (event.target instanceof HTMLInputElement) {
        validateEmailOrPassword(
          event.target.value,
          loginType.password,
          errorMessagePassword
        );
      }
    });
    const errorMessagePassword = createEl({
      tag: 'span',
      classes: [
        'uk-text-small',
        'uk-margin-xsmall-left',
        'email-error',
        'uk-text-danger',
        'error-message',
      ],
      parent: containerPassword,
    });
  }
  toggleInputsState(containerPassword, true);
  changeBlock(email, false, containerPassword);
};
