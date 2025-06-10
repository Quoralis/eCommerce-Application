import { prepareProductsForDisplay } from '../services/prepareProductsForDisplay.js';
import { DisplayProduct } from '../types/types.js';
import { renderProductCard } from './productCard.js';
import { keepOnlyDigits } from '../utils/keepOnlyDigits.js';

export async function renderProductList(container: HTMLElement) {
  const allProducts = await prepareProductsForDisplay();
  if (allProducts === null || allProducts === undefined) {
    console.error('No products found');
    return;
  }
  const minPriceInput = document.getElementById(
    'min-price'
  ) as HTMLInputElement;
  const maxPriceInput = document.getElementById(
    'max-price'
  ) as HTMLInputElement;
  const minPriceStr = keepOnlyDigits(minPriceInput.value);
  const maxPriceStr = keepOnlyDigits(maxPriceInput.value);
  const minPrice = Number(minPriceStr || '0') * 100;
  const maxPrice = Number(maxPriceStr || '20000000') * 100;

  const filteredProducts = allProducts.filter((product) => {
    let price = product.priceProduct ?? 0;
    const priceDiscount = product.priceDiscount;
    price = priceDiscount ? priceDiscount : price;
    return price >= minPrice && price <= maxPrice;
  });

  filteredProducts.forEach((product) => {
    const dataCard: DisplayProduct = {
      productName: product.nameCard.en,
      imageUrl: product.urlImageCard,
      productKey: product.productKey,
      description: product.descriptionCard.en,
      price: product.priceProduct,
      discountedPrice: product.priceDiscount,
      productId: product.productId,
    };
    renderProductCard(container, dataCard);
  });
}
