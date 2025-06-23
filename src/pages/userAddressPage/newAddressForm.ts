import { createEl } from '../../utils/createElement.js';
import { getAddressModal } from './addressModal.js';
import { addressInputs } from '../../constants/addressConstants.js';
import { clearDom } from '../../utils/clearDom.js';
import { validateInput } from '../../services/validators/registrationValidation.js';
import { getErrorTextWrapper } from '../registrationPage/registrationInputs.js';

export const getNewAddressForm = () => {
  const modalInner = getAddressModal();

  clearDom('modal__inner');

  if (modalInner instanceof HTMLElement) {
    createEl({
      tag: 'h3',
      classes: ['uk-h3', 'uk-modal-title'],
      text: 'New address',
      parent: modalInner,
    });

    const addressForm = createEl({
      tag: 'form',
      classes: ['new-address'],
      parent: modalInner,
    });

    for (let i = 0; i < Object.keys(addressInputs).length; i++) {
      createEl({
        tag: 'label',
        classes: ['user-profile__label'],
        text: Object.keys(addressInputs)[i],
        parent: addressForm,
        attributes: {
          for: Object.values(addressInputs)[i] ?? '',
        },
      });

      const input =
        i === 0
          ? createEl({
              tag: 'select',
              classes: ['uk-select', 'user-profile__input', 'select'],
              parent: addressForm,
              attributes: {
                id: Object.values(addressInputs)[i] ?? '',
              },
            })
          : createEl({
              tag: 'input',
              classes: ['uk-input', 'user-profile__input'],
              parent: addressForm,
              attributes: {
                id: Object.values(addressInputs)[i] ?? '',
              },
            });

      if (i === 0) {
        createEl({
          tag: 'option',
          text: 'Germany',
          parent: input,
          attributes: {
            value: 'DE',
          },
        });
      }

      getErrorTextWrapper(addressForm);
    }

    for (let i = 0; i < 2; i++) {
      createEl({
        tag: 'input',
        parent: addressForm,
        classes: ['uk-checkbox', 'user-profile__input', 'checkbox'],
        attributes: {
          type: 'checkbox',
          id: i === 0 ? 'defaultShipping' : 'defaultBilling',
        },
      });

      createEl({
        tag: 'label',
        parent: addressForm,
        text: i === 0 ? 'Default shipping address' : 'Default billing address',
        classes: ['user-profile__input', 'label'],
        attributes: {
          for: i === 0 ? 'defaultShipping' : 'defaultBilling',
        },
      });
    }

    createEl({
      tag: 'button',
      text: 'Add address',
      classes: ['uk-button', 'uk-button-primary', 'button'],
      parent: addressForm,
      onClick: (event) => {
        event.preventDefault();
        validateInput(event);
      },
    });

    addressForm.addEventListener('change', (event) => {
      validateInput(event);
    });
  }
};
