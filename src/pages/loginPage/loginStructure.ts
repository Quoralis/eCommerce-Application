import { createEl } from '../../utils/createElement.js';
import { showPasswordOrHide } from './showPassword.js';
import {
  validateEmailOrPassword,
  loginType,
  submitLoginForm,
} from './authorization.js';
import { paths } from '../../constants/paths.js';
import { openPage } from '../openPage.js';
const loginPageWrapper = createEl({
  tag: 'div',
  classes: [
    'login-page-wrapper',
    'uk-flex',
    'uk-flex-middle',
    'uk-flex-center',
  ],
});

const cardLoginWrapper = createEl({
  tag: 'div',
  classes: [
    'login-page-wrapper',
    'uk-flex',
    'uk-width-1-1',
    'uk-flex-middle',
    'uk-flex-center',
    'uk-padding-small',
  ],
  parent: loginPageWrapper,
});

const cardLogin = createEl({
  tag: 'div',
  classes: [
    'uk-card',
    'uk-height-large',
    'uk-width-large',
    'uk-card-default',
    'uk-border-rounded',
    'uk-flex',
    'uk-flex-column',
    'uk-padding-large',
    'uk-flex-middle',
    'uk-flex-center',
    'card-login',
  ],
  parent: cardLoginWrapper,
});

createEl({
  tag: 'span',
  text: 'Log In',
  classes: ['uk-card-title', 'uk-text-bolder'],
  parent: cardLogin,
});

const inputsForm = createEl({
  tag: 'form',
  classes: ['uk-width-1-1'],
  parent: cardLogin,
});

const inputEmail = <HTMLInputElement>createEl({
  tag: 'input',
  classes: ['uk-input', 'uk-border-rounded', 'input'],
  attributes: {
    placeholder: 'Email',
    type: 'text',
  },
  parent: inputsForm,
});

inputEmail.addEventListener('input', (event: Event): void => {
  if (event.target instanceof HTMLInputElement) {
    validateEmailOrPassword(event.target.value, loginType.email);
  }
});

const errorMessageEmail = createEl({
  tag: 'span',
  classes: [
    'uk-text-small',
    'uk-margin-xsmall-left',
    'email-error',
    'uk-text-danger',
  ],
  parent: inputsForm,
});

const passwordWrapper = createEl({
  tag: 'div',
  classes: ['uk-inline'],
  parent: inputsForm,
});

const iconEyeSlash = createEl({
  tag: 'a',
  classes: ['uk-form-icon', 'uk-form-icon-flip', 'login-icon'],
  attributes: { 'uk-icon': 'icon: eye-slash' },
  parent: passwordWrapper,
});

iconEyeSlash.addEventListener('click', (): void => {
  showPasswordOrHide(inputPassword, iconEyeSlash);
});

const inputPassword = <HTMLInputElement>createEl({
  tag: 'input',
  classes: ['uk-input', 'uk-border-rounded', 'input'],
  attributes: {
    placeholder: 'Password',
    type: 'password',
    autocomplete: 'current-password',
  },
  parent: passwordWrapper,
});

inputPassword.addEventListener('input', (event: Event): void => {
  if (event.target instanceof HTMLInputElement) {
    validateEmailOrPassword(event.target.value, loginType.password);
  }
});

const errorMessagePassword = createEl({
  tag: 'span',
  classes: [
    'uk-text-small',
    'uk-margin-xsmall-left',
    'password-error',
    'uk-text-danger',
  ],
  parent: inputsForm,
});

const buttonsWrapper = createEl({
  tag: 'div',
  classes: ['uk-width-1-1', 'uk-flex', 'uk-flex-middle', 'uk-flex-column'],
  parent: cardLogin,
});

const buttonSubmitLogin = createEl({
  tag: 'button',
  classes: [
    'uk-width-1-1',
    'uk-button',
    'uk-border-rounded',
    'uk-button-primary',
  ],
  text: 'Log In',
  attributes: { type: 'submit' },
  parent: buttonsWrapper,
});

buttonSubmitLogin.addEventListener('click', async (): Promise<void> => {
  await submitLoginForm(inputEmail.value, inputPassword.value);
});

const reverseToRegistarationPage = createEl({
  tag: 'a',
  classes: ['uk-link', 'login-link', 'sign-up-btn', 'uk-text-center'],
  text: 'Don’t have account? Sign Up',
  parent: buttonsWrapper,
});

reverseToRegistarationPage.addEventListener('click', (): void => {
  openPage(paths.registration);
});

const showLoginPage = (): void => {
  const main = document.querySelector('main');
  main?.append(loginPageWrapper);
};

export {
  errorMessageEmail,
  inputEmail,
  inputPassword,
  errorMessagePassword,
  iconEyeSlash,
  passwordWrapper,
  showLoginPage,
  reverseToRegistarationPage,
};
