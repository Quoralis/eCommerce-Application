import { createEl } from '../utils/createElement.js';

export function renderFilters(parent: HTMLElement): void {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const filtres = createEl({
    tag: 'div',
    classes: ['catalog-filters'],
    parent: parent,
  });
}
