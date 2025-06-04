import { createEl } from '../utils/createElement.js';
import { renderCategories } from './categories.js';
import { renderFilters } from './filters.js';
// import { showNav } from './filterSearch.js';
export async function renderSideBar(parent: HTMLElement): Promise<void> {
  const parentAside = createEl({
    tag: 'div',
    classes: ['uk-height-large', 'parent-aside'],
    parent: parent,
  });

  const aside = createEl({
    tag: 'aside',
    classes: ['catalog-sidebar', 'uk-position-z-index'],
    attributes: {
      'uk-sticky': '',
    },
    parent: parentAside,
  });
  await renderCategories(aside);
  renderFilters(aside);
}
