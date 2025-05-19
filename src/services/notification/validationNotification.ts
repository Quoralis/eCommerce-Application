import { createEl } from '../../utils/createElement.js';
import { validateDate } from '../validators/dateValidation.js';

export const toggleValidationNotification = (
  inputEl: HTMLInputElement | HTMLSelectElement,
  errText: string | undefined
) => {
  const inputErrText = createEl({
    tag: 'small',
    classes: ['registration__error'],
    text: errText,
  });

  let error: HTMLElement | undefined;

  if (errText && inputEl.nextElementSibling?.childNodes.length === 0) {
    inputEl.nextElementSibling?.append(inputErrText);
    error = inputErrText;
  } else {
    if (inputEl.nextElementSibling?.childNodes[0] instanceof HTMLElement) {
      error = inputEl.nextElementSibling?.childNodes[0];
    }
  }

  setTimeout(() => {
    error?.classList.add('registration__error_active');
  }, 0);

  if (inputEl.id !== 'birth-date') {
    inputEl?.addEventListener(
      'input',
      () => {
        inputErrText.classList.remove('registration__error_active');
        setTimeout(() => {
          error?.remove();
        }, 300);
      },
      { once: true }
    );
  } else {
    inputEl.addEventListener(
      'change',
      () => {
        const isValid = validateDate();
        if (isValid) {
          inputErrText.classList.remove('registration__error_active');
          setTimeout(() => {
            error?.remove();
          }, 300);
        }
      },
      { once: true }
    );
  }
};
