import { createEl } from '../utils/createElement.js';

export function renderBreadcrumb(path: string): void {
  const container = document.querySelector('.nav-breadcrumb');
  if (!container) return;
  const partsPath = path.split('/').filter(Boolean);
  container.innerHTML = '';
  const index = partsPath.indexOf('undefined');
  if (index !== -1) {
    partsPath[index] = 'allproducts';
  }
  const ul = createEl({
    tag: 'ul',
    parent: container as HTMLElement,
  });

  partsPath.forEach((part, index) => {
    const fullPath = '/' + partsPath.slice(0, index + 1).join('/');
    console.log(fullPath);
    createEl({
      tag: 'a',
      text: part,
      classes: ['breadcrumb-path'],
      attributes: { 'data-path': fullPath },
      parent: ul as HTMLElement,
    });

    if (index < partsPath.length - 1) {
      createEl({
        tag: 'span',
        text: ' / ',
        classes: ['breadcrumb-separator'],
        parent: ul as HTMLElement,
      });
    }
  });
}
