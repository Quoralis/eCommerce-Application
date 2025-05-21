import { iconEyeSlash, inputPassword } from './loginStructure.js';

export const showPasswordOrHide = (): void => {
  iconEyeSlash.classList.toggle('active');
  if (iconEyeSlash.classList.contains('active')) {
    iconEyeSlash.setAttribute('uk-icon', 'icon: eye');
    inputPassword.setAttribute('type', 'text');
  } else {
    iconEyeSlash.setAttribute('uk-icon', 'icon: eye-slash');
    inputPassword.setAttribute('type', 'password');
  }
};
