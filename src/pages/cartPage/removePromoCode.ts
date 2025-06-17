import { getMyCart } from '../../clients/getMyCart.js';
import { apiUrl, projectKey } from '../../config.js';
import { wrapperTryCatch } from '../../utils/wrapperTryCatch.js';
import { responseMyCart } from '../../types/types.js';
import { requestToken } from '../../clients/authClient.js';
import { showNotification } from '../../services/notification/showNotification.js';

export const removePromoCode = async (
  promoCodeId: string,
  cartVersion: number
): Promise<responseMyCart | void> => {
  const url = `${apiUrl}/${projectKey}/me/carts/${localStorage.getItem('cartId')}`;
  const body = {
    version: cartVersion,
    actions: [
      {
        action: 'removeDiscountCode',
        discountCode: {
          typeId: 'discount-code',
          id: promoCodeId,
        },
      },
    ],
  };

  try {
    const response = await wrapperTryCatch<responseMyCart>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await requestToken()}`,
      },
      body: JSON.stringify(body),
    });

    const promoCodeWrapper = document.querySelector('.promo-code-wrapper');

    if (promoCodeWrapper) {
      promoCodeWrapper.innerHTML = '';
    }
    localStorage.removeItem('promoCode');

    return response;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : `${err}`;

    if (errorMessage.includes('409')) {
      console.log('Data version conflict');

      const cart = await getMyCart();

      if (cart) {
        return await removePromoCode(promoCodeId, cart.version);
      }
    }

    console.log('removePromoCode', err);
  }
};

export const deleteAllPromoCodes = async () => {
  const cart = await getMyCart();
  if (cart && cart.discountCodes) {
    for (const discount of cart.discountCodes) {
      const currentCart = await getMyCart();

      if (currentCart) {
        removePromoCode(discount.discountCode.id, currentCart.version);
      }
    }
    showNotification(`Promo code deleted`, 'success');
  }
};
