import { createEl } from '../utils/createElement.js';

const cardData = [
  {
    title: 'Genuine Apple Products',
    text: '100% authentic Apple devices with full manufacturer warranty',
    icon: '../../assets/images/icons/advantages/genuine-products.svg',
  },
  {
    title: 'Fast & Free Shipping',
    text: 'Free delivery on all orders over $50 within 2-3 business days',
    icon: '../../assets/images/icons/advantages/delivery.svg',
  },
  {
    title: 'Trade-In Program',
    text: 'Get discount when you trade in your old Apple devices',
    icon: '../../assets/images/icons/advantages/trade-in.svg',
  },
  {
    title: 'One Year Accident Protection',
    text: 'One free screen replacement on iPhone purchases',
    icon: '../../assets/images/icons/advantages/protection.svg',
  },
];

export const getAdvantageCard = (cardIndex: number, parentEl: HTMLElement) => {
  let cardMedia;
  let cardBody;

  const cardGridInner = createEl({
    tag: 'div',
    parent: parentEl,
  });

  const card = createEl({
    tag: 'div',
    parent: cardGridInner,
    classes: ['uk-card', 'uk-card-primary', 'advantages__card'],
  });

  if (cardIndex % 2 === 0) {
    cardMedia = createEl({
      tag: 'div',
      classes: ['uk-card-media-top', 'advantages__card-media'],
      parent: card,
    });

    cardBody = createEl({
      tag: 'div',
      classes: ['uk-card-body', 'uk-card-default', 'advantages__card-body'],
      parent: card,
    });
  } else {
    cardBody = createEl({
      tag: 'div',
      classes: ['uk-card-body', 'uk-card-default'],
      parent: card,
    });

    cardMedia = createEl({
      tag: 'div',
      classes: ['uk-card-media-bottom', 'advantages__card-media'],
      parent: card,
    });
  }

  createEl({
    tag: 'img',
    classes: ['bi', 'bi-truck', 'advantages__card-icon'],
    attributes: {
      src: cardData[cardIndex].icon,
      alt: 'img',
    },
    parent: cardMedia,
  });

  createEl({
    tag: 'h3',
    classes: ['uk-card-title', 'advantages__card-title'],
    text: cardData[cardIndex].title,
    parent: cardBody,
  });

  createEl({
    tag: 'p',
    classes: ['advantages__card-text'],
    text: cardData[cardIndex].text,
    parent: cardBody,
  });
};
