import { createEl } from '../../utils/createElement.js';

const toggleAddressCheckbox = (clickedCheckbox: HTMLInputElement) => {
  const allCheckboxes = document.querySelectorAll(
    `input[name="${clickedCheckbox.name}"]`
  );

  allCheckboxes.forEach((checkbox) => {
    if (checkbox !== clickedCheckbox && checkbox instanceof HTMLInputElement) {
      checkbox.checked = false;
    }
  });
};

export const getDefaultAddressCheckboxes = (
  checkboxIndex: number,
  addressIndex: number,
  addressWrapper: HTMLElement
) => {
  const labelText =
    checkboxIndex === 0
      ? 'Default shipping address'
      : 'Default billing address';
  const labelName =
    checkboxIndex === 0 ? 'default-shipping' : 'default-billing';

  const addressId = addressWrapper.getAttribute('data-id');
  const checkbox = createEl({
    tag: 'input',
    classes: ['user-profile__input', 'checkbox'],
    parent: addressWrapper,
    attributes: {
      type: 'checkbox',
      name: labelName,
      id: `${labelName}-${addressIndex + 1}`,
      disabled: '',
      value: addressId ?? '',
    },
  });

  checkbox.addEventListener('change', () => toggleAddressCheckbox(checkbox));

  createEl({
    tag: 'label',
    classes: ['label'],
    parent: addressWrapper,
    text: labelText,
    attributes: {
      for: `${labelName}-${addressIndex + 1}`,
    },
  });
};
