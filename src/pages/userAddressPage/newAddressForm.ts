import { createEl } from '../../utils/createElement.js';
import { getAddressModal } from './addressModal.js';
import { addressInputs } from '../../constants/addressConstants.js';
import { addNewAddress } from './addNewAddress.js';
import { clearDom } from '../../utils/clearDom.js';

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
              classes: ['uk-input', 'user-profile__input', 'select'],
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
    }

    createEl({
      tag: 'button',
      text: 'Add address',
      classes: ['uk-button', 'uk-button-primary', 'button'],
      parent: addressForm,
      onClick: (event) => {
        addNewAddress(event, addressForm);
      },
    });
  }
};
