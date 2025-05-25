import { createEl } from '../utils/createElement.js';
import { productComponentImgsPagination } from '../pages/detailedProductPage/pagination.js';
import { CurrentProduct } from '../types/types.js';
import Uikit from 'uikit';

export const showSlideShow = <T>(
  str: string,
  parent: HTMLElement,
  data: T
): void => {
  //   console.log(';;');
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
    ],
    attributes: {
      'uk-slidenav-next': '',
      'uk-slideshow-item': 'next',
      href: '',
    },
    parent: wrapperPagination,
  });

  if (str === 'slide') {
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
