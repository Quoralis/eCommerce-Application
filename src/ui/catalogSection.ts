import { createEl } from '../utils/createElement.js';
import { renderSideBar } from './catalogSidebar.js';
import { renderProductLContainer } from './productContainer.js';

export function renderCatalogSection(parent: HTMLElement): void {
  const section = createEl({
    tag: 'section',
    classes: ['catalog-section'],
    parent: parent,
  });
  renderSideBar(section);
  renderProductLContainer(section);
}
