import { createEl } from '../utils/createElement.js';

export const showPromoCode = (parentEl: HTMLElement) => {
  const promoWrapper = createEl({
    tag: 'div',
    classes: ['uk-card', 'uk-card-default', 'uk-card-body', 'uk-width-3-4@m'],
    parent: parentEl,
  });

  for (let i = 0; i < 2; i++) {
    const promoInner = createEl({
      tag: 'div',
      parent: promoWrapper,
      classes: ['uk-position-relative'],
    });

    if (i === 0) {
      createEl({
        tag: 'div',
        text: 'Special offer'.toUpperCase(),
        parent: promoInner,
        classes: ['uk-card-badge', 'uk-label', 'uk-position-top-right'],
      });

      createEl({
        tag: 'img',
        attributes: {
          src: '../assets/images/banners/promoCode.jpg',
          alt: 'promo code discount banner',
        },
        parent: promoInner,
        classes: ['promo__image'],
      });
    } else {
      createEl({
        tag: 'h3',
        text: 'hot2025summer'.toUpperCase(),
        parent: promoInner,
        classes: ['uk-card-title'],
      });

      createEl({
        tag: 'p',
        classes: ['promo__text'],
        parent: promoInner,
        text: 'Use this promo code to get 20% discount on all Apple devices',
      });
    }
  }
};
