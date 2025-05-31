import { createEl } from '../../utils/createElement.js';
import { getCustomerByEmail } from '../../clients/customerSearchClient.js';
import { userAddressesWrapper } from './userAddresses.js';
import { PartialBaseAddress } from '../../types/types.js';

export const createUserAddressInputs = async () => {
  const user = await getCustomerByEmail('Lnsdfncv.@gmail.com');
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

  if (user[0].addresses) {
    for (let i = 0; i < user[0].addresses.length; i++) {
      createEl({
        tag: 'h3',
        text: `Address ${i + 1}`,
        parent: userAddressesWrapper,
      });

      showAddress(user[0].addresses[i], i);
    }
  }
};
