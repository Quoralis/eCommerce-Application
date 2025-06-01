import { createEl } from '../utils/createElement.js';
import { filterSearch } from './filterSearch.js';
export function renderFilters(parent: HTMLElement): void {
  const filtres = createEl({
    tag: 'div',
    classes: ['catalog-filters'],
    parent: parent,
  });
  filterSearch(filtres);
}
