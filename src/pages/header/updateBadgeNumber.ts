import { responseMyCart } from '../../types/types.js';
// import { getMyProduct } from '../../clients/getMyCart.js';
export const updateBadgeNumber = (data: responseMyCart) => {
  const badge = <HTMLElement>document.querySelector('.cart-badge');
  if (data) {
    const lineItems = data.lineItems.length;
    if (lineItems) {
      badge.classList.remove('non-active');
      badge.textContent = `${data.lineItems.length}`;
    } else {
      badge.classList.add('non-active');
    }
  } else {
    badge.classList.add('non-active');
  }
};
