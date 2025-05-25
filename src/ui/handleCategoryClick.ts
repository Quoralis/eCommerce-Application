import { renderProductsInCategory } from './renderProductsInCategory.js';
import { renderProductList } from './renderProductList.js';

export async function handleCategoryClick(e: MouseEvent) {
  const container = document.querySelector('.product-container');
  if (!(container instanceof HTMLElement)) return;

  const listItems = document.querySelectorAll('.categories-list li');
  listItems.forEach((li) => li.classList.remove('active__category'));

  const target = e.target as HTMLElement;
  const li = target.closest('.categories-list li');

  if (!li) return;
  container.innerHTML = '';
  li.classList.add('active__category');
  const key = li.getAttribute('data-category-key');

  if (key) {
    await renderProductsInCategory(key);
  } else {
    await renderProductList(container);
  }
}
