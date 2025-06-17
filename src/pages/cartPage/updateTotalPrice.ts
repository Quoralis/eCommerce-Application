import { getMyCart } from '../../clients/getMyCart.js';
import { formatPrice } from '../../utils/formatPrice.js';
import { updateCart } from '../../clients/updateMyCart.js';
import { showExistingPromoCode } from './showExistingPromoCode.js';

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

  const cart = await getMyCart();
  const fullPriceSum = cart?.lineItems.reduce((sum, item) => {
    if (item.quantity) {
      return sum + item.price.value.centAmount * item.quantity;
    }

    return sum;
  }, 0);
  const isDiscount = totalPrice !== fullPriceSum;
  const fullPrice = document.querySelector('.total-price_full');

  if (isDiscount && fullPrice && fullPriceSum) {
    fullPrice.textContent = formatPrice(fullPriceSum);
    totalPriceEl.classList.add('total-price_promo');
    fullPrice?.classList.add('total-price_visible');

    showExistingPromoCode();
  } else if (!isDiscount && fullPrice) {
    totalPriceEl.textContent = '';
    fullPrice.textContent = formatPrice(fullPriceSum);
    totalPriceEl.classList.remove('total-price_promo');
    fullPrice?.classList.remove('total-price_visible');
  }
};
