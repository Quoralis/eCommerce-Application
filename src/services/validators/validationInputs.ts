import {
  inputEmail,
  inputPassword,
  errorMessageEmail,
  errorMessagePassword,
} from '../../components/loginPage/loginStructure.js';
import { loginType } from '../../components/loginPage/authorization.js';

const regExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const regExpAZ = /[A-Z]+/;
const regExpAZLowerCase = /[a-z]+/;
const regExpNumbers = /[0-9]+/;
const regExpSpecialCharacter = /[@#$%^&*()!]+/;
const limitSymbols = 8;

const incorrectDataInInput = (typeInput: string): void => {
  if (typeInput === loginType.email) {
    inputEmail.classList.add('uk-form-danger');
    errorMessageEmail.classList.add('uk-form-danger');
  } else if (typeInput === loginType.password) {
    inputPassword.classList.add('uk-form-danger');
    errorMessagePassword.classList.add('uk-form-danger');
  }
};

const correctDataInInput = (typeInput: string): void => {
  if (typeInput === loginType.email) {
    inputEmail.classList.remove('uk-form-danger');
  } else if (typeInput === loginType.password) {
    inputPassword.classList.remove('uk-form-danger');
  }
};

export const isValidDomain = (text: string): void => {
  if (!regExp.test(text)) {
    errorMessageEmail.textContent =
      "don't have domain name: example.ars@mail.com";
    incorrectDataInInput(loginType.email);
  } else {
    correctDataInInput(loginType.email);
    errorMessageEmail.textContent = '';
  }
};

export const isValidPassword = (text: string): void => {
  let errorMessage = '';
  if (text.length < limitSymbols) {
    errorMessage = 'symbols need more than 8';
  } else if (!regExpAZ.test(text)) {
    errorMessage = 'password need 1 A-Z';
  } else if (!regExpAZLowerCase.test(text)) {
    errorMessage = 'password need 1 a-z';
  } else if (!regExpNumbers.test(text)) {
    errorMessage = 'password need number 0-9';
  } else if (!regExpSpecialCharacter.test(text)) {
    errorMessage = 'password need 1 special character: @#$%^&*()!';
  }

  if (errorMessage !== '') {
    errorMessagePassword.textContent = errorMessage;
    incorrectDataInInput(loginType.password);
  } else {
    errorMessagePassword.textContent = '';
    correctDataInInput(loginType.password);
  }
};
