import { createEl } from '../utils/createElement.js';
import { renderCategories } from './categories.js';
import { renderFilters } from './filters.js';

export function renderSideBar(parent: HTMLElement): void {
  const aside = createEl({
    tag: 'aside',
    classes: ['catalog-sidebar'],
    parent: parent,
  });
  renderCategories(aside);
  renderFilters(aside);
}
