import { apiUrl, projectKey } from '../../config.js';
import { wrapperTryCatch } from '../../utils/wrapperTryCatch.js';
import { responseMyCart } from '../../types/types.js';
import { requestToken } from '../../clients/authClient.js';
import { getMyCart } from '../../clients/getMyCart.js';
import { showNotification } from '../../services/notification/showNotification.js';
import { showAppliedPromoCode } from './showAppliedPromoCode.js';

const applyPromoCode = async (cart: responseMyCart, promoCode: string) => {
  const url = `${apiUrl}/${projectKey}/me/carts/${localStorage.getItem('cartId')}`;
  const body = {
    version: cart.version,
    actions: [
      {
        action: 'addDiscountCode',
        code: promoCode,
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
    return response;
  } catch (err) {
    console.log('applyPromoCode', err);
  }
};

export const enterPromoCode = async (e: Event) => {
  e.preventDefault();
  const promoCodeInput = document.querySelector('.coupon-input');

  if (promoCodeInput instanceof HTMLInputElement) {
    const promoCode = promoCodeInput?.value.trim();
    const appliedPromoCodes = document.querySelectorAll('.promo-code_applied');
    const activePromoCode = [...appliedPromoCodes].find(
      (item) => item.textContent === promoCode
    );

    try {
      const cart = await getMyCart();

      if (cart) {
        if (activePromoCode) {
          showNotification(
            'This promo code is already applied. Try another one',
            'danger'
          );
        } else {
          const cartWithPromoCode = await applyPromoCode(cart, promoCode);
          const promoCodeId =
            cartWithPromoCode?.discountCodes?.at(-1)?.discountCode.id;

          if (cartWithPromoCode && promoCodeId) {
            showNotification('Promo code applied', 'success');
            showAppliedPromoCode(promoCode, promoCodeId);
            promoCodeInput.value = '';
          }
        }
      }
    } catch (err) {
      console.log('enterPromoCode', err);
    }
  }
};
