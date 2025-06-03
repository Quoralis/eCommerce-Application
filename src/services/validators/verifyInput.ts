import { regValidationRules } from './validationRules.js';
import { specialRulesForId } from './validationRules.js';
import { validateDate } from './dateValidation.js';
import { toggleValidationNotification } from '../notification/validationNotification.js';

export const verifyInput = (input: Element) => {
  if (input instanceof HTMLInputElement || input instanceof HTMLSelectElement) {
    const inputId = input.id;
    const inputValue = input.value.trim();
    let validationRule;

    if (
      inputId.split('-')[0] === 'postalCode' ||
      inputId.split('-')[0] === 'streetName'
    ) {
      validationRule =
        inputId.split('-')[0] === 'postalCode'
          ? regValidationRules['postal-code']
          : regValidationRules['street'];
    } else if (inputId in regValidationRules) {
      validationRule = regValidationRules[inputId];
    } else if (inputId in specialRulesForId) {
      const inputRule = specialRulesForId[inputId];
      validationRule = regValidationRules[inputRule];
    }

    let isValidInput;

    if (inputId !== 'birth-date') {
      isValidInput = validationRule?.regExp.test(inputValue);
    } else {
      const isCorrect = validateDate();
      isValidInput = inputValue && isCorrect;
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
