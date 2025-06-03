import { ModifiedUserFormValues, PartialBaseAddress } from '../types/types.js';
import { getDefaultAddress } from '../pages/registrationPage/selectedDefaultAddress.js';
import { getCustomerByEmail } from './customerSearchClient.js';
import { showNotification } from '../services/notification/showNotification.js';
import { registerAndLogin } from '../services/authService.js';
import { updateAuthUI } from '../utils/auth.js';

export const registerClient = async (inputs: Element[]) => {
  const getFormData = () => {
    const formValues = inputs.map((input) => {
      if (
        input instanceof HTMLInputElement ||
        input instanceof HTMLSelectElement
      ) {
        return input.value;
      }
    });

    const clientData: ModifiedUserFormValues = {
      email: '',
      password: '',
      addresses: [],
    };

    const mainInputs: (keyof ModifiedUserFormValues)[] = [
      'firstName',
      'lastName',
      'email',
      'dateOfBirth',
      'password',
    ];
    mainInputs.forEach((key, index) => {
      const value = formValues[index] ?? '';
      clientData[key] = value;
    });

    for (let i = 0; i < 2; i++) {
      const address: PartialBaseAddress = {};
      const addressInputs = ['country', 'city', 'streetName', 'postalCode'];
      const addressesIndex = 5;
      const startIndex = addressesIndex + i * addressInputs.length;

      addressInputs.forEach((value, index) => {
        address[value] = formValues[startIndex + index];
      });

      if (Array.isArray(clientData.addresses)) {
        clientData.addresses?.push(address);
      }
    }

    const defaultAddressIndex = getDefaultAddress();
    if (defaultAddressIndex !== undefined) {
      clientData.defaultShippingAddress = defaultAddressIndex;
      clientData.defaultBillingAddress = defaultAddressIndex;
      clientData.billingAddresses = [defaultAddressIndex];
      clientData.shippingAddresses = [defaultAddressIndex];
    }

    localStorage.setItem('email', clientData.email);

    console.log(clientData);
    return {
      userData: clientData,
      defShipIdx: defaultAddressIndex,
      defBillIdx: defaultAddressIndex,
    };
  };

  const registrationData = getFormData();
  console.log('ref', registrationData);
  const registrationToken = localStorage.getItem('bearerToken');
  if (registrationData && registrationToken) {
    const customers = await getCustomerByEmail(registrationData.userData.email);
    if (customers.length !== 0) {
      showNotification(
        'Customer with this email already exists. Try to log in or use another email',
        'danger'
      );
      return;
    }
    const userData = await registerAndLogin({
      userData: registrationData.userData,
      bearerToken: registrationToken,
      defBillIdx: registrationData.defBillIdx,
      defShipIdx: registrationData.defShipIdx,
    });
    if (userData.accessToken && userData.customerID) {
      showNotification(
        'Your account has been successfully registered',
        'success'
      );
      localStorage.setItem('accessToken', userData.accessToken);
      await updateAuthUI();
    } else {
      showNotification(
        'Customer with this email already exists. Try to log in or use another email',
        'danger'
      );
    }
  }
};
