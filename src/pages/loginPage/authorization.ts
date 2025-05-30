import { errorMessageEmail, errorMessagePassword } from './loginStructure.js';
import {
  isValidDomain,
  isValidPassword,
} from '../../services/validators/validationInputs.js';
import { login } from '../../services/authService.js';
import { RegistrationLoginData } from '../../types/types.js';
import { updateAuthUI } from '../../utils/auth.js';
import { getCustomerByEmail } from '../../clients/customerSearchClient.js';

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
      const errorMailElement = document.querySelector('.email-error');
      const errorPasswordElement = document.querySelector('.password-error');

      const customers = await getCustomerByEmail(inputEmail);
      if (customers.length === 0 && errorMailElement) {
        errorMailElement.textContent = 'Invalid email, try again';
        return;
      }
      const accessToken = await login(userAllData);
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        console.log('data-login', userAllData.userData.email);
        localStorage.setItem('email', userAllData.userData.email);
        updateAuthUI();
      } else {
        if (errorPasswordElement)
          errorPasswordElement.textContent = 'Invalid password, try again';
      }
    } catch (err: unknown) {
      console.log(err, 'warning');
    }
  }
};
