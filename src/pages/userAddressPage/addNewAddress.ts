import UIkit from 'uikit';
import { AddressUpdate, CustomerAddress } from '../../types/types.js';
import { getCurrentUser } from '../../clients/customerSearchClient.js';
import { updateClientAddress } from '../../clients/updateClientAddress.js';
import { updateAddressPage } from './userAddresses.js';
import { showNotification } from '../../services/notification/showNotification.js';

export const addNewAddress = async (e: Event, form: HTMLElement) => {
  e.preventDefault();

  try {
    const newAddressData: AddressUpdate = {
      version: undefined,
      actions: [
        {
          action: 'addAddress',
          address: {
            country: undefined,
            city: undefined,
            streetName: undefined,
            postalCode: undefined,
          },
        },
      ],
    };

    const isAddressKey = (
      key: string,
      address: CustomerAddress
    ): key is keyof CustomerAddress => {
      return key in address;
    };

    [...form.children]
      .filter((input) => input.classList.contains('user-profile__input'))
      .forEach((input) => {
        if (
          (input instanceof HTMLInputElement ||
            input instanceof HTMLSelectElement) &&
          isAddressKey(input.id, newAddressData.actions[0].address)
        ) {
          newAddressData.actions[0].address[input.id] = input.value;
        }
      });

    const user = await getCurrentUser();
    if (!user) return;
    newAddressData.version = user.version;

    const result = await updateClientAddress(user.id, newAddressData);
    const addressModal = document.querySelector('#address-modal');

    if (addressModal) {
      UIkit.modal(addressModal).hide();
    }
    updateAddressPage();

    console.log('Update address:', result);
    return result;
  } catch (error) {
    console.error('Failed to add address:', error);
    showNotification('Failed to add address. Please try again.', 'error');
  }
};
