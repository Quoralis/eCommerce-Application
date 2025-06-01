import { createEl } from '../utils/createElement.js';
import { renderPriceFilter } from './priceFilter.js';

export function renderFilters(parent: HTMLElement): void {
  const filters = createEl({
    tag: 'div',
    classes: ['catalog-filters'],
    parent: parent,
  });
  renderPriceFilter(filters);
}
