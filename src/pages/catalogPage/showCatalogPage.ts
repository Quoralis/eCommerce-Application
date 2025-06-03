import { renderCatalogSection } from '../../ui/catalogSection.js';
import { createEl } from '../../utils/createElement.js';
export async function showCatalogPage() {
  const main = document.querySelector('main');
  if (main) {
    main.innerHTML = '';
    createEl({
      tag: 'nav',
      classes: ['nav-breadcrumb'],
      parent: main,
    });
    await renderCatalogSection(main);
  }
}
