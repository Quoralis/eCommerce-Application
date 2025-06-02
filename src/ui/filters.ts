import { createEl } from '../utils/createElement.js';
import { renderPriceFilter } from './renderPriceFilter.js';

import { filterSearch } from './filterSearch.js';
export function renderFilters(parent: HTMLElement): void {
  const filters = createEl({
    tag: 'div',
    classes: ['catalog-filters'],
    parent: parent,
  });
  filterSearch(filters);
  renderPriceFilter(filters);
}
