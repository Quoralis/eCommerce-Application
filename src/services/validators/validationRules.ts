import { IRegValidationRules } from '../../types/types.js';

export const regValidationRules: IRegValidationRules = {
  firstName: {
    regExp: /^[a-zа-яё]+$/i,
    errMessage: 'No numbers or special characters allowed',
  },
  email: {
    regExp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
    errMessage: 'Invalid email format',
  },
  dateOfBirth: {
    regExp: /^\d{4}\-\d{2}\-\d{2}$/,
    errMessage: 'Birth date must be in YYYY-MM-DD format',
  },
  password: {
    regExp: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?!.*\s).{8,}$/,
    errMessage: 'Must contain 8+ chars with uppercase, lowercase & digit',
  },
  country: {
    regExp: /^DE$/,
    errMessage: '',
  },
  streetName: {
    regExp: /^\S+$/,
    errMessage: 'Street must contain 1+ chars',
  },
  postalCode: {
    regExp: /^\d{5}$/,
    errMessage: 'Postal code must include 5 digits',
  },
};

regValidationRules.lastName = regValidationRules.firstName;
regValidationRules.city = regValidationRules.firstName;
