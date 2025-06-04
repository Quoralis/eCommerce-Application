import { getCurrentUser } from '../../clients/customerSearchClient.js';
import { updateClientAddress } from '../../clients/updateClientAddress.js';

export const setDefaultAddress = async (id: string) => {
  try {
    const user = await getCurrentUser();
    if (!user) return;
    const checkboxes = document.querySelectorAll('.checkbox');

    for (const checkbox of checkboxes) {
      if (checkbox instanceof HTMLInputElement) {
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
                addressId: id,
              },
              {
                action: checkbox.id.includes('shipping')
                  ? 'setDefaultShippingAddress'
                  : 'setDefaultBillingAddress',
                addressId: id,
              },
            ],
          });
        } else {
          if (
            checkbox.id.includes('shipping') &&
            user.shippingAddressIds?.includes(id)
          ) {
            const user = await getCurrentUser();
            if (!user) return;
            await updateClientAddress(user.id, {
              version: user.version,
              actions: [
                {
                  action: 'removeShippingAddressId',
                  addressId: id,
                },
              ],
            });
          }

          if (
            checkbox.id.includes('billing') &&
            user.billingAddressIds?.includes(id)
          ) {
            const user = await getCurrentUser();
            if (!user) return;
            await updateClientAddress(user.id, {
              version: user.version,
              actions: [
                {
                  action: 'removeBillingAddressId',
                  addressId: id,
                },
              ],
            });
          }
        }
      }
    }
  } catch (error) {
    console.log('setDefaultAddress error', error);
  }
};

export const setNewAddressDefault = async (id: string) => {
  try {
    const user = await getCurrentUser();
    if (!user) return;
    const checkboxes = document.querySelectorAll(
      '.new-address .uk-checkbox.user-profile__input.checkbox'
    );

    for (const checkbox of checkboxes) {
      if (checkbox instanceof HTMLInputElement) {
        if (checkbox.checked) {
          const user = await getCurrentUser();
          if (!user) return;
          await updateClientAddress(user.id, {
            version: user.version,
            actions: [
              {
                action: checkbox.id.includes('Shipping')
                  ? 'addShippingAddressId'
                  : 'addBillingAddressId',
                addressId: id,
              },
              {
                action: checkbox.id.includes('Shipping')
                  ? 'setDefaultShippingAddress'
                  : 'setDefaultBillingAddress',
                addressId: id,
              },
            ],
          });
        }
      }
    }
  } catch (error) {
    console.log('setNewAddressDefault error:', error);
  }
};
