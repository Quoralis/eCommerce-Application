import { createEl } from '../../utils/createElement.js';
import { CurrentProduct } from '../../types/types.js';

const showSalePrice = (
  data: CurrentProduct,
  parent: HTMLElement
): HTMLElement => {
  const sale = data.masterVariant.prices[0].discounted.value.centAmount;
  return createEl({
    tag: 'span',
    text: `${sale}EUR`,
    classes: ['uk-text-danger'],
    parent: parent,
  });
};

export const productComponentText = (
  data: CurrentProduct,
  parent: HTMLElement
): void => {
  const wrapperAllText = createEl({
    tag: 'div',
    classes: [
      'uk-flex',
      'uk-flex-column',
      'uk-flex-between',
      'uk-margin-medium-left',
      'wrapper-all-text',
    ],
    parent: parent,
  });

  window.addEventListener('resize', (): void => {
    if (window.innerWidth <= 700) {
      wrapperAllText.classList.add('uk-margin-remove-left');
    } else {
      wrapperAllText.classList.remove('uk-margin-remove-left');
    }
  });

  const TitleAndPrice = createEl({
    tag: 'div',
    classes: [
      'uk-flex',
      'uk-flex-column',
      'title-and-price',
      'uk-margin-small-top',
    ],
    parent: wrapperAllText,
  });

  createEl({
    tag: 'h1',
    text: data.name.en,
    parent: TitleAndPrice,
  });

  const priceWithSale = showSalePrice(data, TitleAndPrice);

  const defaultPrice = createEl({
    tag: 'span',
    classes: ['uk-margin-small-bottom', 'default-price'],
    text: `${data.masterVariant.prices[0].value.centAmount}EUR`,
    parent: TitleAndPrice,
  });
  if (priceWithSale.textContent) {
    defaultPrice.classList.add('line-through');
  }

  createEl({
    tag: 'span',
    text: data.description.en,
    parent: wrapperAllText,
  });
};
