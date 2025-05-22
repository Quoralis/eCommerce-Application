import { renderBanner } from '../../ui/banner.js';
import { renderCatalogSection } from '../../ui/catalogSection.js';

export async function showCatalogPage() {
  const main = document.querySelector('main');
  if (main) {
    renderBanner(main);
    renderCatalogSection(main);
  }

  console.log('Showing Catalog page');
}
