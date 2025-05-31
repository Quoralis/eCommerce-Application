import { getCategoriesId } from '../clients/categoriesClient.js';
import { getProductsInCategory } from '../clients/getCurrentProductClient.js';
import { DisplayProduct } from '../types/types.js';
import { renderProductCard } from './productCard.js';

export async function renderProductsInCategory(
  keyCategory: string
): Promise<void> {
  const productContainer = document.querySelector(
    '.product-container'
  ) as HTMLElement;
  productContainer.innerHTML = '';
  const categoryId = await getCategoriesId(keyCategory);
  const bearToken = localStorage.getItem('bearerToken');
  if (bearToken) {
    const products = await getProductsInCategory(bearToken, categoryId);
    products.results.forEach((product) => {
      const dataCard: DisplayProduct = {
        productName: product.name.en,
        imageUrl: product.masterVariant.images![0].url,
        productKey: product.key,
        description: product.description.en,
        price: product.masterVariant.prices[0].value.centAmount,
        discountedPrice:
          product.masterVariant.prices[0].discounted?.value.centAmount,
      };
      renderProductCard(productContainer, dataCard, keyCategory);
    });
  }
}
