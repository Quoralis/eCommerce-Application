import { responseMyCart } from '../../types/types.js';
export const updateBadgeNumber = (data: responseMyCart) => {
  const badges = <NodeListOf<Element>>document.querySelectorAll('.cart-badge');
  badges.forEach((badge) => {
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
  });
};
