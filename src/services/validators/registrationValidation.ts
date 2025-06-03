import { regForm } from '../../pages/registrationPage/registration.js';
import { paths } from '../../constants/paths.js';
import { verifyInput } from './verifyInput.js';
import { checkInputs } from './checkInputs.js';

export const validateInput = (e: Event) => {
  if (e.type === 'click') {
    const url = window.location.pathname;

    if (url === paths.registration) {
      const regFormInputs = [...regForm.children].filter((child) =>
        child.matches('.registration__input')
      );
      checkInputs(e, regFormInputs, url);
    } else if (url === paths.addresses) {
      if (e.target instanceof HTMLElement) {
        const addressForm = e.target.parentElement;
        if (!addressForm) return;

        const addressFormInputs = [...addressForm.children].filter(
          (element) => {
            return (
              element instanceof HTMLSelectElement ||
              (element instanceof HTMLInputElement && element.type === 'text')
            );
          }
        );
        checkInputs(e, addressFormInputs, url);
      }
    }
  } else if (e.type === 'change') {
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLSelectElement
    ) {
      const input = e.target;
      verifyInput(input);
    }
  }
};

export const submitForm = (e: Event) => {
  e.preventDefault();
  validateInput(e);
};
