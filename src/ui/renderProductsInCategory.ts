import { getCategoriesId } from '../clients/categoriesClient.js';
import { getProductsInCategory } from '../clients/getCurrentProductClient.js';
import { DisplayProduct, ProductsResponse } from '../types/types.js';
import { renderProductCard } from './productCard.js';
import { renderPagination } from './renderPagination.js';
import { searchProductsPrice } from '../clients/searchProduct.js';

export async function renderProductsInCategory(
  keyCategory: string,
  limit: number = 8,
  offset: number = 0
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
    const minInput = document.getElementById('min-price') as HTMLInputElement;
    const maxInput = document.getElementById('max-price') as HTMLInputElement;
    const hasPriceFilter =
      minInput.value.trim() !== '' || maxInput.value.trim() !== '';

    const products: ProductsResponse = hasPriceFilter
      ? await searchProductsPrice(categoryId, limit, offset)
      : await getProductsInCategory(bearToken, categoryId, limit, offset);

    console.log(products);

    const currentPage = Math.floor(offset / limit) + 1;
    renderPagination(
      productContainer,
      products.total || products.count,
      currentPage,
      (page) => {
        const newOffset = (page - 1) * limit;
        renderProductsInCategory(keyCategory, limit, newOffset);
      }
    );

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
      renderProductCard(productWrapper, dataCard, keyCategory);
    });
  } else {
  }
}
