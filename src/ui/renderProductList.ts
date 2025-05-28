import { prepareProductsForDisplay } from '../services/prepareProductsForDisplay.js';
import { DisplayProduct } from '../types/types.js';
import { renderProductCard } from './productCard.js';

export async function renderProductList(container: HTMLElement) {
  const allProducts = await prepareProductsForDisplay();
  if (allProducts === null || allProducts === undefined) {
    console.error('No products found');
    return;
  }
  allProducts.forEach((product) => {
    const dataCard: DisplayProduct = {
      productName: product.nameCard.en,
      imageUrl: product.urlImageCard,
      productKey: product.productKey,
      description: product.descriptionCard.en,
      price: product.priceProduct,
      discountedPrice: product.priceDiscount,
    };
    renderProductCard(container, dataCard);
  });
}
