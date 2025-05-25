import { createEl } from '../utils/createElement.js';
import { fetchAllCategories } from '../clients/categoriesClient.js';

export async function renderCategories(parent: HTMLElement): Promise<void> {
  const navCategories = createEl({
    tag: 'nav',
    classes: ['catalog-categories'],
    parent: parent,
  });

  createEl({
    tag: 'h4',
    classes: ['catalog-categories-title'],
    text: 'CATEGORIES',
    parent: navCategories,
  });
  const ul = createEl({
    tag: 'ul',
    classes: ['categories-list'],
    parent: navCategories,
  });
  const li = createEl({
    tag: 'li',
    classes: ['category-title'],
    parent: ul,
  });
  createEl({
    tag: 'img',
    classes: ['category-icon'],
    attributes: { src: `../assets/images/icons/icon-Allproducts.png` },
    parent: li,
  });
  createEl({
    tag: 'span',
    classes: ['category-name'],
    text: 'All Products',
    parent: li,
  });

  const categoryList = await fetchAllCategories();
  categoryList.results.map((el) => {
    const li = createEl({
      tag: 'li',
      classes: ['category-title'],
      attributes: { 'data-category-key': `${el.key}` },
      parent: ul,
    });
    createEl({
      tag: 'img',
      classes: ['category-icon'],
      attributes: { src: `../assets/images/icons/icon-${el.key}.png` },
      parent: li,
    });
    createEl({
      tag: 'span',
      classes: ['category-name'],
      text: el.name.en,
      parent: li,
    });
  });
}
