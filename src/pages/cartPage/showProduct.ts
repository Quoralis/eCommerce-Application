import { createEl } from '../../utils/createElement.js';
import { DisplayProduct } from '../../types/types.js';
import { formatPrice } from '../../utils/formatPrice.js';
import { priceProduct } from './priceProduct.js';
import { deleteProductInCart } from './deleteProduct.js';
import { changeProductQuantity } from './changeProductQuantity.js';
import { getMyCart } from '../../clients/getMyCart.js';

export const showProduct = (
  parent: HTMLElement,
  data: DisplayProduct
): void => {
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
    classes: ['uk-flex', 'uk-flex-row', 'uk-width-1-3@m'],
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

  createEl({
    tag: 'span',
    text: `${price}`,
    parent: nameAndPrice,
  });
  changeQualityProduct(cardProduct, data);
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
  /* const demotionProduct =  */ createEl({
    tag: 'a',
    attributes: { 'uk-icon': 'minus-circle' },
    parent: btnsWrapper,
    onClick: async (event) => {
      await changeProductQuantity(event, -1);
    },
  });
  /* const quantity = */ createEl({
    tag: 'span',
    classes: ['uk-margin-small-right', 'uk-margin-small-left'],
    text: currentProduct?.quantity?.toString(),
    parent: btnsWrapper,
  });
  /*  const promotionProduct = */ createEl({
    tag: 'a',
    attributes: { 'uk-icon': 'plus-circle' },
    parent: btnsWrapper,
    onClick: async (event) => {
      await changeProductQuantity(event, 1);
    },
  });

  createEl({
    tag: 'div',
    text: `${totalPrice}`,
    parent: parent,
    classes: ['total-price'],
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
