import { regValidationRules, specialRulesForId } from './validationRules.js';
import { regForm } from '../../pages/registration/registration.js';
import { requestBearerToken } from '../../clients/authClient.js';
import {
  ModifiedUserFormValues,
  PartialBaseAddress,
} from '../../types/types.js';
import { toggleValidationNotification } from '../notification/validationNotification.js';
import { showNotification } from '../notification/showNotification.js';
import { getDefaultAddress } from '../../components/registrationPage/selectedDefaultAddress.js';
import { registerAndLogin } from '../../services/authService.js';
import { updateAuthUI } from '../../utils/auth.js';
import { validateDate } from '../validators/dateValidation.js';

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

      let isValidInput;

      if (inputId !== 'birth-date') {
        isValidInput = validationRule?.regExp.test(inputValue);
      } else {
        const isCorrect = validateDate();
        isValidInput = inputValue && isCorrect;
      }

      const errorMessage =
        inputValue === ''
          ? 'This field is required'
          : validationRule?.errMessage;

      if (!isValidInput) {
        toggleValidationNotification(input, errorMessage);
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

        const defaultAddressIndex = getDefaultAddress();
        if (defaultAddressIndex !== undefined) {
          clientData.defaultShippingAddress = defaultAddressIndex;
          clientData.defaultBillingAddress = defaultAddressIndex;
        }

        return clientData;
      };

      const registrationData = getFormData();
      const registrationToken = await requestBearerToken();

      const userData = await registerAndLogin({
        userData: registrationData,
        bearerToken: registrationToken,
      });

      if (userData.accessToken && userData.customerID) {
        showNotification(
          'Your account has been successfully registered',
          'success'
        );
        localStorage.setItem('accessToken', userData.accessToken);
        updateAuthUI();
      } else {
        showNotification(
          'Customer with this email already exists. Try to log in or use another email',
          'danger'
        );
      }
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

export const submitForm = (e: Event) => {
  e.preventDefault();
  validateInput(e);
};
