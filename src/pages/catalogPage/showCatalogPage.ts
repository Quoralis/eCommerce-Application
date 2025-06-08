import { renderCatalogSection } from '../../ui/catalogSection.js';
import { createEl } from '../../utils/createElement.js';
import { getMyProduct } from '../../clients/getMyCart.js';
import { checkMyCart } from '../../clients/checkMyCart.js';
export async function showCatalogPage() {
  const main = document.querySelector('main');
  if (main) {
    main.innerHTML = '';
    createEl({
      tag: 'nav',
      classes: ['nav-breadcrumb'],
      parent: main,
    });
    await renderCatalogSection(main);
  }
  await toggleStateButtons();
}

export const toggleStateButtons = async (): Promise<void> => {
  const cartId = <string>localStorage.getItem('cart');
  const checkCart = await checkMyCart(
    cartId,
    <string>localStorage.getItem('accessToken')
  );
  if (checkCart === 200) {
    const listProducts = (await getMyProduct()).lineItems;
    const lineItemsId = listProducts.map((el) => el.productId);
    const cards = document.querySelectorAll('.our-id');
    cards.forEach((el) => {
      const checkProduct = lineItemsId.includes(el.id);
      if (checkProduct) {
        const button = <HTMLButtonElement>el.querySelector('.btn-add');
        if (button) {
          button.disabled = true;
        }
      }
    });
  }
};
