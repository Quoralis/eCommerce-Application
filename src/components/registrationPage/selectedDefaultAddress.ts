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

export const resetDefaultAddress = () => {};
