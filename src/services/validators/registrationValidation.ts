import { createEl } from '../../utils/createElement.js';
import { regValidationRules, specialRulesForId } from './validationRules.js';

export const checkInputValue = (e: Event) => {
  if (e.target instanceof HTMLInputElement) {
    const inputId = e.target.id;
    const inputValue = e.target.value.trim();
    let validationRule;

    if (inputId in regValidationRules) {
      validationRule = regValidationRules[inputId];
    } else if (inputId in specialRulesForId) {
      const inputRule = specialRulesForId[inputId];
      validationRule = regValidationRules[inputRule];
    }
    const errorMessage = validationRule?.errMessage;
    const isValidInput = validationRule?.regExp.test(inputValue);

    if (!isValidInput) {
      showRegError(e.target, errorMessage);
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
};
