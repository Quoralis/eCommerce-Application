import { createEl } from '../utils/createElement.js';
import { renderProductsInCategory } from './renderProductsInCategory.js';
import { renderProductList } from './renderProductList.js';

export function renderPriceFilter(element: HTMLElement) {
  const priceFilter = createEl({
    tag: 'div',
    classes: ['price-filter'],
    parent: element,
  });
  createEl({
    tag: 'span',
    text: 'PRICES',
    parent: priceFilter,
  });
  createEl({
    tag: 'label',
    attributes: {
      for: 'minPrice',
    },
    text: 'Min Price',
    parent: priceFilter,
  });
  createEl({
    tag: 'input',
    classes: ['uk-input', 'uk-border-rounded'],
    attributes: {
      type: 'number',
      id: 'min-price',
      name: 'minPrice',
      placeholder: '0',
      min: '0',
    },
    parent: priceFilter,
  });
  createEl({
    tag: 'label',
    attributes: {
      for: 'maxPrice',
    },
    text: 'Max Price',
    parent: priceFilter,
  });
  createEl({
    tag: 'input',
    classes: ['uk-input', 'uk-border-rounded'],
    attributes: {
      type: 'number',
      id: 'max-price',
      name: 'maxPrice',
      placeholder: '20000',
      max: '0',
    },
    parent: priceFilter,
  });

  const minInput = <HTMLInputElement>priceFilter.querySelector('#min-price');
  const maxInput = <HTMLInputElement>priceFilter.querySelector('#max-price');

  const handleEnter = async (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      const pathParts = window.location.pathname.split('/');
      const category = pathParts[2];
      if (category) {
        await renderProductsInCategory(category);
      } else {
        const container = document.querySelector('.product-container');
        if (container) {
          container.innerHTML = '';
          await renderProductList(container as HTMLElement);
        }
      }
    }
  };

  minInput?.addEventListener('keydown', handleEnter);
  maxInput?.addEventListener('keydown', handleEnter);

  createEl({
    tag: 'button',
    text: 'Apply',
    classes: [
      'uk-button',
      'uk-border-rounded',
      'uk-button-primary',
      'sign-out-btn',
      'el-nav',
      'button-price-filter',
    ],
    onClick: async () => {
      const pathParts = window.location.pathname.split('/');
      const category = pathParts[2];
      if (category) {
        await renderProductsInCategory(category);
      } else {
        const container = document.querySelector('.product-container');
        if (container) container.innerHTML = '';
        await renderProductList(container as HTMLElement);
      }
    },
    parent: priceFilter,
  });
}
