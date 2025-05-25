import { createEl } from '../../utils/createElement.js';
import { CurrentProduct } from '../../types/types.js';

export const productComponentImgsPagination = (
  data: CurrentProduct,
  parent: HTMLElement
) => {
  data.masterVariant.images?.forEach((el) => {
    const wrapperImg = createEl({
      tag: 'li',
      parent: parent,
    });
    createEl({
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
