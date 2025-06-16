import { createEl } from '../../utils/createElement.js';
import { DisplayProduct } from '../../types/types.js';
import { formatPrice } from '../../utils/formatPrice.js';
import { priceProduct } from './priceProduct.js';
import { deleteProductInCart } from './deleteProduct.js';
import { changeProductQuantity } from './changeProductQuantity.js';
import { getMyCart } from '../../clients/getMyCart.js';

export const showProduct = async (
  parent: HTMLElement,
  data: DisplayProduct
): Promise<void> => {
  const price = priceProduct(data);
  const cardProduct = createEl({
    tag: 'div',
    classes: [
      'uk-card',
      'uk-width-1-1',
      'uk-card-default',
      'uk-border-rounded',
      'card-product',
      'uk-child-width-expand',
      'uk-flex',
      'uk-flex-middle',
      'uk-flex-between',
    ],
    attributes: {
      'uk-grid': '',
      id: <string>data.productId,
    },
    parent: parent,
  });

  const infProduct = createEl({
    tag: 'div',
    classes: ['uk-flex', 'uk-flex-row', 'uk-width-1-3@m', 'product__info'],
    parent: cardProduct,
  });

  createEl({
    tag: 'img',
    attributes: { src: data.imageUrl },
    classes: ['product-img'],
    parent: infProduct,
  });

  const nameAndPrice = createEl({
    tag: 'div',
    classes: ['uk-flex', 'uk-flex-column', 'uk-margin-small-left'],
    parent: infProduct,
  });

  createEl({
    tag: 'span',
    text: data.productName,
    parent: nameAndPrice,
  });

  const priceWrapper = createEl({
    tag: 'div',
    classes: ['product__price-wrapper'],
    parent: nameAndPrice,
  });

  for (let i = 0; i < 2; i++) {
    createEl({
      tag: 'span',
      text: `${price}`,
      parent: priceWrapper,
      classes: i === 1 ? ['product__full-price'] : ['product__current-price'],
    });
  }
  await changeQualityProduct(cardProduct, data);
  deleteProduct(cardProduct);
};

const changeQualityProduct = async (
  parent: HTMLElement,
  data: DisplayProduct
): Promise<void> => {
  const currentCart = await getMyCart();
  const currentProduct = currentCart?.lineItems.find(
    (product) => product.id === data.productId
  );

  const totalPrice = formatPrice(<number>data.totalPrice);
  const btnsWrapper = createEl({
    tag: 'div',
    classes: ['uk-flex', 'uk-flex-bottom'],
    parent: parent,
  });
  const demotionProduct = createEl({
    tag: 'button',
    attributes: { 'uk-icon': 'minus-circle' },
    classes: ['quality-product'],
    parent: btnsWrapper,
    onClick: async (event) => {
      demotionProduct.disabled = true;
      await changeProductQuantity(event, -1);
      demotionProduct.disabled = false;
    },
  });
  /* const quantity = */ createEl({
    tag: 'span',
    classes: ['uk-margin-small-right', 'uk-margin-small-left'],
    text: currentProduct?.quantity?.toString(),
    parent: btnsWrapper,
  });
  const promotionProduct = createEl({
    tag: 'button',
    attributes: { 'uk-icon': 'plus-circle' },
    classes: ['quality-product'],
    parent: btnsWrapper,
    onClick: async (event) => {
      promotionProduct.disabled = true;
      await changeProductQuantity(event, 1);
      promotionProduct.disabled = false;
    },
  });

  createEl({
    tag: 'div',
    text: `${totalPrice}`,
    parent: parent,
    classes: ['product__total-price'],
  });
};

const deleteProduct = (parent: HTMLElement): void => {
  const deleteProductWraper = createEl({
    tag: 'div',
    parent: parent,
  });
  const deleteProduct = createEl({
    tag: 'a',
    attributes: { 'uk-icon': 'trash' },
    parent: deleteProductWraper,
  });
  deleteProduct.addEventListener('click', (event: Event): void => {
    if (event.target instanceof SVGElement) {
      const link = event.target.closest('.uk-icon');
      const product = <HTMLElement>link?.parentElement?.parentElement;
      deleteProductInCart(product.id);
    }
  });
};
