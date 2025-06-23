import { createEl } from '../utils/createElement.js';
import { getActiveCategoryId } from '../services/categoryService.js';
import { renderProductsInCategory } from './renderProductsInCategory.js';

const arrSort = ['Price', 'Name'];

enum sort {
  asc = 'asc',
  desc = 'desc',
}

enum field {
  default = 'default',
  price = 'price',
  name = 'name.en',
}

export const sortProducts = (parent: HTMLElement): void => {
  const wrapperSortProducts = createEl({
    tag: 'nav',
    classes: [
      'uk-flex',
      'uk-flex-center',
      'uk-flex',
      'uk-flex-column',
      'wrapper-sort',
    ],
    attributes: { 'uk-dropnav': 'mode: click' },
    parent: parent,
  });
  createEl({
    tag: 'h4',
    classes: ['catalog-categories-title'],
    text: 'Sort products by:',
    parent: wrapperSortProducts,
  });
  // let sorts: HTMLElement
  for (let i = 0; i < 2; i++) {
    const sorts = createEl({
      tag: 'div',
      classes: ['sorts'],
      parent: wrapperSortProducts,
    });
    createEl({
      tag: 'a',
      text: arrSort[i],
      classes: ['catalog-link'],
      parent: sorts,
    });

    createEl({
      tag: 'a',
      classes: ['arrow'],
      attributes: { 'uk-icon': 'icon: arrow-up' },
      parent: sorts,
    });
  }
  const sorts = wrapperSortProducts.querySelectorAll('.sorts');
  sorts.forEach((el) => {
    el.addEventListener('click', (): void => {
      if (el.firstChild?.textContent === 'Price') {
        if (el.classList.contains(sort.desc)) {
          sortByPriceOrName(el, parent, field.price, sort.desc);
        } else {
          sortByPriceOrName(el, parent, field.price, sort.asc);
        }
      }
      if (el.firstChild?.textContent === 'Name') {
        if (el.classList.contains(sort.desc)) {
          sortByPriceOrName(el, parent, field.name, sort.desc);
        } else {
          sortByPriceOrName(el, parent, field.name, sort.asc);
        }
      }
    });
  });
};

const sortByPriceOrName = async (
  el: Element,
  parent: HTMLElement,
  field: string,
  order: string
): Promise<void> => {
  clearActive();
  el.classList.add('active');
  el.classList.toggle(sort.desc);
  const categoryInfo = await getActiveCategoryId();
  if (!categoryInfo) return;

  const { keyActiveCategory } = categoryInfo;
  await renderProductsInCategory(keyActiveCategory, 8, 0, field, order);
};

const clearActive = (): void => {
  const allSorts = <NodeListOf<HTMLElement>>document.querySelectorAll('.sorts');
  allSorts.forEach((el) => {
    if (el.classList.contains('active')) {
      el.classList.remove('active');
    }
  });
};
