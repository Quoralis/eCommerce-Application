import { createEl } from '../utils/createElement.js';
import { formatPrice } from '../utils/formatPrice.js';
import { DisplayProduct } from '../types/types.js';
import { formatShortDescription } from '../utils/formatShortDescription.js';

export let currentProduct = '';

export function renderProductCard(
  parent: HTMLElement,
  options: DisplayProduct,
  category?: string
): HTMLElement {
  const priceText = formatPrice(options.price);
  const discountText =
    options.discountedPrice != null ? formatPrice(options.discountedPrice) : '';
  const shortDescription = formatShortDescription(options.description);
  const cardElement = createEl({
    tag: 'article',
    classes: ['card'],
    attributes: {
      'data-product-key': options.productKey,
      'data-path': `/catalog/${category}/${options.productKey}`,
    },
    parent: parent,
  });
  cardElement.addEventListener('click', (): void => {
    currentProduct = <string>cardElement.getAttribute('data-product-key');
  });
  createEl({
    tag: 'img',
    classes: ['card-img'],
    attributes: {
      src: options.imageUrl,
      alt: options.productName,
    },
    parent: cardElement,
  });
  createEl({
    tag: 'h3',
    text: options.productName,

    parent: cardElement,
  });
  createEl({
    tag: 'span',

    text: shortDescription,
    classes: ['card__description'],
    parent: cardElement,
  });
  const wrapperPrices = createEl({
    tag: 'div',
    classes: ['wrapper-prices'],
    parent: cardElement,
  });
  const priceEl = createEl({
    tag: 'p',
    classes: ['card__price'],
    text: priceText,
    parent: wrapperPrices,
  });
  if (options.discountedPrice != null) {
    priceEl.classList.add('strikethrough');
  }
  createEl({
    tag: 'p',
    classes: ['card__discount'],
    text: discountText,
    parent: wrapperPrices,
  });
  createEl({
    tag: 'button',
    classes: [
      'uk-width-1-1',
      'uk-button',
      'uk-border-rounded',
      'uk-button-primary',
      'button-to-cart',
    ],
    text: 'Add to cart',
    onClick: () => {
      console.log('click add to cart');
    },
    parent: cardElement,
  });
  return cardElement;
}
