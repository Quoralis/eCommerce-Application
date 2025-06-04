import { createEl } from '../../utils/createElement.js';
import { getCurrentUser } from '../../clients/customerSearchClient.js';
import { userAddressesWrapper } from './userAddresses.js';
import { PartialBaseAddress } from '../../types/types.js';
import { toggleUpdateAddressButton } from './updateAddressButton.js';
import { addressInputs } from '../../constants/addressConstants.js';
import { deleteAddress } from './deleteAddress.js';
import { getDefaultAddressCheckboxes } from './defaultAddressCheckboxes.js';
import { getErrorTextWrapper } from '../registrationPage/registrationInputs.js';
import { clearDom } from '../../utils/clearDom.js';

const clearAddressesWrapper = () => {
  const wrapper = document.querySelector('.user-addresses');

  if (wrapper) {
    const backToUserBtn = document.querySelector('button[data-path="/user"]');
    clearDom('user-addresses');
    if (backToUserBtn instanceof Node) {
      wrapper.append(backToUserBtn);
    }
  }
};

export const createUserAddressInputs = async () => {
  clearAddressesWrapper();

  const currentUser = await getCurrentUser();

  const showAddress = (address: PartialBaseAddress, addressIndex: number) => {
    if (!currentUser) return;
    if (currentUser.addresses) {
      const addressWrapper = createEl({
        tag: 'form',
        classes: ['address-wrapper'],
        parent: userAddressesWrapper,
        attributes: {
          id: `addressWrapper-${addressIndex + 1}`,
          'data-id': currentUser.addresses[addressIndex].id ?? '',
        },
      });

      const addressId = currentUser.addresses[addressIndex]?.id;

      createEl({
        tag: 'h3',
        text: `Address ${addressIndex + 1}`,
        parent: addressWrapper,
      });

      for (let i = 0; i < 4; i++) {
        createEl({
          tag: 'label',
          classes: ['user-profile__label'],
          parent: addressWrapper,
          text: Object.keys(addressInputs)[i],
          attributes: {
            for: `${Object.values(addressInputs)[i]}-${addressIndex + 1}`,
          },
        });

        const key = Object.values(addressInputs)[i] ?? '';

        const input =
          i === 0
            ? createEl({
                tag: 'select',
                classes: ['user-profile__input', 'uk-input', 'select'],
                parent: addressWrapper,
                attributes: {
                  id: `${Object.values(addressInputs)[i]}-${addressIndex + 1}`,
                  disabled: '',
                },
              })
            : createEl({
                tag: 'input',
                classes: ['user-profile__input', 'uk-input'],
                parent: addressWrapper,
                attributes: {
                  id: `${Object.values(addressInputs)[i]}-${addressIndex + 1}`,
                  value: address[key] ?? '',
                  disabled: '',
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

        getErrorTextWrapper(addressWrapper);
      }

      for (let i = 0; i < 2; i++) {
        getDefaultAddressCheckboxes(i, addressIndex, addressWrapper);
      }

      const checkboxes = document.querySelectorAll('.checkbox');

      if (
        currentUser.defaultShippingAddressId === addressId &&
        checkboxes[0] instanceof HTMLInputElement
      ) {
        checkboxes[0].checked = true;
      }

      if (
        currentUser.defaultBillingAddressId === addressId &&
        checkboxes[1] instanceof HTMLInputElement
      ) {
        checkboxes[1].checked = true;
      }

      createEl({
        tag: 'button',
        text: 'Edit address',
        classes: ['button', 'uk-button', 'uk-button-primary'],
        parent: addressWrapper,
        attributes: {
          type: 'button',
        },
        onClick: (event) => {
          toggleUpdateAddressButton(event);
        },
      });

      createEl({
        tag: 'button',
        text: 'Delete address',
        classes: [
          'button',
          'uk-button',
          'uk-button-primary',
          'address-wrapper__delete-btn',
        ],
        parent: addressWrapper,
        attributes: {
          type: 'button',
          id: currentUser.addresses[addressIndex].id ?? '',
        },
        onClick: async (event) => {
          await deleteAddress(event);
        },
      });
    }
  };

  if (!currentUser) return;
  if (currentUser.addresses) {
    for (let i = 0; i < currentUser.addresses.length; i++) {
      showAddress(currentUser.addresses[i], i);
    }
  }
};
