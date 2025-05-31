import { createEl } from '../utils/createElement.js';
import { renderSideBar } from './catalogSidebar.js';
import { renderProductLContainer } from './productContainer.js';

export async function renderCatalogSection(parent: HTMLElement): Promise<void> {
  const section = createEl({
    tag: 'section',
    classes: ['catalog-section'],
    parent: parent,
  });
  await renderSideBar(section);
  await renderProductLContainer(section);
}
