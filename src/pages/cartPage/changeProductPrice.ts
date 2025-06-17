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

  if (promoProducts.length > 0) {
    promoProducts.forEach((product) => {
      const currentProduct = document.getElementById(product.id);
      const currentPrice = currentProduct?.querySelector(
        '.product__current-price'
      );
      const fullPrice = currentProduct?.querySelector('.product__full-price');
      const discountedPrice = product.discountedPrice?.value.centAmount;
      const productTotalPrice = currentProduct?.querySelector(
        '.product__total-price'
      );

      if (
        currentPrice &&
        fullPrice &&
        discountedPrice &&
        productTotalPrice &&
        product.quantity
      ) {
        currentPrice.textContent = formatPrice(discountedPrice);
        fullPrice.textContent = formatPrice(product.price.value.centAmount);
        productTotalPrice.textContent = formatPrice(
          discountedPrice * product.quantity
        );
        currentPrice.classList.add('product__current-price_promo');
        fullPrice.classList.add('product__full-price_visible');
      }
    });
  } else {
    productLines.forEach((product) => {
      const currentProduct = document.getElementById(product.id);
      const currentPrice = currentProduct?.querySelector(
        '.product__current-price'
      );
      const fullPrice = currentProduct?.querySelector('.product__full-price');
      const productTotalPrice = currentProduct?.querySelector(
        '.product__total-price'
      );

      if (currentPrice && fullPrice && productTotalPrice && product.quantity) {
        currentPrice.textContent = formatPrice(product.price.value.centAmount);
        fullPrice.textContent = formatPrice(product.price.value.centAmount);
        productTotalPrice.textContent = formatPrice(
          product.price.value.centAmount * product.quantity
        );
        currentPrice.classList.remove('product__current-price_promo');
        fullPrice.classList.remove('product__full-price_visible');
      }
    });
  }
};
