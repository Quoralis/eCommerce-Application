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
import { login } from '../../services/authService.js';
import { UserFormValues } from '../../types/types.js';
import { showNotification } from '../../services/notification/showNotification.js';

export enum loginType {
  email = 'email',
  password = 'password',
}

const userAllData: UserFormValues = {
  email: '',
  password: '',
};

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
    userAllData.email = inputEmail;
    userAllData.password = inputPassword;
    login(userAllData).catch(() => {
      showNotification('something went wrong', 'danger');
    });
  }
};

buttonSubmitLogin.addEventListener('click', (): void => {
  validationForm(inputEmail.value, inputPassword.value);
});
