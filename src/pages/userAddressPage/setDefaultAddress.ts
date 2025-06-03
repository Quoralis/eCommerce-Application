import { getCurrentUser } from '../../clients/customerSearchClient.js';
import { updateClientAddress } from '../../clients/updateClientAddress.js';

export const setDefaultAddress = async (addressWrapper: Element) => {
  const user = await getCurrentUser();
  if (!user) return;
  const checkboxes = addressWrapper.querySelectorAll('.checkbox');

  for (const checkbox of checkboxes) {
    if (checkbox instanceof HTMLInputElement) {
      const addressId = checkbox.value;

      if (checkbox.checked) {
        const user = await getCurrentUser();
        if (!user) return;
        await updateClientAddress(user.id, {
          version: user.version,
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
          const user = await getCurrentUser();
          if (!user) return;
          await updateClientAddress(user.id, {
            version: user.version,
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
          const user = await getCurrentUser();
          if (!user) return;
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
