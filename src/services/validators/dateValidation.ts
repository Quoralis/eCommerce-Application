import { toggleValidationNotification } from '../notification/validationNotification.js';

export const validateDate = () => {
  const birthDate = document.querySelector('#birth-date');
  const today = new Date();
  let birthDateValue;

  if (birthDate instanceof HTMLInputElement) {
    birthDateValue = new Date(birthDate.value);
  }

  if (birthDateValue instanceof Date && today instanceof Date) {
    const birthDateYear = birthDateValue.getFullYear();
    const birthDateMonth = birthDateValue.getMonth();
    const birthDateDay = birthDateValue.getDate();

    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDay = today.getDate();

    if (
      birthDateYear > todayYear ||
      (birthDateYear === todayYear && birthDateMonth > todayMonth) ||
      (birthDateYear === todayYear &&
        birthDateMonth === todayMonth &&
        birthDateDay > todayDay)
    ) {
      if (birthDate instanceof HTMLInputElement) {
        toggleValidationNotification(
          birthDate,
          'Birth date must be today or earlier'
        );
        return false;
      }
    }

    return true;
  }
};
