import { createEl } from '../../utils/createElement';
import { createInput } from '../../components/input/input';
import {
  REGISTRATION_INPUTS,
  REGISTRATION_FIELDSET_LEGENDS,
} from '../../constants/registrationInputs';

const regWrapper = createEl({
  tag: 'div',
  classes: ['registration__wrapper'],
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
      parent: regForm,
      type: REGISTRATION_INPUTS[index].type ?? 'text',
      placeholder: REGISTRATION_INPUTS[index].placeholder,
      attributes: REGISTRATION_INPUTS[index].attributes ?? {},
    };
  };

  for (let i = 0; i < REGISTRATION_INPUTS.length - 4; i++) {
    createInput(getInputOptions(i));
  }

  for (let i = 0; i < REGISTRATION_FIELDSET_LEGENDS.length; i++) {
    const fieldset = createEl({
      tag: 'fieldset',
      parent: regForm,
    });

    const legend = createEl({
      tag: 'legend',
      parent: fieldset,
    });
    legend.textContent = REGISTRATION_FIELDSET_LEGENDS[i];

    for (
      let j = REGISTRATION_INPUTS.length - 4;
      j < REGISTRATION_INPUTS.length;
      j++
    ) {
      createInput(getInputOptions(j));
    }
  }
};
createRegInputs();

createEl({
  tag: 'button',
  text: 'Sign Up',
  parent: regForm,
});

createEl({
  tag: 'a',
  text: 'Already have an account? Log In',
  parent: regWrapper,
});
