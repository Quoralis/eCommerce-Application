import { createEl } from '../utils/createElement.js';
import { renderCategories } from './categories.js';
import { renderFilters } from './filters.js';

export async function renderSideBar(parent: HTMLElement): Promise<void> {
  const aside = createEl({
    tag: 'aside',
    classes: ['catalog-sidebar'],
    parent: parent,
  });
  await renderCategories(aside);
  renderFilters(aside);
}
