import { renderCatalogSection } from '../../ui/catalogSection.js';

export async function showCatalogPage() {
  const main = document.querySelector('main');
  if (main) {
    await renderCatalogSection(main);
  }
}
