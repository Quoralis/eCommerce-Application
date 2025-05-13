import { createEl } from '../../utils/createElement';
import { checkInputValue } from '../../services/registrationValidation/validation';
import { createRegInputs } from '../../components/registrationPage/registrationInputs';
import { submitForm } from '../../services/registrationValidation/validation';

const regWrapper = createEl({
  tag: 'div',
  classes: ['registration'],
  parent: document.body,
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

createEl({
  tag: 'a',
  classes: ['link'],
  text: 'Already have an account? Log In',
  attributes: {
    href: '#',
  },
  parent: regWrapper,
});
