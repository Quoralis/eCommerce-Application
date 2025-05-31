import { getCustomerByEmail } from '../../clients/customerSearchClient.js';
import { updateCustomer } from '../../types/types.js';
import { updateCustomerInf } from '../../clients/updateCustomerInf.js';
import { toggleInputsState } from './toggleInputsState.js';

const changeFields = ['firstName', 'lastName', 'email', 'dateOfBirth'];
type actionObj = { action: string; [key: string]: string };

const anothersActions = [
  'setFirstName',
  'setLastName',
  'changeEmail',
  'setDateOfBirth',
];

const newPersonalInfo: updateCustomer = {
  version: 0,
  actions: [],
};

export const updateUserInf = async (
  email: string,
  parent: HTMLFormElement
): Promise<void> => {
  const user = await getCustomerByEmail(email);
  const allInputs = <NodeListOf<HTMLInputElement>>(
    parent.querySelectorAll('.user-profile__input')
  );
  for (let i = 0; i < allInputs.length; i++) {
    const field = changeFields[i];
    const newInf: actionObj = {
      action: anothersActions[i],
    };
    if (field === 'email') {
      localStorage.setItem('email', allInputs[2].value);
    }
    newInf[field] = allInputs[i].value;
    newPersonalInfo.actions.push(newInf);
  }

  newPersonalInfo.version = user[0].version;
  updateCustomerInf(user[0].id, newPersonalInfo);
  toggleInputsState(parent, true);
};
