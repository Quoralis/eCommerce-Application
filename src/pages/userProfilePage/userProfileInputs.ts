import { createEl } from '../../utils/createElement.js';
import { userProfileWrapper } from './userProfile.js';
import { getCustomerByEmail } from '../../clients/customerSearchClient.js';
import { paths } from '../../constants/paths.js';
import { updateCustomerInf } from '../../clients/updateCustomerInf.js';
import {
  updateCustomer,
  updateCustomerPasswordType,
} from '../../types/types.js';
import { showPasswordOrHide } from '../loginPage/showPassword.js';
import { updateCustomerPassword } from '../../clients/updateCustomerPassword.js';


const anothersActions = [
  'setFirstName',
  'setLastName',
  'changeEmail',
  'setDateOfBirth',
];

type actionObj = { action: string; [key: string]: string };

const changeFields = ['firstName', 'lastName', 'email', 'dateOfBirth'];
const passwordsPlaceholders = ['Current Password', 'New Password'];
const operationWithInputs = ['Edit', 'Cancel', 'Save'];
const newPersonalInfo: updateCustomer = {
  version: 0,
  actions: [],
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

export const createUserProfileInputs = async (email: string) => {
  const user = await getCustomerByEmail(email);
  const personalInfo = {
    'First name:': user[0].firstName,
    'Last name:': user[0].lastName,
    'Email:': user[0].email,
    'Birth date:': user[0].dateOfBirth,
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
  changeBlock(email, true, customerInf);
  changePassword(email);
  showAddressBlock();
};

const changePassword = (email: string): void => {
  createEl({
    tag: 'p',
    text: 'Password:',
    classes: ['user-profile__label'],
    parent: userProfileWrapper,
    attributes: {
      id: 'addresses',
    },
  });
  const containerPassword = createEl({
    tag: 'form',
    classes: ['user-profile__form', 'uk-flex', 'uk-flex-column'],
    parent: userProfileWrapper,
  });
  let passwordWrapper: HTMLDivElement;
  for (let i = 0; i < 2; i++) {
    passwordWrapper = createEl({
      tag: 'div',
      classes: ['uk-inline', 'password-wrapper'],
      parent: containerPassword,
    });

    const iconEyeSlash = createEl({
      tag: 'a',
      classes: ['uk-form-icon', 'uk-form-icon-flip'],
      attributes: { 'uk-icon': 'icon: eye-slash' },
      parent: passwordWrapper,
    });

    iconEyeSlash.addEventListener('click', (): void => {
      showPasswordOrHide(inputPassword, iconEyeSlash);
    });

    const inputPassword = createEl({
      tag: 'input',
      classes: ['uk-input', 'user-profile__input'],
      attributes: {
        placeholder: passwordsPlaceholders[i],
        type: 'password',
        autocomplete: 'current-password',
      },
      parent: passwordWrapper,
    });
  }
  toggleInputsState(containerPassword, true);
  changeBlock(email, false, containerPassword);
};

const changeBlock = (
  email: string,
  save: boolean,
  parent?: HTMLFormElement
): void => {
  const btnsWrapper = createEl({
    tag: 'div',
    classes: ['uk-flex', 'uk-flex-center', 'uk-flex-middle'],
    parent: userProfileWrapper,
  });
  for (let i = 0; i < 3; i++) {
    createEl({
      tag: 'button',
      text: operationWithInputs[i],
      classes: ['button', 'uk-button', 'uk-button-primary'],
      parent: btnsWrapper,
      attributes: {
        type: 'submit',
      },
    });
  }
  const editBtn = <HTMLButtonElement>btnsWrapper.firstElementChild;
  const cancelBtn = <HTMLButtonElement>editBtn.nextElementSibling;
  const saveBtn = <HTMLButtonElement>btnsWrapper.lastElementChild;
  cancelBtn.disabled = true;
  saveBtn.disabled = true;
  if (parent) {
    saveBtn?.addEventListener('click', (): void => {
      if (save) {
        updateUserInformation(email, parent);
      } else {
        updateUserPassword(email, parent);
        rejectUpdateInf(email, false, parent);
      }
      saveBtn.disabled = true;
      editBtn.disabled = false;
      cancelBtn.disabled = true;
    });
    editBtn.addEventListener('click', (): void => {
      toggleInputsState(parent, false);
      cancelBtn.disabled = false;
      saveBtn.disabled = false;
      editBtn.disabled = true;
    });
    cancelBtn.addEventListener('click', async () => {
      rejectUpdateInf(email, save, parent);
      toggleInputsState(parent, true);
      cancelBtn.disabled = true;
      saveBtn.disabled = true;
      editBtn.disabled = false;
    });
  }
};

const updateUserInformation = async (
  email: string,
  parent: HTMLFormElement
): Promise<void> => {
  const user = await getCustomerByEmail(email);
  const allInputs = <NodeListOf<HTMLInputElement>>(
    parent.querySelectorAll('.user-profile__input')
  );
  for (let i = 0; i < allInputs.length; i++) {
    const field = changeFields[i];
    const newInf: actionObj = {
      action: anothersActions[i],
    };
    if (field === 'email') {
      localStorage.setItem('email', allInputs[2].value);
    }
    newInf[field] = allInputs[i].value;
    newPersonalInfo.actions.push(newInf);
  }

  newPersonalInfo.version = user[0].version;
  updateCustomerInf(user[0].id, newPersonalInfo);
  toggleInputsState(parent, true);
};

const rejectUpdateInf = async (
  email: string,
  save: boolean,
  parent: HTMLFormElement
): Promise<void> => {
  const user = await getCustomerByEmail(email);
  const allInputs = <NodeListOf<HTMLInputElement>>(
    parent.querySelectorAll('.user-profile__input')
  );
  const informatonUser = [
    user[0].firstName,
    user[0].lastName,
    user[0].email,
    user[0].dateOfBirth,
  ];
  for (let i = 0; i < allInputs.length; i++) {
    if (save) {
      allInputs[i].value = <string>informatonUser[i];
    } else {
      allInputs[i].value = '';
    }
  }
};

const updateUserPassword = async (
  email: string,
  parent: HTMLFormElement
): Promise<void> => {
  const user = await getCustomerByEmail(email);
  const currentPasswordInput = <HTMLInputElement>(
    parent.firstElementChild?.lastElementChild
  );
  const newPasswordInput = <HTMLInputElement>(
    parent.lastElementChild?.lastElementChild
  );
  const updatePassword: updateCustomerPasswordType = {
    id: user[0].id,
    version: <number>user[0].version,
    currentPassword: currentPasswordInput.value,
    newPassword: newPasswordInput.value,
  };
  await updateCustomerPassword(updatePassword);
  toggleInputsState(parent, true);
};

const showAddressBlock = (): void => {
  createEl({
    tag: 'p',
    text: 'Addresses:',
    classes: ['user-profile__label'],
    parent: userProfileWrapper,
    attributes: {
      id: 'addresses',
    },
  });

  createEl({
    tag: 'button',
    text: 'Show saved addresses',
    classes: ['button', 'uk-button', 'uk-button-primary'],
    parent: userProfileWrapper,
    attributes: {
      type: 'submit',
      'data-path': '/user/addresses',
    },
  });
};
