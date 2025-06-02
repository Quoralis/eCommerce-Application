import { createEl } from '../utils/createElement.js';
import { searchProduct } from '../clients/searchProduct.js';
import { clearDom } from '../utils/clearDom.js';
import { CurrentProduct } from '../types/types.js';
import { renderProductList } from './renderProductList.js';
import { showCards } from './sortProducts.js';

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
    clearDom('product-container');
    const cardWrapper = <HTMLElement>parent.parentElement?.nextElementSibling;
    showCardsByRequest(event, cardWrapper);
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
  if (event.target instanceof HTMLInputElement) {
    const arrProducts = <CurrentProduct[]>(
      await searchProduct(event.target.value)
    );
    if (event.target.value === '') {
      renderProductList(parent);
    }
    if (arrProducts.length > 0) {
      showCards(arrProducts, parent);
    } else if (arrProducts.length === 0 && event.target.value !== '') {
      parent.textContent = 'Product is not found';
    }
  }
};
