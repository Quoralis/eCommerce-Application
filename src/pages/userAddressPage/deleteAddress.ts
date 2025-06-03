import { getCurrentUser } from '../../clients/customerSearchClient.js';
import { updateClientAddress } from '../../clients/updateClientAddress.js';
import { AddressModify } from '../../types/types.js';
import { updateAddressPage } from './userAddresses.js';

export const deleteAddress = async (e: Event) => {
  e.preventDefault();

  if (e.target instanceof HTMLElement) {
    const currentUser = await getCurrentUser();
    const idToDelete = e.target.id;
    if (!currentUser) return;

    const addressToDelete: AddressModify = {
      version: currentUser.version,
      actions: [
        {
          action: 'removeAddress',
          addressId: idToDelete,
        },
      ],
    };

    await updateClientAddress(currentUser.id, addressToDelete);
    updateAddressPage();
  }
};
