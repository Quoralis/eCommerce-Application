import { updateCart } from '../../clients/updateMyCart.js';
import { getMyProduct } from '../../clients/getMyCart.js';
import { updateMyCart } from '../../types/types.js';
import { getListItem } from './showCartPage.js';
import { clearDom } from '../../utils/clearDom.js';
export const deleteProductInCart = async (event: Event): Promise<void> => {
  if (
    event.target instanceof SVGElement ||
    event.target instanceof HTMLButtonElement
  ) {
    const link = event.target.closest('.uk-icon');
    const product = <HTMLElement>link?.parentElement?.parentElement;
    const loginToken = <string>localStorage.getItem('accessToken');
    const versionCart = (await getMyProduct()).version;
    const removeProductInCart: updateMyCart = {
      version: versionCart,
      actions: [
        {
          action: 'removeLineItem',
          lineItemId: product.id,
          distributionChannel: {
            typeId: 'channel',
            id: '0995709c-be0e-4389-955f-9293634fd512',
          },
        },
      ],
    };
    await updateCart(
      <string>localStorage.getItem('cart'),
      removeProductInCart,
      loginToken
    );
    await getMyProduct();
    const cardWrapper = <HTMLElement>(
      document.querySelector('.card-product-wrapper')
    );
    clearDom('card-product-wrapper');
    await getListItem(cardWrapper);
  }
};
