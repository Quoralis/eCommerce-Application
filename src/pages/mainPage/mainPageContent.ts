import { createEl } from '../../utils/createElement.js';
import { getAdvantageCard } from '../../ui/advantageCard.js';
import { getMainSlider } from '../../ui/mainSlider.js';

const mainWrapper = createEl({
  tag: 'main',
  classes: ['uk-height-1-1', 'main-page-wrapper'],
});

const getMainPageContent = (parentEl: HTMLElement) => {
  const contentWrapper = createEl({
    tag: 'div',
    classes: ['uk-height-1-1', 'main-page__content-container'],
    parent: parentEl,
  });

  getMainSlider(contentWrapper);

  const advantagesWrapper = createEl({
    tag: 'div',
    parent: contentWrapper,
    classes: ['advantages'],
  });

  const cardGrid = createEl({
    tag: 'div',
    classes: ['uk-child-width-auto@m', 'advantages__card-grid'],
    parent: advantagesWrapper,
    attributes: {
      'uk-grid': '',
    },
  });

  for (let i = 0; i < 4; i++) {
    getAdvantageCard(i, cardGrid);
  }
};

export const showMainPageContent = () => {
  const isMain = () => document.querySelector('main');

  if (isMain()) {
    const currentMain = document.querySelector('main');
    if (currentMain) {
      currentMain.innerHTML = '';
      getMainPageContent(currentMain);
    }
  } else {
    document.querySelector('header')?.after(mainWrapper);
    getMainPageContent(mainWrapper);
  }
};
