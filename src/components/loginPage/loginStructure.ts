import { createEl } from '../../utils/createElement.js';

const loginPageWrapper = createEl({
  tag: 'div',
  classes: [
    'login-page-wrapper',
    'uk-flex',
    'uk-height-1-1',
    'uk-flex-middle',
    'uk-flex-center',
  ],
  parent: document.body,
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

const errorMessageEmail = createEl({
  tag: 'span',
  classes: ['uk-text-small', 'uk-margin-xsmall-left'],
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

const inputPassword = <HTMLInputElement>createEl({
  tag: 'input',
  classes: ['uk-input', 'uk-border-rounded', 'input'],
  attributes: {
    placeholder: 'Password',
    type: 'password',
  },
  parent: passwordWrapper,
});

const errorMessagePassword = createEl({
  tag: 'span',
  classes: ['uk-text-small', 'uk-margin-xsmall-left'],
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

createEl({
  tag: 'a',
  classes: ['uk-link', 'login-link'],
  text: 'Don’t have account? Sign Up',
  parent: buttonsWrapper,
});

export {
  buttonSubmitLogin,
  errorMessageEmail,
  inputEmail,
  inputPassword,
  errorMessagePassword,
  iconEyeSlash,
  passwordWrapper,
};
