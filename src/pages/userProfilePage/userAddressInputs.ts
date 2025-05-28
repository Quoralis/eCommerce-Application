import { createEl } from '../../utils/createElement.js';
import { getCustomerByEmail } from '../../clients/customerSearchClient.js';
import { userAddressesWrapper } from './userAddresses.js';
import { PartialBaseAddress } from '../../types/types.js';

export const createUserAddressInputs = async () => {
  const users = await getCustomerByEmail('user@us.er'); // email is used for example, it will be replaced later
  const currentUser = users[0];

  const addressInputs: PartialBaseAddress = {
    Country: 'country',
    City: 'city',
    Street: 'streetName',
    'Postal code': 'postalCode',
  };

  const showAddress = (address: PartialBaseAddress, addressIndex: number) => {
    for (let i = 0; i < 4; i++) {
      createEl({
        tag: 'label',
        classes: ['user-profile__label'],
        parent: userAddressesWrapper,
        text: Object.keys(addressInputs)[i],
        attributes: {
          for: `${Object.values(addressInputs)[i]}-${addressIndex + 1}`,
        },
      });

      const key = Object.values(addressInputs)[i] ?? '';

      createEl({
        tag: 'input',
        classes: ['user-profile__input', 'uk-input'],
        parent: userAddressesWrapper,
        attributes: {
          id: `${Object.values(addressInputs)[i]}-${addressIndex + 1}`,
          value: address[key] ?? '',
          disabled: '',
        },
      });
    }
  };

  if (currentUser.addresses) {
    for (let i = 0; i < currentUser.addresses.length; i++) {
      createEl({
        tag: 'h3',
        text: `Address ${i + 1}`,
        parent: userAddressesWrapper,
      });

      // for testing only, while the default address setting isn't working yet:
      // test code start
      currentUser.shippingAddressIds = [];
      currentUser.billingAddressIds = [];
      currentUser.shippingAddressIds[0] = 'fydnMWGX';
      currentUser.billingAddressIds[0] = 'SQq3yGzi';
      // test code end

      const markDefaultAddress = (addressType: string) => {
        createEl({
          tag: 'h4',
          text: `Default ${addressType} address`,
          parent: userAddressesWrapper,
        });
      };

      if (
        currentUser.shippingAddressIds &&
        currentUser.addresses[i].id === currentUser.shippingAddressIds[0]
      ) {
        markDefaultAddress('shipping');
      } else if (
        currentUser.billingAddressIds &&
        currentUser.addresses[i].id === currentUser.billingAddressIds[0]
      ) {
        markDefaultAddress('billing');
      }

      showAddress(currentUser.addresses[i], i);
    }
  }
};
