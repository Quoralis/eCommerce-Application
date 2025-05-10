import './loginStructure.js';
import {
  buttonSubmitLogin,
  errorMessageEmail,
  errorMessagePassword,
  inputEmail,
  inputPassword,
} from './loginStructure.js';
import {
  isValidDomain,
  isValidPassword,
} from '../../services/validators/validationInputs.js';

export enum loginType {
  email = 'email',
  password = 'password',
}

const validateEmailOrPassword = (inputValue: string, type: string): void => {
  if (type === loginType.email) {
    isValidDomain(inputValue);
  } else if (type === loginType.password) {
    isValidPassword(inputValue);
  }
};

inputEmail.addEventListener('input', (event: Event): void => {
  if (event.target instanceof HTMLInputElement) {
    validateEmailOrPassword(event.target.value, loginType.email);
  }
});

inputPassword.addEventListener('input', (event: Event): void => {
  if (event.target instanceof HTMLInputElement) {
    validateEmailOrPassword(event.target.value, loginType.password);
  }
});

const validationForm = (inputEmail: string, inputPassword: string): void => {
  validateEmailOrPassword(inputEmail, loginType.email);
  validateEmailOrPassword(inputPassword, loginType.password);
  if (
    errorMessageEmail.textContent === '' &&
    errorMessagePassword.textContent === ''
  ) {
    console.log('+');
  }
};

buttonSubmitLogin.addEventListener('click', () => {
  validationForm(inputEmail.value, inputPassword.value);
});
