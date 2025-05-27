import { createEl } from '../utils/createElement.js';
import { productComponentImgsPagination } from '../pages/detailedProductPage/pagination.js';
import { CurrentProduct } from '../types/types.js';
import Uikit from 'uikit';

export const slideShowInProductPage = 'slideShowInProductPage';

const showPaginationBtns = (el: HTMLElement): void => {
  if (window.innerWidth <= 700) {
    el.classList.remove('uk-visible-toggle');
  } else {
    el.classList.add('uk-visible-toggle');
  }
};

export const showSlideShow = <T>(
  str: string,
  parent: HTMLElement,
  data: T
): void => {
  const wrapperPagination = createEl({
    tag: 'div',
    classes: [
      'uk-position-relative',
      'uk-visible-toggle',
      'uk-dark',
      'uk-width-1-1',
      'uk-border-rounded',
      'wrapper-pagination',
    ],
    attributes: {
      'uk-slideshow': 'autoplay: true',
    },
    parent: parent,
  });

  showPaginationBtns(wrapperPagination);
  window.addEventListener('resize', (): void => {
    showPaginationBtns(wrapperPagination);
  });

  const wrapperImgs = createEl({
    tag: 'ul',
    classes: ['uk-slideshow-items', 'wrapper-imgs'],
    parent: wrapperPagination,
  });

  createEl({
    tag: 'a',
    classes: [
      'uk-position-center-left',
      'uk-position-small',
      'uk-hidden-hover',
      'uk-text-primary',
      'uk-slidenav-large',
      'btn',
    ],
    attributes: {
      'uk-slidenav-previous': '',
      'uk-slideshow-item': 'previous',
      href: '',
    },
    parent: wrapperPagination,
  });
  createEl({
    tag: 'a',
    classes: [
      'uk-position-center-right',
      'uk-position-small',
      'uk-hidden-hover',
      'uk-text-primary',
      'uk-slidenav-large',
      'btn',
    ],
    attributes: {
      'uk-slidenav-next': '',
      'uk-slideshow-item': 'next',
      href: '',
    },
    parent: wrapperPagination,
  });

  if (str === slideShowInProductPage) {
    productComponentImgsPagination(<CurrentProduct>data, wrapperImgs);
    wrapperImgs.addEventListener('mousedown', (event): void => {
      event.preventDefault();
      event.stopPropagation();
    });
    wrapperImgs.addEventListener('click', (): void => {
      Uikit.modal('#modal').show();
    });
  }
};
