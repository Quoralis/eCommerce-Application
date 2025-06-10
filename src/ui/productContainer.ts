import { createEl } from '../utils/createElement.js';
import { renderProductList } from './renderProductList.js';

export async function renderProductLContainer(
  parent: HTMLElement
): Promise<void> {
  const section = createEl({
    tag: 'section',
    classes: ['product-container'],
    parent: parent,
  });
  const productsWrapper = createEl({
    tag: 'div',
    classes: ['product-wrapper'],
    parent: section,
  });
  await renderProductList(productsWrapper, 8);
}
