import { regForm } from '../../pages/registration/registration.js';
import {
  INPUT_ATTRIBUTES,
  FIELDSET_LEGENDS,
} from '../../constants/registrationConstants.js';
import { createEl } from '../../utils/createElement.js';
import { typeCreateElOptions } from '../../types/types.js';
import { getCountrySelect } from '../../components/registrationPage/registrationSelect.js';

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

  for (let i = 0; i < INPUT_ATTRIBUTES.length - 4; i++) {
    createEl(getInputOptions(i, 'input'));
    getErrorTextWrapper();
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
    };

    getAddress();
  }
};
