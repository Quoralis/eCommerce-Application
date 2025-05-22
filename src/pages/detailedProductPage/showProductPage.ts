import { createEl } from '../../utils/createElement.js';
import { getCurrentProduct } from '../../clients/getCurrentProduct.js';
import { CurrentProduct } from '../../types/types.js';

const productAllComponents = (
  data: CurrentProduct,
  parent: HTMLElement
): void => {
  const detailedProductPage = createEl({
    tag: 'div',
    classes: [
      'uk-height-viewport',
      'uk-flex',
      'uk-flex-center',
      'uk-flex-middle',
      'detailed-product-page',
    ],
    parent: parent,
  });
  productComponentImgPagination(data, detailedProductPage);
  productComponentText(data, detailedProductPage);
};

const productComponentImgPagination = (
  data: CurrentProduct,
  parent: HTMLElement
): void => {
  const wrapperPagination = createEl({
    tag: 'div',
    classes: [
      'uk-position-relative',
      'uk-dark',
      'uk-width-1-2',
      'wrapper-pagination',
    ],
    attributes: { 'uk-slideshow': '', tabindex: '-1' },
    parent: parent,
  });

  const wrapperImgs = createEl({
    tag: 'ul',
    classes: ['uk-slideshow-items'],
    parent: wrapperPagination,
  });

  data.masterVariant.images?.forEach((el) => {
    const wrapperImg = createEl({
      tag: 'li',
      parent: wrapperImgs,
    });

    /* const paginationImg = */ createEl({
      tag: 'img',
      attributes: {
        src: el.url,
        alt: 'electronic equipment',
        'uk-cover': '',
      },
      parent: wrapperImg,
    });
  });
};

const productComponentText = (
  data: CurrentProduct,
  parent: HTMLElement
): void => {
  const wrapperAllText = createEl({
    tag: 'div',
    classes: ['uk-flex', 'uk-flex-column'],
    parent: parent,
  });

  /* const titleProduct = */ createEl({
    tag: 'span',
    text: data.name.en,
    parent: wrapperAllText,
  });

  /* const priceProduct = */ createEl({
    tag: 'span',
    text: `${data.masterVariant.prices[0].value.centAmount}EUR`,
    parent: wrapperAllText,
  });

  /* const descriptionProduct = */ createEl({
    tag: 'span',
    text: data.description.en,
    parent: wrapperAllText,
  });
};

export const showProductPage = async () => {
  const data = await getCurrentProduct('4dbb3fb7-24e6-4c31-84fd-f76e414de2fd');
  const main = <HTMLElement>document.querySelector('main');
  productAllComponents(data, main);
};
