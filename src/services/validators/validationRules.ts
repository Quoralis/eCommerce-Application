import { IRegValidationRules } from '../../types/types.js';

export const regValidationRules: IRegValidationRules = {
  name: {
    regExp: /^[a-zа-яё]+$/i,
    errMessage: 'No numbers or special characters allowed',
  },
  email: {
    regExp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
    errMessage: 'Invalid email format',
  },
  'birth-date': {
    regExp: /^\d{4}\-\d{2}\.\d{2}$/,
    errMessage: 'Birth date must be in YYYY-MM-DD format',
  },
  password: {
    regExp: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?!.*\s).{8,}$/,
    errMessage: 'Must contain 8+ chars with uppercase, lowercase & digit',
  },
  street: {
    regExp: /^\S+$/,
    errMessage: 'Street must contain 1+ chars',
  },
  'postal-code': {
    regExp: /^\d{5}$/,
    errMessage: 'Postal code must include 5 digits',
  },
};

export const specialRulesForId: Record<string, string> = {
  'last-name': 'name',
  'city-1': 'name',
  'city-2': 'name',
  'street-1': 'street',
  'street-2': 'street',
  'postal-code-1': 'postal-code',
  'postal-code-2': 'postal-code',
};
