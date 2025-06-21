import { regValidationRules } from './validationRules.js';
import { validateDate } from './dateValidation.js';
import { toggleValidationNotification } from '../notification/validationNotification.js';

export const verifyInput = (input: Element) => {
  if (input instanceof HTMLInputElement || input instanceof HTMLSelectElement) {
    const inputId = input.id;
    const inputValue = input.value.trim();
    let validationRule;

    if (inputId in regValidationRules) {
      validationRule = regValidationRules[inputId];
    } else {
      const idWithoutNum = inputId.split('-');
      idWithoutNum.pop();
      const id = idWithoutNum.join('');
      validationRule = regValidationRules[id];
    }

    let isValidInput;

    if (inputId === 'birth-date') {
      const isCorrectDate = validateDate();
      isValidInput = inputValue && isCorrectDate;
    } else {
      isValidInput = validationRule?.regExp.test(inputValue);
    }

    const errorMessage =
      inputValue === '' ? 'This field is required' : validationRule?.errMessage;

    if (!isValidInput) {
      toggleValidationNotification(input, errorMessage);
      return false;
    }
  }

  return true;
};
