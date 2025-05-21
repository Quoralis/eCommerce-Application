import { createEl } from '../../utils/createElement.js';
// import img from '../../assets/images/logo.png';
const detailedProductPage = createEl({
  tag: 'div',
  classes: [
    'detailed-product-page',
    'uk-height-viewport',
    'uk-flex',
    'uk-flex-center',
    'uk-flex-middle',
  ],
});

// const paginationImg = createEl({
//   tag: 'img',
//   attributes: { src: img, alt: 'logo' },
//   parent: detailedProductPage,
// });

// const

export const showProductPage = (): void => {
  const main = document.querySelector('main');
  main?.append(detailedProductPage);
};
