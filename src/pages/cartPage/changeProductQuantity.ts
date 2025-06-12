import { getMyCart } from '../../clients/getMyCart.js';
import { updateCart } from '../../clients/updateMyCart.js';
import { IChangeQuantity, responseMyCart } from '../../types/types.js';
import { formatPrice } from '../../utils/formatPrice.js';

export const changeProductQuantity = async (e: Event) => {
  if (e.target instanceof Element) {
    const currentCart = await getMyCart();
    const product = e.target.closest('.uk-card');
    const productId = product?.id;
    const currentProduct = currentCart?.lineItems.find(
      (item) => item.id === productId
    );
    const updateVersion = <responseMyCart>await getMyCart();

    const addProductItem: IChangeQuantity = {
      version: updateVersion.version,
      actions: [
        {
          action: 'changeLineItemQuantity',
          lineItemId: productId,
          quantity: +(currentProduct?.quantity ?? 0) + 1,
        },
      ],
    };

    const updateResponse = await updateCart(addProductItem);

    if (productId) {
      const productWrapper = document.getElementById(productId);
      const quantity = productWrapper?.querySelector(
        '.uk-flex.uk-flex-bottom .uk-margin-small-right.uk-margin-small-left'
      );
      const totalPrice = productWrapper?.querySelector('.total-price');

      if (quantity && totalPrice) {
        const updatedProduct = updateResponse?.lineItems?.find(
          (item) => item.id === productId
        );
        quantity.textContent = updatedProduct?.quantity?.toString() ?? '';
        totalPrice.textContent = formatPrice(
          <number>updatedProduct?.totalPrice.centAmount
        );
      }
    }
  }
};
