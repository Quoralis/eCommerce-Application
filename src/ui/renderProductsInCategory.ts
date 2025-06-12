import { getCategoriesId } from '../clients/categoriesClient.js';
import { getProductsInCategory } from '../clients/getCurrentProductClient.js';
import { DisplayProduct } from '../types/types.js';
import { renderProductCard } from './productCard.js';
import { keepOnlyDigits } from '../utils/keepOnlyDigits.js';
import { renderPagination } from './renderPagination.js';
import { paginations } from './paginations.js';

export async function renderProductsInCategory(
  keyCategory: string
): Promise<void> {
  const productWrapper = document.querySelector(
    '.product-wrapper'
  ) as HTMLElement;
  productWrapper.innerHTML = '';
  const productContainer = document.querySelector(
    '.product-container'
  ) as HTMLElement;
  const categoryId = await getCategoriesId(keyCategory);
  console.log(categoryId);

  const bearToken = localStorage.getItem('bearerToken');
  if (bearToken && categoryId) {
    const products = await getProductsInCategory(bearToken, categoryId);
    renderPagination(productContainer, products.count, 1, paginations);

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

    const filteredProducts = products.results.filter((product) => {
      let price = product.masterVariant.prices?.[0]?.value?.centAmount ?? 0;
      const priceDiscount =
        product.masterVariant.prices[0].discounted?.value.centAmount;
      price = priceDiscount ? priceDiscount : price;
      return price >= minPrice && price <= maxPrice;
    });

    filteredProducts.forEach((product) => {
      const dataCard: DisplayProduct = {
        productName: product.name.en,
        imageUrl: product.masterVariant.images![0].url,
        productKey: product.key,
        description: product.description.en,
        price: product.masterVariant.prices[0].value.centAmount,
        discountedPrice:
          product.masterVariant.prices[0].discounted?.value.centAmount,
      };
      renderProductCard(productWrapper, dataCard, keyCategory);
    });
  } else {
  }
}
