import { createEl } from '../utils/createElement.js';

export function renderBanner(parent: HTMLElement) {
  const main = document.querySelector('main');
  if (main) {
    const catalogContainer = createEl({
      tag: 'div',
      classes: ['catalog-container'],
      parent: parent,
    });
    const banner = createEl({
      tag: 'div',
      classes: ['banner-container'],
      parent: catalogContainer,
    });
    const img = createEl({
      tag: 'img',
      classes: ['banner-img'],
      attributes: {
        src: '../assets/images/banners/bannerCatalog.jpg',
        alt: 'MacBook',
      },
      parent: banner,
    }) as HTMLImageElement;
    img.addEventListener('click', (): void => {
      console.log('banner clicked');
    });
  }
}
