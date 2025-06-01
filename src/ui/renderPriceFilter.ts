import { createEl } from '../utils/createElement.js';

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
    attributes: {
      type: 'number',
      id: 'min-price',
      name: 'minPrice',
      placeholder: '0',
      minPrice: '0',
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
    attributes: {
      type: 'number',
      id: 'max-price',
      name: 'maxPrice',
      placeholder: '0',
      minPrice: '0',
    },
    parent: priceFilter,
  });
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
    parent: priceFilter,
  });
}
