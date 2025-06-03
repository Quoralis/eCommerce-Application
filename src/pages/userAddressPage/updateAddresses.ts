import { CustomerAddress } from '../../types/types.js';
import { changedData } from './updateAddressButton.js';
import { getCurrentUser } from '../../clients/customerSearchClient.js';

export const updateAddresses = async (e: Event) => {
  const user = await getCurrentUser();
  if (!user) return;

  if (e.target instanceof HTMLElement) {
    const addressWrapper = e.target.parentElement;

    if (addressWrapper) {
      const addressIndex = +addressWrapper.id.split('-')[1] - 1;

      if (user.addresses) {
        changedData.actions[0].addressId = user.addresses[addressIndex].id;
      }

      const addressFields = ['country', 'city', 'streetName', 'postalCode'];

      const isAddressKey = (id: string): id is keyof CustomerAddress => {
        return addressFields.includes(id);
      };

      const getInputValues = () => {
        const addressInputs = [...addressWrapper.children].filter((child) =>
          child.classList.contains('user-profile__input')
        );

        addressInputs.forEach((input) => {
          const inputId = input.id.split('-')[0];

          if (
            isAddressKey(inputId) &&
            (input instanceof HTMLInputElement ||
              input instanceof HTMLSelectElement)
          ) {
            changedData.actions[0]['address'][inputId] = input.value;
          }
        });
      };
      getInputValues(); // to get correct changedData if we don't change any input

      addressWrapper?.addEventListener('change', async () => {
        getInputValues(); // to get correct changedData if we change any input
      });
    }
  }
};
