import { updateCart } from '../../clients/updateMyCart.js';
import { getMyProduct } from '../../clients/getMyCart.js';
import { updateMyCart } from '../../types/types.js';
import { getListItem } from './showCartPage.js';
import { clearDom } from '../../utils/clearDom.js';
import { updateTotalPrice } from './updateTotalPrice.js';
export const deleteProductInCart = async (id: string): Promise<void> => {
  const versionCart = (await getMyProduct()).version;
  const removeProductInCart: updateMyCart = {
    version: versionCart,
    actions: [
      {
        action: 'removeLineItem',
        lineItemId: id,
        distributionChannel: {
          typeId: 'channel',
          id: '0995709c-be0e-4389-955f-9293634fd512',
        },
      },
    ],
  };
  await updateCart(removeProductInCart);
  await getMyProduct();
  const cardWrapper = <HTMLElement>(
    document.querySelector('.card-product-wrapper')
  );
  clearDom('card-product-wrapper');
  await getListItem(cardWrapper);
  await updateTotalPrice();
};
