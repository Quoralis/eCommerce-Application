import { createEl } from '../../utils/createElement.js';
import { regValidationRules, specialRulesForId } from './validationRules.js';
import { regForm } from '../../pages/registration/registration.js';

export const validateInput = (e: Event) => {
  const checkInputValue = (input: Element) => {
    if (input instanceof HTMLInputElement) {
      const inputId = input.id;
      const inputValue = input.value.trim();
      let validationRule;

      if (inputId in regValidationRules) {
        validationRule = regValidationRules[inputId];
      } else if (inputId in specialRulesForId) {
        const inputRule = specialRulesForId[inputId];
        validationRule = regValidationRules[inputRule];
      }

      const isValidInput = validationRule?.regExp.test(inputValue);
      const errorMessage =
        inputValue === ''
          ? 'This field is required'
          : validationRule?.errMessage;

      if (!isValidInput) {
        showRegError(input, errorMessage);
      }
    }
  };

  if (e.type === 'click') {
    for (let i = 0; i < regForm.children.length; i++) {
      if (regForm.children[i].matches('.registration__input')) {
        const inputEl = regForm.children[i];
        checkInputValue(inputEl);
      }
    }
  } else if (e.type === 'change') {
    if (e.target instanceof HTMLInputElement) {
      const input = e.target;
      checkInputValue(input);
    }
  }
};

export const showRegError = (
  inputEl: HTMLInputElement,
  errText: string | undefined
) => {
  const inputErrText = createEl({
    tag: 'small',
    classes: ['registration__error'],
    text: errText,
  });

  let error: HTMLElement | undefined;

  if (errText && inputEl.nextElementSibling?.childNodes.length === 0) {
    inputEl.nextElementSibling?.append(inputErrText);
    error = inputErrText;
  } else {
    if (inputEl.nextElementSibling?.childNodes[0] instanceof HTMLElement) {
      error = inputEl.nextElementSibling?.childNodes[0];
    }
  }

  setTimeout(() => {
    error?.classList.add('registration__error_active');
  }, 0);
  inputEl?.addEventListener(
    'input',
    () => {
      inputErrText.classList.remove('registration__error_active');
      setTimeout(() => {
        error?.remove();
      }, 300);
    },
    { once: true }
  );
};

export const submitForm = (e: Event) => {
  e.preventDefault();

  validateInput(e);
};
