import { responseMyCart } from '../../types/types.js';
import { formatPrice } from '../../utils/formatPrice.js';

export const changeProductPrice = (currentCart: responseMyCart) => {
  const productLines = currentCart.lineItems;
  const promoProducts = productLines.filter((product) => {
    if (product.discountedPrice?.value.centAmount) {
      return product;
    }

    return false;
  });

  promoProducts.forEach((product) => {
    const currentProduct = document.getElementById(product.id);
    const currentPrice = currentProduct?.querySelector(
      '.product__current-price'
    );
    const fullPrice = currentProduct?.querySelector('.product__full-price');
    const discountedPrice = product.discountedPrice?.value.centAmount;

    if (currentPrice && fullPrice && discountedPrice) {
      currentPrice.textContent = formatPrice(discountedPrice);
      fullPrice.textContent = formatPrice(product.price.value.centAmount);
      currentPrice.classList.add('product__current-price_promo');
      fullPrice.classList.add('product__full-price_visible');
    }
  });
};
