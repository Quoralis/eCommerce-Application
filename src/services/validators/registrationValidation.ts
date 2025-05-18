import { createEl } from '../../utils/createElement.js';
import { regValidationRules, specialRulesForId } from './validationRules.js';
import { regForm } from '../../pages/registration/registration.js';
import { registerCustomer } from '../../clients/customerClient.js';
import { requestBearerToken } from '../../clients/authClient.js';
import {
  ModifiedUserFormValues,
  PartialBaseAddress,
} from '../../types/types.js';

export const validateInput = (e: Event) => {
  const verifyInput = (input: Element) => {
    if (
      input instanceof HTMLInputElement ||
      input instanceof HTMLSelectElement
    ) {
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
        return false;
      }
    }

    return true;
  };

  if (e.type === 'click') {
    const regFormInputs = [...regForm.children].filter((child) =>
      child.matches('.registration__input')
    );
    regFormInputs.forEach((inputEl) => verifyInput(inputEl));

    const registerClient = async () => {
      const getFormData = () => {
        const formValues = regFormInputs.map((input) => {
          if (
            input instanceof HTMLInputElement ||
            input instanceof HTMLSelectElement
          ) {
            return input.value;
          }
        });

        const clientData: ModifiedUserFormValues = {
          email: '',
          password: '',
          addresses: [],
        };

        const mainInputs: (keyof ModifiedUserFormValues)[] = [
          'firstName',
          'lastName',
          'email',
          'dateOfBirth',
          'password',
        ];
        mainInputs.forEach((key, index) => {
          const value = formValues[index] ?? '';
          clientData[key] = value;
        });

        for (let i = 0; i < 2; i++) {
          const address: PartialBaseAddress = {};
          const addressInputs = ['country', 'city', 'streetName', 'postalCode'];
          const addressesIndex = 5;
          const startIndex = addressesIndex + i * addressInputs.length;

          addressInputs.forEach((value, index) => {
            address[value] = formValues[startIndex + index];
          });

          if (Array.isArray(clientData.addresses)) {
            clientData.addresses?.push(address);
          }
        }
        return clientData;
      };

      const registrationData = getFormData();
      const registrationToken = await requestBearerToken();

      registerCustomer({
        userData: registrationData,
        bearerToken: registrationToken,
      });
    };

    const isValidForm = regFormInputs.every((input) => verifyInput(input));
    if (isValidForm) {
      registerClient();
    }
  } else if (e.type === 'change') {
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLSelectElement
    ) {
      const input = e.target;
      verifyInput(input);
    }
  }
};

export const showRegError = (
  inputEl: HTMLInputElement | HTMLSelectElement,
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
