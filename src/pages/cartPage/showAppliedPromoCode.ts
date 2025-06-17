import { createEl } from '../../utils/createElement.js';
import { deleteAllPromoCodes } from './removePromoCode.js';

export const getPromoCodeWrapper = () => {
  const wrapper = document.querySelector('.promo-code-wrapper');

  if (wrapper) {
    return wrapper;
  } else {
    const coupon = document.querySelector('.coupon');
    const promoCodeWrapper = createEl({
      tag: 'div',
      classes: ['promo-code-wrapper'],
    });
    coupon?.after(promoCodeWrapper);
  }
};

export const showAppliedPromoCode = (appliedPromoCode: string) => {
  const promoCodeWrapper = getPromoCodeWrapper();

  if (promoCodeWrapper instanceof HTMLElement) {
    createEl({
      tag: 'span',
      text: appliedPromoCode,
      parent: promoCodeWrapper,
      classes: ['uk-badge', 'promo-code_applied'],
      attributes: {
        'uk-icon': 'close',
      },
      onClick: async () => {
        deleteAllPromoCodes();
      },
    });
  }
};
