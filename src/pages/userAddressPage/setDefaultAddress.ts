import { getCurrentUser } from '../../clients/customerSearchClient.js';
import { updateClientAddress } from '../../clients/updateClientAddress.js';

export const setDefaultAddress = async (addressWrapper: HTMLElement) => {
  const user = await getCurrentUser();
  if (!user) return;
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
