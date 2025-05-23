import { getAllProductsClients } from '../clients/getCurrentProductClient.js';

export async function prepareProductsForDisplay() {
  const responseProducts = await getAllProductsClients();
  if ('results' in responseProducts)
    return responseProducts.results.map((currentValue) => ({
      nameCard: currentValue.name,
      urlImageCard: '',
      descriptionCard: currentValue.description,
      priceProduct: '',
    }));
}
prepareProductsForDisplay();
