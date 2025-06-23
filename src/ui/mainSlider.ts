import bannerBringOnUniversity from '../assets/images/banners/bringOnUniversity.jpg';
import bannerCustomEngraving from '../assets/images/banners/customEngraving.png';
import { createEl } from '../utils/createElement.js';

export const getMainSlider = (parentEl: HTMLElement) => {
  const slider = createEl({
    tag: 'div',
    classes: ['uk-position-relative', 'uk-visible-toggle'],
    attributes: {
      'uk-slider': 'center: true; autoplay: true; autoplay-interval: 3000',
    },
    parent: parentEl,
  });

  const sliderContainer = createEl({
    tag: 'div',
    classes: ['uk-slider-container'],
    parent: slider,
  });

  const sliderItems = createEl({
    tag: 'ul',
    classes: ['uk-slider-items', 'uk-child-width-1-1', 'uk-grid'],
    parent: sliderContainer,
  });

  const slides = [bannerBringOnUniversity, bannerCustomEngraving];

  slides.forEach((slideSrc) => {
    const slideItem = createEl({
      tag: 'li',
      parent: sliderItems,
      classes: ['slider__slide'],
    });

    createEl({
      tag: 'img',
      attributes: {
        src: slideSrc,
      },
      parent: slideItem,
      classes: ['slider__slide-img'],
    });
  });

  for (let i = 0; i < 2; i++) {
    const sliderNav = createEl({
      tag: 'a',
      classes:
        i === 0
          ? ['uk-position-center-left', 'uk-position-small', 'uk-hidden-hover']
          : [
              'uk-position-center-right',
              'uk-position-small',
              'uk-hidden-hover',
            ],
      attributes: {
        href: '#',
        'uk-slider-item': i === 0 ? 'previous' : 'next',
      },
      parent: slider,
    });

    if (i === 0) {
      sliderNav.setAttribute('uk-slidenav-previous', '');
    } else {
      sliderNav.setAttribute('uk-slidenav-next', '');
    }
  }

  const sliderDotWrapper = createEl({
    tag: 'div',
    classes: ['uk-flex', 'uk-flex-center', 'uk-margin-top'],
    parent: slider,
  });

  createEl({
    tag: 'ul',
    classes: ['uk-slider-nav', 'uk-dotnav'],
    parent: sliderDotWrapper,
  });
};
