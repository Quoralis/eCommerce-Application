import { regForm } from '../../pages/registration/registration';
import {
  INPUT_ATTRIBUTES,
  FIELDSET_LEGENDS,
} from '../../constants/registrationConstants';
import { createEl } from '../../utils/createElement';
import { typeCreateElOptions } from '../../types/types';
import { getCountrySelect } from '../../components/registrationPage/registrationSelect';

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

      const defaultAddressRadio = createEl({
        tag: 'input',
        attributes: {
          id: FIELDSET_LEGENDS[i].toLowerCase().split(' ').join('-'),
          type: 'radio',
          name: 'default-address',
        },
        parent: fieldset,
      });
      createEl({
        tag: 'label',
        text: 'Set as default shipping & billing address',
        attributes: {
          for: defaultAddressRadio.id,
        },
        parent: fieldset,
      });

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
