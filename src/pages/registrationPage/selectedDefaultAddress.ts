export const getDefaultAddress = () => {
  const selectedAddress = document.querySelector(
    'input[name="default-address"]:checked'
  );

  if (selectedAddress) {
    const selectedAddressIndex =
      selectedAddress.id === 'shipping-address' ? 0 : 1;
    return selectedAddressIndex;
  }

  return undefined;
};

export const copyAddressValues = (e: Event) => {
  const inputs = ['country', 'city', 'street', 'postal-code'];
  const checkedRadio = e.target;

  if (checkedRadio instanceof HTMLInputElement) {
    const sourceAddressIndex = checkedRadio.id === 'shipping-address' ? 1 : 2;
    const targetAddressIndex = sourceAddressIndex === 1 ? 2 : 1;

    inputs.forEach((input) => {
      const sourceAddressId = `${input}-${sourceAddressIndex}`;
      const targetAddressId = `${input}-${targetAddressIndex}`;
      const sourceAddress = document.querySelector(`#${sourceAddressId}`);
      const targetAddress = document.querySelector(`#${targetAddressId}`);

      if (
        (sourceAddress instanceof HTMLInputElement ||
          sourceAddress instanceof HTMLSelectElement) &&
        (targetAddress instanceof HTMLInputElement ||
          targetAddress instanceof HTMLSelectElement)
      ) {
        targetAddress.value = sourceAddress.value;
      }
    });
  }
};
