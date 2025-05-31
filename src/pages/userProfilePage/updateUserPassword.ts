import { getCustomerByEmail } from '../../clients/customerSearchClient.js';
import { updateCustomerPasswordType } from '../../types/types.js';
import { toggleInputsState } from './toggleInputsState.js';
import { updateCustomerPassword } from '../../clients/updateCustomerPassword.js';

export const updateUserPassword = async (
  email: string,
  parent: HTMLFormElement
): Promise<void> => {
  const user = await getCustomerByEmail(email);
  const currentPasswordInput = <HTMLInputElement>(
    parent.firstElementChild?.lastElementChild
  );
  const newPasswordInput = <HTMLInputElement>(
    parent.lastElementChild?.previousElementSibling?.lastElementChild
  );
  const updatePassword: updateCustomerPasswordType = {
    id: user[0].id,
    version: <number>user[0].version,
    currentPassword: currentPasswordInput.value,
    newPassword: newPasswordInput.value,
  };
  await updateCustomerPassword(updatePassword);
  toggleInputsState(parent, true);
};
