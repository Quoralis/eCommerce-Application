import { createEl } from '../../utils/createElement.js';
import { getCurrentUser } from '../../clients/customerSearchClient.js';
import { userAddressesWrapper } from './userAddresses.js';
import { PartialBaseAddress } from '../../types/types.js';
import { toggleUpdateAddressButton } from './updateAddressButton.js';
import { addressInputs } from '../../constants/addressConstants.js';
import { deleteAddress } from './deleteAddress.js';

export const createUserAddressInputs = async () => {
  const currentUser = await getCurrentUser();

  // for testing only - while default addresses isn't configured yet
  // test code start
  currentUser.shippingAddressIds = [];
  currentUser.billingAddressIds = [];
  currentUser.shippingAddressIds[0] = 'fydnMWGX';
  currentUser.billingAddressIds[0] = 'SQq3yGzi';
  // test code end

  const markDefaultAddress = (addressType: string, parentEl: HTMLElement) => {
    createEl({
      tag: 'h4',
      text: `Default ${addressType} address`,
      classes: ['user-addresses__marker'],
      parent: parentEl,
    });
  };

  const showAddress = (address: PartialBaseAddress, addressIndex: number) => {
    if (currentUser.addresses) {
      const addressWrapper = createEl({
        tag: 'div',
        classes: ['address-wrapper'],
        parent: userAddressesWrapper,
        attributes: {
          id: `addressWrapper-${addressIndex + 1}`,
        },
      });

      if (
        currentUser.shippingAddressIds &&
        currentUser.addresses &&
        currentUser.addresses[addressIndex].id ===
          currentUser.shippingAddressIds[0]
      ) {
        markDefaultAddress('shipping', addressWrapper);
      } else if (
        currentUser.billingAddressIds &&
        currentUser.addresses &&
        currentUser.addresses[addressIndex].id ===
          currentUser.billingAddressIds[0]
      ) {
        markDefaultAddress('billing', addressWrapper);
      }

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

        createEl({
          tag: 'input',
          classes: ['user-profile__input', 'uk-input'],
          parent: addressWrapper,
          attributes: {
            id: `${Object.values(addressInputs)[i]}-${addressIndex + 1}`,
            value: address[key] ?? '',
            disabled: '',
          },
        });
      }

      createEl({
        tag: 'button',
        text: 'Edit address',
        classes: ['button', 'uk-button', 'uk-button-primary'],
        parent: addressWrapper,
        onClick: (event) => {
          toggleUpdateAddressButton(event);
        },
      });

      createEl({
        tag: 'button',
        text: 'Delete address',
        classes: ['button', 'uk-button', 'uk-button-primary'],
        parent: addressWrapper,
        attributes: {
          id: currentUser.addresses[addressIndex].id ?? '',
        },
        onClick: async (event) => {
          await deleteAddress(event);
        },
      });
    }
  };

  if (currentUser.addresses) {
    for (let i = 0; i < currentUser.addresses.length; i++) {
      showAddress(currentUser.addresses[i], i);
    }
  }
};
