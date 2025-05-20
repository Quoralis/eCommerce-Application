import { createEl } from '../../utils/createElement.js';
// import { regForm } from '../registration/registration.js';
import { regForm } from './registration.js';
import {
  INPUT_ATTRIBUTES,
  COUNTRY_VALUES,
} from '../../constants/registrationConstants.js';

export const getCountrySelect = (index: number, callback: () => void) => {
  const countrySelect = createEl({
    tag: 'select',
    classes: ['registration__input', 'uk-input'],
    parent: regForm,
    attributes: {
      ...INPUT_ATTRIBUTES[5],
      type: INPUT_ATTRIBUTES[5].type ?? 'text',
      id: `${INPUT_ATTRIBUTES[5].id}-${index + 1}`,
      required: '',
    },
  });

  if (countrySelect instanceof HTMLInputElement) {
    countrySelect.name = 'country';
    countrySelect.id = 'country-select';
  }

  for (let i = 0; i < COUNTRY_VALUES.length; i++) {
    createEl({
      tag: 'option',
      text: COUNTRY_VALUES[i].country,
      parent: countrySelect,
      attributes: {
        value: COUNTRY_VALUES[i].value,
      },
    });
  }

  callback();
};
