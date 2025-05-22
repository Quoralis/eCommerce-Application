import { createEl } from '../utils/createElement.js';

export function renderProductLContainer(parent: HTMLElement): void {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const section = createEl({
    tag: 'section',
    classes: ['product-container'],
    parent: parent,
  });
}
