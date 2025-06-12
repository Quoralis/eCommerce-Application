import { fetchFromApi } from '../services/fetchFromApi.js';
import { ProductsResponse } from '../types/types.js';

export async function getPaginatedProducts(limit: number, offset: number) {
  const productsResponse: ProductsResponse = await fetchFromApi(
    `product-projections/search?limit=${limit}&offset=${offset}`
  );
  console.log(productsResponse);
}
