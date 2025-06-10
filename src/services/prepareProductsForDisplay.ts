import { getAllProductsClients } from '../clients/getCurrentProductClient.js';
import { CurrentProduct } from '../types/types.js';

export async function prepareProductsForDisplay() {
  const responseProducts = await getAllProductsClients();
  if ('results' in responseProducts)
    return responseProducts.results.map((currentValue: CurrentProduct) => ({
      nameCard: currentValue.name,
      urlImageCard: currentValue.masterVariant.images![0].url,
      productKey: currentValue.key,
      descriptionCard: currentValue.description,
      priceProduct: currentValue.masterVariant.prices[0].value.centAmount,
      priceDiscount:
        currentValue.masterVariant.prices[0].discounted?.value.centAmount,
      productId: currentValue.id,
    }));
}
