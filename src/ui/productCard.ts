import { createEl } from '../utils/createElement.js';
import { formatPrice } from '../utils/formatPrice.js';
import { DisplayProduct } from '../types/types.js';
import { formatShortDescription } from '../utils/formatShortDescription.js';

export function renderProductCard(
  parent: HTMLElement,
  options: DisplayProduct
): HTMLElement {
  const priceText = formatPrice(options.price);
  const discountText =
    options.discountedPrice != null ? formatPrice(options.discountedPrice) : '';
  const shortDescription = formatShortDescription(options.description);
  const cardElement = createEl({
    tag: 'article',
    classes: ['card'],
    attributes: { 'data-product-key': options.productKey },
    parent: parent,
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
  createEl({
    tag: 'p',
    classes: ['card__price'],
    text: priceText,
    parent: cardElement,
  });
  createEl({
    tag: 'p',
    classes: ['card__discount'],
    text: discountText,
    parent: cardElement,
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
