import { createEl } from '../../utils/createElement.js';
import { updateTotalPrice } from './updateTotalPrice.js';
export const showTotalHeanding = async (parent: HTMLElement): Promise<void> => {
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
  await showTotalPrice(parent);
};

const showCoupon = (parent: HTMLElement): void => {
  const formCoupon = createEl({
    tag: 'form',
    classes: ['uk-flex'],
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

  const applyCoupon = createEl({
    tag: 'a',
    text: 'apply',
    classes: [
      'uk-button',
      'uk-border-rounded',
      'uk-button-primary',
      'login-btn',
      'coupon-input',
      'el-nav',
    ],
    parent: formCoupon,
  });
  applyCoupon.addEventListener('click', (event: Event): void => {
    event.preventDefault();
  });
};

const showTotalPrice = async (parent: HTMLElement): Promise<void> => {
  const totalWrapper = createEl({
    tag: 'div',
    classes: ['uk-grid-small', 'coupon-input'],
    attributes: {
      'uk-grid': '',
    },
    parent: parent,
  });
  createEl({
    tag: 'div',
    text: 'Total',
    classes: ['uk-width-expand'],
    attributes: {
      'uk-leader': '',
    },
    parent: totalWrapper,
  });

  createEl({
    tag: 'div',
    classes: ['total-price'],
    // text: `${formatPrice(totalPrice)}`,
    parent: totalWrapper,
  });
  await updateTotalPrice();
  /*   createEl({
    tag: 'div',
    text: '20$',
    parent: totalWrapper,
    }); */
};
