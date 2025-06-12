import { createEl } from '../../utils/createElement.js';
import { getMyCart } from '../../clients/getMyCart.js';
import { showProduct } from './showProduct.js';
import { showTotalHeanding } from './showTotalPrice.js';
import {
  responseMyCart,
  DisplayProduct,
  productCart,
} from '../../types/types.js';
import { showModalWindow } from '../../ui/modalWindow.js';
import { modalInCartPage } from '../../ui/modalWindow.js';
import { emptyCart } from './emptyCart.js';
import { checkMyCart } from '../../clients/checkMyCart.js';
import UIkit from 'uikit';

const showHeanding = (parent: HTMLElement): void => {
  const showHeandingWrapper = createEl({
    tag: 'div',
    classes: ['uk-heading-divider', 'uk-flex', 'uk-flex-around'],
    parent: parent,
  });

  createEl({
    tag: 'span',
    text: 'Products',
    parent: showHeandingWrapper,
  });

  const clearAll = createEl({
    tag: 'a',
    text: 'Clear cart',
    classes: ['el-nav'],
    parent: showHeandingWrapper,
  });
  clearAll.addEventListener('click', (): void => {
    UIkit.modal('#modal').show();
  });
};

export const getListItem = async (parent: HTMLElement): Promise<void> => {
  const checkCart = await checkMyCart();
  if (checkCart !== 200) {
    emptyCart();
  } else {
    const cart = <responseMyCart>await getMyCart();
    const arrProducts = cart.lineItems;
    if (arrProducts.length) {
      showProducts(arrProducts, parent);
    } else {
      emptyCart();
    }
  }
};

export const showProducts = (
  arrProducts: productCart[],
  parent: HTMLElement
): void => {
  arrProducts.forEach((el) => {
    const dataProduct: DisplayProduct = {
      productName: el.name.en,
      imageUrl: el.variant.images[0].url,
      price: el.price.value.centAmount,
      description: el.name.en,
      productKey: el.id,
      discountedPrice: el.price.discounted?.value.centAmount,
      totalPrice: el.totalPrice.centAmount,
      productId: el.id,
    };
    showProduct(parent, dataProduct);
  });
};

export const showCartPage = async () => {
  const main = <HTMLElement>document.querySelector('main');
  const cartPage = createEl({
    tag: 'div',
    classes: [
      'uk-height-viewport',
      'container-registration',
      'uk-flex',
      'cart-page',
    ],
    parent: main,
  });

  const wrapperProducts = createEl({
    tag: 'div',
    classes: ['wrapper-products'],
    parent: cartPage,
  });

  showHeanding(wrapperProducts);

  const wrapperTotals = createEl({
    tag: 'div',
    classes: ['wrapper-totals'],
    parent: cartPage,
  });
  // main?.append(cartPage);
  const cardProductWrapper = createEl({
    tag: 'div',
    classes: ['uk-height-viewport', 'card-product-wrapper'],
    parent: wrapperProducts,
  });

  showTotalHeanding(wrapperTotals);
  showModalWindow(modalInCartPage);
  await getListItem(cardProductWrapper);
};
