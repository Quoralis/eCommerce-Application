import { createEl } from '../utils/createElement.js';

export async function renderProductLContainer(
  parent: HTMLElement
): Promise<void> {
  const section = createEl({
    tag: 'section',
    classes: ['product-container'],
    parent: parent,
  });
  createEl({
    tag: 'div',
    classes: ['product-wrapper'],
    parent: section,
  });
}
