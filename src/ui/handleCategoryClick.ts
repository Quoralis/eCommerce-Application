import { renderProductsInCategory } from './renderProductsInCategory.js';
import { renderProductList } from './renderProductList.js';

export async function handleCategoryClick(e: MouseEvent) {
  const productContainer = document.querySelector('.product-container');
  if (productContainer && productContainer instanceof HTMLElement) {
    productContainer.innerHTML = '';
    if (e.target instanceof HTMLElement) {
      const li = e.target.closest('li');
      if (li) {
        const key = li.getAttribute('data-category-key');
        if (key === null) {
          await renderProductList(productContainer);
        } else {
          await renderProductsInCategory(key);
        }
      }
    }
  }
}
