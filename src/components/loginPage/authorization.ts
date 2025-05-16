import { errorMessageEmail, errorMessagePassword } from './loginStructure.js';
import {
  isValidDomain,
  isValidPassword,
} from '../../services/validators/validationInputs.js';
import { login } from '../../services/authService.js';
import { RegistrationLoginData } from '../../types/types.js';
import { showNotification } from '../../services/notification/showNotification.js';
import { updateAuthUI } from '../../utils/auth.js';

export enum loginType {
  email = 'email',
  password = 'password',
}

const userAllData: RegistrationLoginData = {
  userData: {
    email: '',
    password: '',
  },
};

export const validateEmailOrPassword = (
  inputValue: string,
  type: string
): void => {
  if (type === loginType.email) {
    isValidDomain(inputValue);
  } else if (type === loginType.password) {
    isValidPassword(inputValue);
  }
};

export const submitLoginForm = async (
  inputEmail: string,
  inputPassword: string
): Promise<void> => {
  validateEmailOrPassword(inputEmail, loginType.email);
  validateEmailOrPassword(inputPassword, loginType.password);
  if (
    errorMessageEmail.textContent === '' &&
    errorMessagePassword.textContent === ''
  ) {
    userAllData.userData.email = inputEmail;
    userAllData.userData.password = inputPassword;
    try {
      const token = await login(userAllData);
      if (token) {
        localStorage.setItem('accessToken', token);
        updateAuthUI();
      }
    } catch {
      showNotification('something went wrong', 'danger');
    }
  }
};
