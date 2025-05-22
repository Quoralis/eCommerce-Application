import { createEl } from '../utils/createElement.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const categories = [
  'Accessories',
  'AirPods',
  'Apple Watch',
  'MacBooks',
  'iPhones',
];

export function renderCategories(parent: HTMLElement): void {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navCategories = createEl({
    tag: 'nav',
    classes: ['catalog-categories'],
    parent: parent,
  });
}
