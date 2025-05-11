import { createEl } from '../../utils/createElement';
import {
  REGISTRATION_INPUTS,
  REGISTRATION_FIELDSET_LEGENDS,
} from '../../constants/registrationInputs';

const regWrapper = createEl({
  tag: 'div',
  classes: ['registration'],
  parent: document.body,
});

createEl({
  tag: 'h1',
  classes: ['registration__heading'],
  text: 'Sign Up',
  parent: regWrapper,
});

const regForm = createEl({
  tag: 'form',
  classes: ['registration__form'],
  parent: regWrapper,
});

const createRegInputs = () => {
  const getInputOptions = (index: number) => {
    return {
      tag: 'input',
      classes: ['registration__input', 'uk-input'],
      parent: regForm,
      attributes: {
        type: REGISTRATION_INPUTS[index].type ?? 'text',
        placeholder: REGISTRATION_INPUTS[index].placeholder,
        ...REGISTRATION_INPUTS[index]['attributes'],
        required: '',
      },
    };
  };

  for (let i = 0; i < REGISTRATION_INPUTS.length - 4; i++) {
    createEl(getInputOptions(i));
  }

  for (let i = 0; i < REGISTRATION_FIELDSET_LEGENDS.length; i++) {
    const fieldset = createEl({
      tag: 'fieldset',
      parent: regForm,
    });

    const legend = createEl({
      tag: 'legend',
      classes: ['legend'],
      parent: fieldset,
    });
    legend.textContent = REGISTRATION_FIELDSET_LEGENDS[i];

    for (
      let j = REGISTRATION_INPUTS.length - 4;
      j < REGISTRATION_INPUTS.length;
      j++
    ) {
      createEl(getInputOptions(j));
    }
  }
};
createRegInputs();

createEl({
  tag: 'button',
  classes: ['button', 'uk-button', 'uk-button-primary'],
  text: 'Sign Up',
  attributes: { type: 'submit' },
  parent: regForm,
});

createEl({
  tag: 'a',
  classes: ['link'],
  text: 'Already have an account? Log In',
  attributes: {
    href: '#',
  },
  parent: regWrapper,
});
