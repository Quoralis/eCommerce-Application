import { createEl } from '../../utils/createElement.js';
import { userProfileWrapper } from './userProfile.js';
import { getCustomerByEmail } from '../../clients/customerSearchClient.js';

export const createUserProfileInputs = async () => {
  const user = await getCustomerByEmail('user@us.er'); // email is used for example, it will be replaced later
  const personalInfo = {
    'First name': user[0].firstName,
    'Last name': user[0].lastName,
    'Birth date': user[0].dateOfBirth,
  };

  createEl({
    tag: 'form',
    classes: ['user-profile__form'],
    parent: userProfileWrapper,
  });

  for (let i = 0; i < Object.keys(personalInfo).length; i++) {
    createEl({
      tag: 'label',
      text: Object.keys(personalInfo)[i],
      classes: ['user-profile__label'],
      parent: userProfileWrapper,
      attributes: {
        for: Object.keys(personalInfo)[i],
      },
    });

    createEl({
      tag: 'input',
      classes: ['user-profile__input', 'uk-input'],
      parent: userProfileWrapper,
      attributes: {
        id: Object.keys(personalInfo)[i],
        value: Object.values(personalInfo)[i] ?? '',
        disabled: '',
      },
    });
  }

  createEl({
    tag: 'button',
    text: 'Edit personal information',
    classes: ['button', 'uk-button', 'uk-button-primary'],
    parent: userProfileWrapper,
    attributes: {
      type: 'submit',
    },
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
