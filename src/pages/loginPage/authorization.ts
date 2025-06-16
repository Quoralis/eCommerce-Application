import { errorMessageEmail, errorMessagePassword } from './loginStructure.js';
import {
  isValidDomain,
  isValidPassword,
} from '../../services/validators/validationInputs.js';
import { login } from '../../services/authService.js';
import {
  RegistrationLoginData,
  UserFormValues,
  responseMyCart,
} from '../../types/types.js';
import { updateAuthUI } from '../../utils/auth.js';
import { getCustomerByEmail } from '../../clients/customerSearchClient.js';
import { mergeCartWithCustomer } from '../../clients/mergeCartWithCustomer.js';
import { getActiveCart } from '../../clients/getActiveCart.js';
import { getMyCart } from '../../clients/getMyCart.js';
import { updateBadgeNumber } from '../header/updateBadgeNumber.js';
import { basketBtn } from '../header/headerStructure.js';
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

const userDataCart: UserFormValues = {
  email: '',
  password: '',
  anonymousCart: {
    id: <string>localStorage.getItem('cartId'),
    typeId: 'cart',
  },
  anonymousCartSignInMode: 'MergeWithExistingCustomerCart',
};

export const validateEmailOrPassword = (
  inputValue: string,
  type: string,
  el?: HTMLElement
): void => {
  if (el) {
    if (type === loginType.email) {
      isValidDomain(inputValue, el);
    } else if (type === loginType.password) {
      isValidPassword(inputValue, el);
    }
  }
};

export const submitLoginForm = async (
  inputEmail: string,
  inputPassword: string
): Promise<void> => {
  validateEmailOrPassword(inputEmail, loginType.email, errorMessageEmail);
  validateEmailOrPassword(
    inputPassword,
    loginType.password,
    errorMessagePassword
  );
  if (
    errorMessageEmail.textContent === '' &&
    errorMessagePassword.textContent === ''
  ) {
    userAllData.userData.email = inputEmail;
    userAllData.userData.password = inputPassword;

    userDataCart.email = inputEmail;
    userDataCart.password = inputPassword;
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
        localStorage.setItem('email', userAllData.userData.email);
        await mergeCart(userDataCart);
        updateAuthUI();
        const updateBadge = <responseMyCart>await getMyCart();
        updateBadgeNumber(updateBadge);
      } else {
        if (errorPasswordElement)
          errorPasswordElement.textContent = 'Invalid password, try again';
      }
    } catch (err: unknown) {
      console.log(err, 'warning');
    }
  }
};

export const mergeCart = async (data: UserFormValues): Promise<void> => {
  const activeCart = await getActiveCart();
  if (!activeCart) {
    const mergeCart = <UserFormValues>await mergeCartWithCustomer(data);
    console.log('merge', mergeCart);
  } else {
    localStorage.setItem('cartId', <string>activeCart.id);
    console.log('active-cart', activeCart);
  }
  basketBtn.disabled = false;
};
