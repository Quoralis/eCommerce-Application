import { createEl } from '../../utils/createElement.js';
import { userProfileWrapper } from './userProfile.js';
import { getCustomerByEmail } from '../../clients/customerSearchClient.js';

import {
  validateEmailOrPassword,
  loginType,
} from '../loginPage/authorization.js';
import { toggleInputsState } from './toggleInputsState.js';
import { updateUserPassword } from './updateUserPassword.js';
import { rejectUpdateInf } from './rejectUpdateInf.js';
import { updateUserInf } from './updateUserInf.js';
import { showBlockPassword } from './showBlockPassword.js';

const operationWithInputs = ['Edit', 'Cancel', 'Save'];

export const createUserProfileInputs = async (email: string) => {
  const user = await getCustomerByEmail(email);
  const personalInfo = {
    'First name': user[0].firstName,
    'Last name': user[0].lastName,
    Email: user[0].email,
    'Birth date': user[0].dateOfBirth,
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

    createEl({
      tag: 'input',
      classes: ['user-profile__input', 'uk-input'],
      parent: customerInf,
      attributes: {
        id: Object.keys(personalInfo)[i],
        value: Object.values(personalInfo)[i] ?? '',
        disabled: '',
      },
    });
    /* const errorMessagePassword =  */ createEl({
      // этот спан для ошибок валидации
      tag: 'span',
      classes: [
        'uk-text-small',
        'uk-margin-xsmall-left',
        'email-error',
        'uk-text-danger',
        'error-message',
      ],
      parent: customerInf,
    });
  }
  changeBlock(email, true, customerInf);
  showBlockPassword(email);
  showAddressBlock();
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

export const changeBlock = (
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
    saveBtn.addEventListener('click', (): void => {
      if (save) {
        updateUserInf(email, parent);
        saveBtn.disabled = true;
        editBtn.disabled = false;
        cancelBtn.disabled = true;
      } else {
        const currentPasswordInput = <HTMLInputElement>(
          parent.firstElementChild?.lastElementChild
        );
        const newPasswordInput = <HTMLInputElement>(
          parent.lastElementChild?.previousElementSibling?.lastElementChild
        );
        const firstError = <HTMLElement>(
          parent.firstElementChild?.nextElementSibling
        );
        const secondError = <HTMLElement>parent.lastElementChild;
        validateEmailOrPassword(
          currentPasswordInput.value,
          loginType.password,
          firstError
        );
        validateEmailOrPassword(
          newPasswordInput.value,
          loginType.password,
          secondError
        );
        if (firstError.textContent === '' && secondError.textContent === '') {
          saveBtn.disabled = true;
          editBtn.disabled = false;
          cancelBtn.disabled = true;
          updateUserPassword(email, parent);
          rejectUpdateInf(email, false, parent);
        }
      }
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
