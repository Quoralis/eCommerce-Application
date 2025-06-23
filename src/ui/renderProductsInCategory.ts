import { getCategoriesId } from '../clients/categoriesClient.js';
import { getProductsInCategory } from '../clients/getCurrentProductClient.js';
import { DisplayProduct, ProductsResponse } from '../types/types.js';
import { renderProductCard } from './productCard.js';
import { renderPagination } from './renderPagination.js';
import {
  searchProduct,
  searchProductsPrice,
} from '../clients/searchProduct.js';
import { getSortProducts } from '../clients/getSortProducts.js';

export async function renderProductsInCategory(
  keyCategory: string,
  limit: number = 8,
  offset: number = 0,
  field: string = '',
  order: string = '',
  searchTerm: string = ''
): Promise<void> {
  const productWrapper = document.querySelector('.product-wrapper');
  const productContainer = document.querySelector('.product-container');
  if (
    productWrapper instanceof HTMLElement &&
    productContainer instanceof HTMLElement
  ) {
    productWrapper.innerHTML = '';
    const categoryId = await getCategoriesId(keyCategory);
    const bearToken = localStorage.getItem('bearerToken');
    if (bearToken && categoryId) {
      const minInput = document.getElementById('min-price');
      const maxInput = document.getElementById('max-price');
      if (
        minInput instanceof HTMLInputElement &&
        maxInput instanceof HTMLInputElement
      ) {
        const hasPriceFilter =
          minInput.value.trim() !== '' || maxInput.value.trim() !== '';

        let products: ProductsResponse;

        if (searchTerm) {
          const result = await searchProduct(searchTerm, categoryId);
          products = result ?? { results: [], count: 0, limit: 0, total: 0 };
        } else if (hasPriceFilter) {
          products = await searchProductsPrice(categoryId, limit, offset);
        } else if (field && order) {
          const result = await getSortProducts(
            field,
            order,
            categoryId,
            limit,
            offset
          );
          products = result ?? { results: [], count: 0, limit: 0, total: 0 };
        } else {
          products = await getProductsInCategory(
            bearToken,
            categoryId,
            limit,
            offset
          );
        }

        const currentPage = Math.floor(offset / limit) + 1;
        renderPagination(
          productContainer,
          products.total || products.count,
          currentPage,
          (page) => {
            const newOffset = (page - 1) * limit;
            renderProductsInCategory(
              keyCategory,
              limit,
              newOffset,
              field,
              order,
              searchTerm
            );
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
            productId: product.id,
          };
          renderProductCard(productWrapper, dataCard, keyCategory);
        });
      }
    }
  }
}
