import { regForm } from './registration.js';
import {
  INPUT_ATTRIBUTES,
  FIELDSET_LEGENDS,
} from '../../constants/registrationConstants.js';
import { createEl } from '../../utils/createElement.js';
import { typeCreateElOptions } from '../../types/types.js';
import { getCountrySelect } from './registrationSelect.js';
import { copyAddressValues } from './selectedDefaultAddress.js';
import { validateDate } from '../../services/validators/dateValidation.js';

export const createRegInputs = () => {
  const getInputOptions = (index: number, htmlTag: string) => {
    return {
      tag: htmlTag,
      classes: ['registration__input', 'uk-input'],
      parent: regForm,
      attributes: {
        ...INPUT_ATTRIBUTES[index],
        type: INPUT_ATTRIBUTES[index].type ?? 'text',
        required: '',
      },
    };
  };
  const getErrorTextWrapper = () =>
    createEl({
      tag: 'div',
      classes: ['registration__error-wrapper'],
      parent: regForm,
    });

  for (let i = 0; i < 5; i++) {
    const input = createEl(getInputOptions(i, 'input'));
    getErrorTextWrapper();

    if (i === 3 && input instanceof HTMLInputElement) {
      input.addEventListener('focus', () => (input.type = 'date'));
      input.addEventListener('blur', () => (input.type = 'text'));

      input.addEventListener('change', () => {
        validateDate();
      });
    }
  }

  for (let i = 0; i < FIELDSET_LEGENDS.length; i++) {
    const getAddress = () => {
      const fieldset = createEl({
        tag: 'fieldset',
        parent: regForm,
      });

      const legend = createEl({
        tag: 'legend',
        classes: ['legend'],
        parent: fieldset,
      });
      legend.textContent = FIELDSET_LEGENDS[i];

      getCountrySelect(i, getErrorTextWrapper);

      for (
        let j = INPUT_ATTRIBUTES.length - 3;
        j < INPUT_ATTRIBUTES.length;
        j++
      ) {
        const changeInputId = (optionsObj: typeCreateElOptions) => {
          if (optionsObj.attributes) {
            optionsObj.attributes.id += `-${i + 1}`;
          }

          return optionsObj;
        };

        const inputOptionsWithChangedId = changeInputId(
          getInputOptions(j, 'input')
        );
        createEl(inputOptionsWithChangedId);
        getErrorTextWrapper();
      }

      const label = createEl({
        tag: 'label',
        text: 'Set as default shipping & billing address',
        parent: regForm,
      });
      const defaultAddressRadio = createEl({
        tag: 'input',
        classes: ['registration__default-address'],
        attributes: {
          id: FIELDSET_LEGENDS[i].toLowerCase().split(' ').join('-'),
          type: 'radio',
          name: 'default-address',
        },
        parent: regForm,
      });
      label.setAttribute('for', defaultAddressRadio.id);
      defaultAddressRadio.addEventListener('change', (event) => {
        copyAddressValues(event);
      });
    };

    getAddress();
  }
};
