import { createEl } from '../utils/createElement.js';
import { prepareProductsForDisplay } from '../services/prepareProductsForDisplay.js';
import { renderProductCard } from './productCard.js';
import { DisplayProduct } from '../types/types.js';

export async function renderProductLContainer(
  parent: HTMLElement
): Promise<void> {
  const section = createEl({
    tag: 'section',
    classes: ['product-container'],
    parent: parent,
  });
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
    renderProductCard(section, dataCard);
  });
}
