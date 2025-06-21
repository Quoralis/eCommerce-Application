import { createEl } from '../../utils/createElement.js';
import { deleteAllPromoCodes } from './removePromoCode.js';

export const showExistingPromoCode = () => {
  const appliedPromoCode = localStorage.getItem('promoCode');
  const promoCodeWrapper = document.querySelector('.promo-code-wrapper');

  if (
    appliedPromoCode &&
    promoCodeWrapper?.children.length === 0 &&
    promoCodeWrapper instanceof HTMLElement
  ) {
    createEl({
      tag: 'span',
      text: appliedPromoCode,
      parent: promoCodeWrapper,
      classes: ['uk-badge', 'promo-code_applied'],
      attributes: {
        'uk-icon': 'close',
      },
      onClick: deleteAllPromoCodes,
    });
  }
};
