import { createEl } from '../../utils/createElement.js';

export const showTotalPrice = (parent: HTMLElement): void => {
  const showHeandingWrapper = createEl({
    tag: 'div',
    classes: ['uk-heading-divider' /*  'uk-flex', 'uk-flex-around' */],
    parent: parent,
  });

  createEl({
    tag: 'span',
    text: 'Totals',
    parent: showHeandingWrapper,
  });
  showCoupon(parent);
};

const showCoupon = (parent: HTMLElement): void => {
  const formCoupon = createEl({
    tag: 'form',
    parent: parent,
  });

  /*  const couponInput = */ createEl({
    tag: 'input',
    classes: ['user-profile__input', 'uk-input', 'coupon-input'],
    attributes: {
      placeholder: 'Your coupon',
    },
    parent: formCoupon,
  });
};
