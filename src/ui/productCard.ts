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
import { checkMyCart } from '../clients/checkMyCart.js';
import { getMyCart } from '../clients/getMyCart.js';
import { showNotification } from '../services/notification/showNotification.js';
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
    classes: ['card', 'our-id'],
    attributes: {
      id: <string>options.productId,
    },
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
      'btn-add',
    ],
    text: 'Add to cart',
    parent: cardElement,
  });
  addToCart.addEventListener('click', async (): Promise<void> => {
    addToCart.disabled = true;
    await addProductInCart(options.productKey);
  });
  return cardElement;
}

export const addProductInCart = async (option: string): Promise<void> => {
  let cart: responseMyCart;
  const positiveStatus = 200;
  const product = await getCurrentProductClient(option);
  const checkCart = await checkMyCart();
  if (checkCart !== positiveStatus) {
    cart = <responseMyCart>await createMyCart();
    localStorage.setItem('cartId', cart.id);
  }

  const updateVersion = <responseMyCart>await getMyCart();

  const addProductInCart: updateMyCart = {
    version: updateVersion.version,
    actions: [
      {
        action: 'addLineItem',
        productId: product.id,
        distributionChannel: {
          typeId: 'channel',
          id: '0995709c-be0e-4389-955f-9293634fd512',
        },
      },
    ],
  };
  await updateCart(addProductInCart);
  showNotification('Product added to cart', 'success');
};
