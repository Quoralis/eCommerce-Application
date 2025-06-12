// import { prepareProductsForDisplay } from '../services/prepareProductsForDisplay.js';
// import { DisplayProduct } from '../types/types.js';
// import { renderProductCard } from './productCard.js';
// import { keepOnlyDigits } from '../utils/keepOnlyDigits.js';
// import { renderPagination } from './renderPagination.js';
// import { paginations } from './paginations.js';
//
// export async function renderProductList(
//   container: HTMLElement,
//   countProducts: number
// ) {
//   const allProducts = await prepareProductsForDisplay();
//   console.log(allProducts);
//   if (allProducts === null || allProducts === undefined) {
//     console.error('No products found');
//     return;
//   }
//   const productContainer = document.querySelector(
//     '.product-container'
//   ) as HTMLElement;
//   const minPriceInput = document.getElementById(
//     'min-price'
//   ) as HTMLInputElement;
//   const maxPriceInput = document.getElementById(
//     'max-price'
//   ) as HTMLInputElement;
//   const minPriceStr = keepOnlyDigits(minPriceInput.value);
//   const maxPriceStr = keepOnlyDigits(maxPriceInput.value);
//   const minPrice = Number(minPriceStr || '0') * 100;
//   const maxPrice = Number(maxPriceStr || '20000000') * 100;
//
//   const filteredProducts = allProducts.filter((product) => {
//     let price = product.priceProduct ?? 0;
//     const priceDiscount = product.priceDiscount;
//     price = priceDiscount ? priceDiscount : price;
//     return price >= minPrice && price <= maxPrice;
//   });
//   renderPagination(productContainer, filteredProducts.length, 1, paginations);
//
//   for (let i = 0; i < countProducts; i++) {
//     const dataCard: DisplayProduct = {
//       productName: filteredProducts[i].nameCard.en,
//       imageUrl: filteredProducts[i].urlImageCard,
//       productKey: filteredProducts[i].productKey,
//       description: filteredProducts[i].descriptionCard.en,
//       price: filteredProducts[i].priceProduct,
//       discountedPrice: filteredProducts[i].priceDiscount,
//     };
//     renderProductCard(container, dataCard);
//   }
// }
