import { updateAddresses } from './updateAddresses.js';
import { getCurrentUser } from '../../clients/customerSearchClient.js';
import { updateClientAddress } from '../../clients/updateClientAddress.js';
import { AddressUpdate } from '../../types/types.js';

export const changedData: AddressUpdate = {
  version: undefined,
  actions: [
    {
      action: 'changeAddress',
      addressId: undefined,
      address: {
        country: undefined,
      },
    },
  ],
};

export const toggleUpdateAddressButton = async (e: Event) => {
  const user = await getCurrentUser();
  changedData.version = user.version;

  if (e.target instanceof HTMLElement) {
    const prevInput = e.target.previousElementSibling;
    const addressWrapper = e.target.parentElement;

    if (addressWrapper) {
      const inputs = [...addressWrapper.children].filter((input) =>
        input.classList.contains('user-profile__input')
      );
      updateAddresses(e);

      if (prevInput instanceof HTMLInputElement && prevInput?.disabled) {
        e.target.textContent = 'Save updates';
        inputs.forEach((input) => input.removeAttribute('disabled'));
      } else {
        e.target.textContent = 'Edit address';
        inputs.forEach((input) => input.setAttribute('disabled', ''));
        await updateClientAddress(user.id, changedData);
      }
    }
  }
};
