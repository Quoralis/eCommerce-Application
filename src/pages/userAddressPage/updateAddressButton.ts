import { updateAddresses } from './updateAddresses.js';
import { getCurrentUser } from '../../clients/customerSearchClient.js';
import { updateClientAddress } from '../../clients/updateClientAddress.js';
import { AddressUpdate } from '../../types/types.js';
import { validateInput } from '../../services/validators/registrationValidation.js';

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
  changedData.version = user.version;

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
        e.target.textContent = 'Edit address';
        inputs.forEach((input) => input.setAttribute('disabled', ''));
        const user = await getCurrentUser();
        if (!user) return;
        await updateClientAddress(user.id, changedData);

        const setDefaultAddress = async () => {
          const checkboxes = addressWrapper.querySelectorAll('.checkbox');

          for (const checkbox of checkboxes) {
            if (checkbox instanceof HTMLInputElement) {
              const addressId = checkbox.value;

              if (checkbox.checked) {
                await updateClientAddress(user.id, {
                  version: undefined,
                  actions: [
                    {
                      action: checkbox.id.includes('shipping')
                        ? 'addShippingAddressId'
                        : 'addBillingAddressId',
                      addressId: addressId,
                    },
                    {
                      action: checkbox.id.includes('shipping')
                        ? 'setDefaultShippingAddress'
                        : 'setDefaultBillingAddress',
                      addressId: addressId,
                    },
                  ],
                });
              } else {
                if (
                  checkbox.id.includes('shipping') &&
                  user.shippingAddressIds?.includes(addressId)
                ) {
                  await updateClientAddress(user.id, {
                    version: undefined,
                    actions: [
                      {
                        action: 'removeShippingAddressId',
                        addressId: addressId,
                      },
                    ],
                  });
                }

                if (
                  checkbox.id.includes('billing') &&
                  user.billingAddressIds?.includes(addressId)
                ) {
                  await updateClientAddress(user.id, {
                    version: user.version,
                    actions: [
                      {
                        action: 'removeBillingAddressId',
                        addressId: addressId,
                      },
                    ],
                  });
                }
              }
            }
          }
        };

        setDefaultAddress();
      }
    }
  }
};
