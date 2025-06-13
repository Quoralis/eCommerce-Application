import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';
import { apiUrl, projectKey } from '../config.js';
import { ProductsResponse } from '../types/types.js';
import { fetchFromApi } from '../services/fetchFromApi.js';
import { keepOnlyDigits } from '../utils/keepOnlyDigits.js';

export const searchProduct = async (text: string, categoryId: string) => {
  const bearerToken = localStorage.getItem('bearerToken');
  const url = `${apiUrl}/${projectKey}/product-projections/search?text.en=${text}&filter=categories.id:"${categoryId}"`;

  try {
    const response = await wrapperTryCatch<ProductsResponse>(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return response.results;
  } catch (err) {
    console.log('updateCustomerInf', err);
  }
};

export const searchProductsPrice = async (
  categoryId: string
): Promise<ProductsResponse> => {
  const minPriceInput = document.getElementById(
    'min-price'
  ) as HTMLInputElement;
  const maxPriceInput = document.getElementById(
    'max-price'
  ) as HTMLInputElement;

  const minPriceStr = keepOnlyDigits(minPriceInput.value);
  const maxPriceStr = keepOnlyDigits(maxPriceInput.value);
  const minPrice = Number(minPriceStr || '0') * 100;
  const maxPrice = Number(maxPriceStr || '20000000') * 100;
  return await fetchFromApi(
    `product-projections/search?filter=variants.price.centAmount:range(${minPrice} to ${maxPrice})&filter=categories.id:"${categoryId}"`
  );
};
