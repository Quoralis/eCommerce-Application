import { createEl } from '../../utils/createElement.js';
import { CurrentProduct } from '../../types/types.js';
import { formatPrice } from '../../utils/formatPrice.js';
import { addProductInCart } from '../../ui/productCard.js';
const showSalePrice = (
  data: CurrentProduct,
  parent: HTMLElement
): HTMLElement => {
  let sale;
  if (data.masterVariant.prices[0].discounted) {
    sale = formatPrice(
      data.masterVariant.prices[0].discounted.value.centAmount
    );
  } else {
    sale = '';
  }
  return createEl({
    tag: 'span',
    text: `${sale}`,
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
      'uk-margin-xsmall-left',
      'wrapper-all-text',
      'our-id',
    ],
    parent: parent,
    attributes: {
      id: data.id,
    },
  });

  window.addEventListener('resize', (): void => {
    if (window.innerWidth <= 700) {
      wrapperAllText.classList.add('uk-margin-xsmall-left');
    } else {
      wrapperAllText.classList.remove('uk-margin-xsmall-left');
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

  const defaultPriceNum = formatPrice(
    data.masterVariant.prices[0].value.centAmount
  );
  const defaultPrice = createEl({
    tag: 'span',
    classes: ['uk-margin-small-bottom', 'default-price'],
    text: `${defaultPriceNum}`,
    parent: TitleAndPrice,
  });
  if (priceWithSale.textContent) {
    defaultPrice.classList.add('line-through');
  }

  toggleProductInCart(wrapperAllText, data);

  createEl({
    tag: 'span',
    classes: ['uk-margin-medium-bottom'],
    text: data.description.en,
    parent: wrapperAllText,
  });
};

const toggleProductInCart = (
  parent: HTMLElement,
  data: CurrentProduct
): void => {
  const btnsWrapper = createEl({
    tag: 'div',
    classes: ['uk-margin-small-bottom', 'uk-flex', 'uk-flex-row'],
    parent: parent,
  });
  const productAdd = createEl({
    tag: 'button',
    text: 'Add to cart',
    classes: [
      'uk-button',
      'uk-border-rounded',
      'uk-button-primary',
      'login-btn',
      'btn-add',
      'button',
    ],
    parent: btnsWrapper,
  });
  productAdd.addEventListener('click', (): void => {
    productAdd.disabled = true;
    addProductInCart(data.key);
  });
  /*  const productRemove =  */ createEl({
    tag: 'button',
    text: 'Remove from cart',
    classes: [
      'uk-margin-small-left',
      'uk-button',
      'uk-border-rounded',
      'uk-button-primary',
      'login-btn',
      'uk-icon',
      'button',
    ],
    parent: btnsWrapper,
  });
};
