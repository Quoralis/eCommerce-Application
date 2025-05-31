import { getCustomerByEmail } from '../../clients/customerSearchClient.js';

export const rejectUpdateInf = async (
  email: string,
  save: boolean,
  parent: HTMLFormElement
): Promise<void> => {
  const user = await getCustomerByEmail(email);
  const allInputs = <NodeListOf<HTMLInputElement>>(
    parent.querySelectorAll('.user-profile__input')
  );
  const allSpans = parent.querySelectorAll('.error-message');
  const informatonUser = [
    user[0].firstName,
    user[0].lastName,
    user[0].email,
    user[0].dateOfBirth,
  ];
  for (let i = 0; i < allInputs.length; i++) {
    if (save) {
      allInputs[i].value = <string>informatonUser[i];
    } else {
      allInputs[i].value = '';
    }
    if (allSpans) {
      allSpans[i].textContent = '';
    }
  }
};
