import { createEl } from '../utils/createElement.js';
import { formatPrice } from '../utils/formatPrice.js';
import {
  DisplayProduct,
  updateMyCart,
  responseMyCart,
} from '../types/types.js';
import { formatShortDescription } from '../utils/formatShortDescription.js';
import { createMyCart } from '../clients/createMyCart.js';
import { updateCart } from '../clients/updateMyCart.js';
import { getCurrentProductClient } from '../clients/getCurrentProductClient.js';
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
    parent: parent,
  });
  cardElement.addEventListener('click', (event: Event): void => {
    if (event.target instanceof HTMLElement) {
      if (!event.target.classList.contains('card-btn')) {
        event.target.setAttribute('data-product-key', options.productKey);
        event.target.setAttribute(
          'data-path',
          `/catalog/${category}/${options.productKey}`
        );
        currentProduct = <string>cardElement.getAttribute('data-product-key');
      }
    }
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
  const addToCart = createEl({
    tag: 'button',
    classes: [
      'uk-width-1-1',
      'uk-button',
      'uk-border-rounded',
      'uk-button-primary',
      'button-to-cart',
      'card-btn',
    ],
    text: 'Add to cart',
    parent: cardElement,
  });
  addToCart.addEventListener('click', (): void => {
    addProductInCart(options);
  });
  return cardElement;
}

const addProductInCart = async (options: DisplayProduct): Promise<void> => {
  const product = await getCurrentProductClient(options.productKey);
  const loginToken = <string>localStorage.getItem('accessToken');
  const cart = <responseMyCart>await createMyCart(loginToken);
  // console.log('+', product.masterVariant.prices[0].value.centAmount);
  const addProductInCart: updateMyCart = {
    version: cart.version,
    actions: [
      {
        action: 'addLineItem',
        productId: product.id,
        variantId: 1,
        quantity: 1,
        country: 'DE',
        // currency: 'EUR',
        // productPriceMode: 'Embedded',
        // actionIndex: 1,
      },
    ],
  };
  await updateCart(cart.id, addProductInCart, loginToken);
};
