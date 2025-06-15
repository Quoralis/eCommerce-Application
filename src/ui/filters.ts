import { createEl } from '../utils/createElement.js';
import { filterPrice } from './filterPrice.js';

import { filterSearch } from './filterSearch.js';
import { sortProducts } from './sortProducts.js';
export function renderFilters(parent: HTMLElement): void {
  const filters = createEl({
    tag: 'div',
    classes: ['catalog-filters'],
    parent: parent,
  });
  filterSearch(filters);
  sortProducts(filters);
  filterPrice(filters);
}
