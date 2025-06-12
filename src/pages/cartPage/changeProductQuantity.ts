import { getMyCart } from '../../clients/getMyCart.js';
import { updateCart } from '../../clients/updateMyCart.js';
import { IChangeQuantity, responseMyCart } from '../../types/types.js';
import { formatPrice } from '../../utils/formatPrice.js';
import { deleteProductInCart } from './deleteProduct.js';

export const changeProductQuantity = async (e: Event, addition: number) => {
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
          quantity:
            +(currentProduct?.quantity ?? 0) + addition < 1
              ? 0
              : +(currentProduct?.quantity ?? 0) + addition,
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

        if (updatedProduct?.quantity) {
          quantity.textContent = updatedProduct?.quantity?.toString();
          totalPrice.textContent = formatPrice(
            <number>updatedProduct?.totalPrice.centAmount
          );
        } else {
          deleteProductInCart(productId);
        }
      }
    }
  }
};
