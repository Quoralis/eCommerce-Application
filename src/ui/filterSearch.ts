import { createEl } from '../utils/createElement.js';
import { searchProduct } from '../clients/searchProduct.js';
import { clearDom } from '../utils/clearDom.js';
import { getActiveCategoryId } from '../services/categoryService.js';
import { renderProductsInCategory } from './renderProductsInCategory.js';

export const filterSearch = (parent: HTMLElement): void => {
  const wrapperFilterSearch = createEl({
    tag: 'div',
    classes: ['uk-flex', 'uk-flex-center', 'uk-flex', 'uk-flex-column'],
    parent: parent,
  });

  createEl({
    tag: 'h4',
    classes: ['catalog-categories-title'],
    text: 'Search Product',
    parent: wrapperFilterSearch,
  });

  const searchProductsForm = createEl({
    tag: 'form',
    classes: ['uk-search', 'uk-search-default', 'catalog-form'],
    parent: wrapperFilterSearch,
  });
  searchProductsForm.addEventListener('submit', (e: Event) => {
    e.preventDefault(); //  interrupt redirect to main
  });

  const inputSearch = createEl({
    tag: 'input',
    classes: ['uk-search-input', 'uk-border-rounded'],
    attributes: {
      type: 'text',
      placeholder: 'Search...',
    },
    parent: searchProductsForm,
  });

  inputSearch.addEventListener('input', async (event: Event): Promise<void> => {
    clearDom('product-wrapper');
    const cardWrapper = <HTMLElement>document.querySelector('.product-wrapper');
    await showCardsByRequest(event, cardWrapper);
  });

  createEl({
    tag: 'span',
    classes: ['uk-search-icon-flip'],
    attributes: {
      'uk-search-icon': '',
    },
    parent: searchProductsForm,
  });
};

const showCardsByRequest = async (
  event: Event,
  parent: HTMLElement
): Promise<void> => {
  const activeCategory = await getActiveCategoryId();
  if (!(event.target instanceof HTMLInputElement) || !activeCategory) return;
  const { categoryId, keyActiveCategory } = activeCategory;
  const textSearch = event.target.value.trim();
  if (textSearch == '') {
    await renderProductsInCategory(keyActiveCategory);
    return;
  }
  const arrProducts = await searchProduct(
    event.target.value.trim(),
    categoryId
  );

  if (event.target instanceof HTMLInputElement && categoryId) {
    if (event.target.value.trim() !== textSearch) return;
    if (arrProducts && arrProducts.results.length > 0) {
      await renderProductsInCategory(
        keyActiveCategory,
        8,
        0,
        '',
        '',
        textSearch
      );
    } else if (
      !arrProducts ||
      (arrProducts.results.length === 0 && event.target.value !== '')
    ) {
      parent.textContent = 'Product is not found';
    }
  }
};
