import { updateAddresses } from './updateAddresses.js';
import { getCurrentUser } from '../../clients/customerSearchClient.js';
import { AddressUpdate } from '../../types/types.js';
import { validateInput } from '../../services/validators/registrationValidation.js';
import { setDefaultAddress } from './setDefaultAddress.js';

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
  if (!user) return;

  if (e.target instanceof HTMLElement) {
    const addressWrapper = e.target.parentElement;
    const inputs = addressWrapper?.children ? [...addressWrapper.children] : [];
    const isDisabledInput = inputs
      .filter((child) => child.classList.contains('user-profile__input'))
      .every((input) => {
        if (
          input instanceof HTMLInputElement ||
          input instanceof HTMLSelectElement
        ) {
          return input.disabled;
        }
      });

    if (addressWrapper) {
      const inputs = [...addressWrapper.children].filter((input) =>
        input.classList.contains('user-profile__input')
      );
      updateAddresses(e);

      if (isDisabledInput) {
        e.target.textContent = 'Save updates';
        inputs.forEach((input) => input.removeAttribute('disabled'));

        addressWrapper.addEventListener('change', (event) => {
          validateInput(event);
        });
      } else {
        validateInput(e);

        const user = await getCurrentUser();
        if (!user) return;

        await setDefaultAddress(addressWrapper);
      }
    }
  }
};
