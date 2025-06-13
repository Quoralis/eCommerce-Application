import { getMyCart } from '../../clients/getMyCart.js';
import { formatPrice } from '../../utils/formatPrice.js';
import { updateCart } from '../../clients/updateMyCart.js';

export const updateTotalPrice = async () => {
  const version = <number>(await getMyCart())?.version;
  const removeProductInCart = {
    version: version,
    actions: [
      {
        action: 'recalculate',
        distributionChannel: {
          typeId: 'channel',
          id: '0995709c-be0e-4389-955f-9293634fd512',
        },
      },
    ],
  };
  const totalPrice = <number>(
    (await updateCart(removeProductInCart))?.totalPrice.centAmount
  );
  const totalPriceEl = <HTMLElement>document.querySelector('.total-price');
  if (totalPriceEl) {
    totalPriceEl.textContent = `${formatPrice(totalPrice)}`;
  }
};
