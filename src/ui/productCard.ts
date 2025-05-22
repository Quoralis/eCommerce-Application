import { createEl } from '../utils/createElement.js';

export function renderProductCard(
  parent: HTMLElement,
  nameCard: string,
  urlImageCard: string,
  descriptionCard: string,
  productKey: string,
  priceProduct: string
): HTMLElement {
  const cardElement = createEl({
    tag: 'article',
    classes: ['card'],
    attributes: { 'data-product-key': productKey },
    parent: parent,
  });
  createEl({
    tag: 'img',
    classes: ['card-img'],
    attributes: {
      src: urlImageCard,
      alt: nameCard,
    },
    parent: cardElement,
  });
  createEl({
    tag: 'h3',
    text: nameCard,
    parent: cardElement,
  });
  createEl({
    tag: 'span',
    text: descriptionCard,
    classes: ['card__description'],
    parent: cardElement,
  });
  createEl({
    tag: 'p',
    classes: ['card__price'],
    text: priceProduct,
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
