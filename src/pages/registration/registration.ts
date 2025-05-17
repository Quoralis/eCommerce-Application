import { createEl } from '../../utils/createElement.js';
import { checkInputValue } from '../../services/validators/registrationValidation.js';
import { createRegInputs } from '../../components/registrationPage/registrationInputs.js';
import { submitForm } from '../../services/validators/registrationValidation.js';
import { openPage } from '../openPage.js';
import { pathes } from '../../constants/pathes.js';
const regWrapper = createEl({
  tag: 'div',
  classes: ['registration'],
});

createEl({
  tag: 'h1',
  classes: ['registration__heading'],
  text: 'Sign Up',
  parent: regWrapper,
});

export const regForm = createEl({
  tag: 'form',
  classes: ['registration__form'],
  attributes: {
    novalidate: '',
  },
  parent: regWrapper,
});

regForm.addEventListener('change', (event) => {
  checkInputValue(event);
});

createRegInputs();

const submitBtn = createEl({
  tag: 'button',
  classes: ['button', 'uk-button', 'uk-button-primary'],
  text: 'Sign Up',
  attributes: { type: 'submit' },
  parent: regForm,
});

submitBtn.addEventListener('click', (event) => {
  submitForm(event);
});

export const loginLink = createEl({
  tag: 'a',
  classes: ['link-registaration', 'registration__login-link', 'uk-link'],
  text: 'Already have an account? Log In',
  parent: regWrapper,
});

loginLink.addEventListener('click', (): void => {
  openPage(pathes.login);
});

export const showRegistrationPage = () => {
  document.querySelector('main')?.append(regWrapper);
};
