import { createEl } from '../../utils/createElement.js';
import { userProfileWrapper } from './userProfile.js';
import { getCustomerByEmail } from '../../clients/customerSearchClient.js';
import { openPage } from '../openPage.js';
import { paths } from '../../constants/paths.js';
import { updateCustomerInf } from '../../clients/updateCustomerInf.js';
import { updateCustomer } from '../../types/types.js';
// import { validateInput } from '../../services/validators/registrationValidation.js';

const newpersonalInfo: updateCustomer = {
  version: 0,
  actions: [
    {
      action: 'setFirstName',
      firstName: '',
      /* lastName: '',
      email: '',
      dateOfBirth: '', */
    },
  ],
};

const toggleInputsState = (
  parent: HTMLFormElement,
  disabled: boolean
): void => {
  for (let i = 0; i < parent.length; i++) {
    const input = <HTMLInputElement>parent[i];
    if (!disabled) {
      input.disabled = false;
    } else {
      input.disabled = true;
    }
  }
};

export const createUserProfileInputs = async () => {
  const user = await getCustomerByEmail('Lnsdfncv.@gmail.com'); // email is used for example, it will be replaced later
  const personalInfo = {
    'First name': user[0].firstName,
    'Last name': user[0].lastName,
    'Birth date': user[0].dateOfBirth,
    Email: user[0].email,
    Password: user[0].password,
  };

  const customerInf = createEl({
    tag: 'form',
    classes: ['user-profile__form', 'uk-flex', 'uk-flex-column'],
    parent: userProfileWrapper,
  });

  for (let i = 0; i < Object.keys(personalInfo).length; i++) {
    createEl({
      tag: 'label',
      text: Object.keys(personalInfo)[i],
      classes: ['user-profile__label'],
      parent: customerInf,
      attributes: {
        for: Object.keys(personalInfo)[i],
      },
    });

    /* userProfileInput =   */ createEl({
      tag: 'input',
      classes: ['user-profile__input', 'uk-input'],
      parent: customerInf,
      attributes: {
        id: Object.keys(personalInfo)[i],
        value: Object.values(personalInfo)[i] ?? '',
        disabled: '',
      },
    });
  }

  const btnsWrapper = createEl({
    tag: 'div',
    classes: ['uk-flex', 'uk-flex-center', 'uk-flex-middle'],
    parent: userProfileWrapper,
  });

  const editPersonalInf = createEl({
    tag: 'button',
    text: 'Edit',
    classes: ['button', 'uk-button', 'uk-button-primary'],
    parent: btnsWrapper,
    attributes: {
      type: 'submit',
    },
  });

  editPersonalInf.addEventListener('click', (): void => {
    toggleInputsState(customerInf, false);
    savePersonalInf.disabled = false;
    editPersonalInf.disabled = true;
  });

  const savePersonalInf = createEl({
    tag: 'button',
    text: 'save',
    classes: ['button', 'uk-button', 'uk-button-primary'],
    parent: btnsWrapper,
    attributes: {
      type: 'submit',
      disabled: '',
    },
  });

  savePersonalInf.addEventListener('click', (): void => {
    const allInputs = <NodeListOf<HTMLInputElement>>(
      customerInf.querySelectorAll('.user-profile__input')
    );

    newpersonalInfo.version = user[0].version;
    newpersonalInfo.actions[0].firstName = allInputs[0].value;
    updateCustomerInf(user[0].id, newpersonalInfo);
    toggleInputsState(customerInf, true);
    savePersonalInf.disabled = true;
    editPersonalInf.disabled = false;
  });

  createEl({
    tag: 'p',
    text: 'Addresses',
    classes: ['user-profile__label'],
    parent: userProfileWrapper,
    attributes: {
      id: 'addresses',
    },
  });

  const addressesButton = createEl({
    tag: 'button',
    text: 'Show saved addresses',
    classes: ['button', 'uk-button', 'uk-button-primary'],
    parent: userProfileWrapper,
    attributes: {
      type: 'submit',
    },
  });

  addressesButton.addEventListener('click', (): void => {
    openPage(paths.addresses);
  });
};
