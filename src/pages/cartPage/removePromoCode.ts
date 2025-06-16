import { getMyCart } from '../../clients/getMyCart.js';
import { apiUrl, projectKey } from '../../config.js';
import { wrapperTryCatch } from '../../utils/wrapperTryCatch.js';
import { responseMyCart } from '../../types/types.js';
import { requestToken } from '../../clients/authClient.js';
import { showNotification } from '../../services/notification/showNotification.js';

export const removePromoCode = async (promoCodeId: string) => {
  const cart = await getMyCart();
  const url = `${apiUrl}/${projectKey}/me/carts/${localStorage.getItem('cartId')}`;
  const body = {
    version: cart?.version,
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

    const currentPromoCode = document.getElementById(promoCodeId);
    showNotification(
      `Promo code ${currentPromoCode?.textContent} deleted`,
      'success'
    );
    currentPromoCode?.remove();

    return response;
  } catch (err) {
    console.log('removePromoCode', err);
  }
};
