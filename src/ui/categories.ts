import { createEl } from '../utils/createElement.js';
import { fetchAllCategories } from '../clients/categoriesClient.js';
import iconKeyboard from '../assets/images/icons/icon-Accessories.png';
import iconAirpods from '../assets/images/icons/icon-Airpods.png';
import iconAllProducts from '../assets/images/icons/icon-Allproducts.png';
import iconAppleWatch from '../assets/images/icons/icon-AppleWatch.png';
import iconIphones from '../assets/images/icons/icon-iPhones.png';
import iconMacBooks from '../assets/images/icons/icon-MacBooks.png';

const arrIcons: string[] = [
  iconKeyboard,
  iconAirpods,
  iconAppleWatch,
  iconIphones,
  iconMacBooks,
  iconAllProducts,
];

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

  const categoryList = await fetchAllCategories();
  categoryList.results.map((el, index) => {
    const li = createEl({
      tag: 'li',
      classes: ['category-title'],
      attributes: {
        'data-category-key': `${el.key}`,
        'data-path': `/catalog/${el.key.toLowerCase()}`,
      },
      parent: ul,
    });
    createEl({
      tag: 'img',
      classes: ['category-icon'],
      attributes: { src: arrIcons[index] },
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
