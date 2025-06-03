import { getCurrentUser } from '../../clients/customerSearchClient.js';
import { updateClientAddress } from '../../clients/updateClientAddress.js';
import { AddressModify } from '../../types/types.js';
import { updateAddressPage } from './userAddresses.js';

export const deleteAddress = async (e: Event) => {
  e.preventDefault();

  if (e.target instanceof HTMLElement) {
    let currentUser = await getCurrentUser();
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

    currentUser = await getCurrentUser();
    if (!currentUser) return;
    await updateClientAddress(currentUser.id, addressToDelete);
    updateAddressPage();
  }
};
