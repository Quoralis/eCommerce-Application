import { responseMyCart } from '../../types/types.js';
import { productCart } from '../../types/types.js';

export const updateBadgeNumber = (data: responseMyCart | productCart) => {
  const badges = <NodeListOf<Element>>document.querySelectorAll('.cart-badge');
  badges.forEach((badge) => {
    if (data) {
      const lineItems = data.lineItems?.length;
      if (lineItems) {
        badge.classList.remove('non-active');
        const productItemQuantity = data.lineItems?.reduce(
          (sum, item) => (item.quantity ? sum + item.quantity : sum + 0),
          0
        );
        badge.textContent = `${productItemQuantity}`;
      } else {
        badge.classList.add('non-active');
      }
    } else {
      badge.classList.add('non-active');
    }
  });
};
