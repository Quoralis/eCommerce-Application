import { verifyInput } from './verifyInput.js';
import { paths } from '../../constants/paths.js';
import { getCurrentUser } from '../../clients/customerSearchClient.js';
import { updateClientAddress } from '../../clients/updateClientAddress.js';
import { changedData } from '../../pages/userAddressPage/updateAddressButton.js';
import { registerClient } from '../../clients/registerClient.js';
import { setDefaultAddress } from '../../pages/userAddressPage/setDefaultAddress.js';
import { addNewAddress } from '../../pages/userAddressPage/addNewAddress.js';

export const checkInputs = async (
  e: Event,
  inputs: Element[],
  path: string
) => {
  const wrapper = inputs[0].parentElement;
  inputs.forEach((inputEl) => verifyInput(inputEl));

  const isValidForm = inputs.every((input) => verifyInput(input));
  console.log('isValidForm', isValidForm);

  // if (isValidForm) {
  // }
  if (path === paths.registration && isValidForm) {
    registerClient(inputs);
  } else if (path === paths.addresses && isValidForm) {
    const hasModal =
      document.querySelector('body .modal.uk-modal.uk-open') !== null;

    if (hasModal) {
      if (wrapper instanceof HTMLElement) addNewAddress(e, wrapper);
    } else {
      if (e.target instanceof HTMLElement) {
        e.target.textContent = 'Edit address';
      }
      inputs.forEach((input) => input.setAttribute('disabled', ''));

      const checkboxes = wrapper?.querySelectorAll('input[type="checkbox"]');
      checkboxes?.forEach((checkbox) => {
        checkbox.setAttribute('disabled', '');
      });
      let user = await getCurrentUser();

      if (!user) return;
      if (!wrapper) return;

      await setDefaultAddress(wrapper);
      user = await getCurrentUser();
      if (!user) return;
      await updateClientAddress(user.id, changedData);
    }
  }
};
