import { DisplayProduct } from '../../types/types.js';
import { formatPrice } from '../../utils/formatPrice.js';
export const priceProduct = (data: DisplayProduct) => {
  if (!data.discountedPrice) {
    return formatPrice(data.price);
  } else {
    return formatPrice(data.discountedPrice);
  }
};
