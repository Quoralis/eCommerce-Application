import { getMyProduct } from '../../clients/getMyCart.js';

export const getCurentProductInCart = async (id: string) => {
  const listProducts = (await getMyProduct()).lineItems;
  const product = listProducts.find((el) => el.productId === id);
  return product;
};
