import { createEl } from '../../utils/createElement.js';
import { clearDom } from '../../utils/clearDom.js';
export const emptyCart = (): void => {
  clearDom('cart-page');
  const cartPage = <HTMLElement>document.querySelector('.cart-page');
  const containerEmpty = createEl({
    tag: 'div',
    classes: [
      'uk-flex',
      'uk-flex-middle',
      'uk-flex-column',
      'conteiner-empty',
      'uk-width-1-1',
    ],
    parent: cartPage,
  });

  createEl({
    tag: 'h4',
    classes: ['uk-text-center', 'uk-margin-small-bottom'],
    text: "Here are no products yet, don't you want to buy something?",
    parent: containerEmpty,
  });

  createEl({
    tag: 'a',
    text: 'go to catalog',
    classes: ['el-nav'],
    attributes: {
      'data-path': '/catalog',
    },
    parent: containerEmpty,
  });
};
