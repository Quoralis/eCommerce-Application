import { createEl } from '../../utils/createElement.js';
import { validateInput } from '../../services/validators/registrationValidation.js';
import { submitForm } from '../../services/validators/registrationValidation.js';
import { createRegInputs } from './registrationInputs.js';
const containerRegistration = createEl({
  tag: 'div',
  classes: ['uk-height-1-1', 'container-registration'],
});

const regWrapper = createEl({
  tag: 'div',
  classes: ['registration'],
  parent: containerRegistration,
});

createEl({
  tag: 'h1',
  classes: ['registration__heading'],
  text: 'Sign Up',
  parent: regWrapper,
});

export const regForm = createEl({
  tag: 'form',
  classes: ['uk-form', 'registration__form'],
  attributes: {
    novalidate: '',
  },
  parent: regWrapper,
});

regForm.addEventListener('change', (event) => {
  validateInput(event);
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
  classes: [
    'link-registaration',
    'registration__login-link',
    'uk-link',
    'uk-text-center',
  ],
  text: 'Already have an account? Log In',
  parent: regWrapper,
});

export const showRegistrationPage = () => {
  document.querySelector('main')?.append(containerRegistration);
};
