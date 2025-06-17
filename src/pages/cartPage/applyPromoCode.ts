import { apiUrl, projectKey } from '../../config.js';
import { wrapperTryCatch } from '../../utils/wrapperTryCatch.js';
import { responseMyCart } from '../../types/types.js';
import { requestToken } from '../../clients/authClient.js';
import { getMyCart } from '../../clients/getMyCart.js';
import { showNotification } from '../../services/notification/showNotification.js';
import { showAppliedPromoCode } from './showAppliedPromoCode.js';
import { changeProductPrice } from './changeProductPrice.js';
import { removePromoCode } from './removePromoCode.js';

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
    // console.log(response);
    return response;
  } catch (err) {
    if (err instanceof Error) {
      if (err.message.includes(`The discount code '' was not found.`)) {
        showNotification(
          'The promo code field is empty. Please enter a promo code',
          'danger'
        );
      } else if (
        err.message.includes(`The discount code '${promoCode}' was not found.`)
      ) {
        showNotification(
          'This promo code is invalid. Try another one',
          'danger'
        );
      }

      console.log('applyPromoCode', err);
    }
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
      if (activePromoCode) {
        showNotification(
          'This promo code is already applied. Try another one',
          'danger'
        );
      } else {
        const cart = await getMyCart();
        const discounts = cart?.discountCodes;

        if (discounts) {
          for (const discount of discounts) {
            const cart = await getMyCart();

            if (cart) {
              await removePromoCode(discount.discountCode.id, cart.version);
            }
          }

          const promoCodeWrapper = document.querySelector(
            '.promo-code-wrapper'
          );
          if (promoCodeWrapper) {
            promoCodeWrapper.innerHTML = '';
          }
        }

        const currentCart = await getMyCart();

        if (currentCart) {
          const cartWithPromoCode = await applyPromoCode(
            currentCart,
            promoCode
          );
          // console.log(cartWithPromoCode);
          const isDiscount = cartWithPromoCode?.discountCodes?.find(
            (item) => item.state === 'MatchesCart'
          );

          if (cartWithPromoCode && isDiscount) {
            showNotification('Promo code applied', 'success');
            showAppliedPromoCode(promoCode);
            changeProductPrice(cartWithPromoCode);
            promoCodeInput.value = '';
            localStorage.setItem('promoCode', promoCode);
          }
        }
      }
    } catch (err) {
      console.log('enterPromoCode', err);
    }
  }
};
