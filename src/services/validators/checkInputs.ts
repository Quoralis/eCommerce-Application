import { verifyInput } from './verifyInput.js';
import { paths } from '../../constants/paths.js';
import { getCurrentUser } from '../../clients/customerSearchClient.js';
import { updateClientAddress } from '../../clients/updateClientAddress.js';
import { changedData } from '../../pages/userAddressPage/updateAddressButton.js';
import { registerClient } from '../../clients/registerClient.js';
import { setDefaultAddress } from '../../pages/userAddressPage/setDefaultAddress.js';

export const checkInputs = async (
  e: Event,
  inputs: Element[],
  path: string
) => {
  inputs.forEach((inputEl) => verifyInput(inputEl));

  const isValidForm = inputs.every((input) => verifyInput(input));
  console.log('isValidForm', isValidForm);

  if (path === paths.registration && isValidForm) {
    registerClient(inputs);
  } else if (path === paths.addresses && isValidForm) {
    if (e.target instanceof HTMLElement) {
      e.target.textContent = 'Edit address';
    }
    inputs.forEach((input) => input.setAttribute('disabled', ''));

    const wrapper = inputs[0].closest('.address-wrapper');
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
};
