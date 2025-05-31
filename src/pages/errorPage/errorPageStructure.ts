import { createEl } from '../../utils/createElement.js';
import { header } from '../header/headerStructure.js';

const errorPageWrapper = createEl({
  tag: 'div',
  classes: [
    'uk-flex',
    'uk-flex-center',
    'uk-flex-middle',
    'uk-height-viewport',
  ],
});

createEl({
  tag: 'dotlottie-player',
  attributes: {
    src: 'https://lottie.host/7f47e557-4975-4c09-b4a5-8a64746caf3e/40S5EzXUZ4.lottie',
    background: 'transparent',
    speed: '1',
    style: 'width: 400px; height: 400px',
    loop: '',
    autoplay: '',
  },
  parent: errorPageWrapper,
});

const containerInf = createEl({
  tag: 'div',
  classes: ['uk-flex', 'uk-flex-center', 'uk-flex-column', 'uk-flex-middle'],
  parent: errorPageWrapper,
});

createEl({
  tag: 'h1',
  classes: ['uk-text-center'],
  text: "We couldn't find such a page",
  parent: containerInf,
});

const backToMainBtn = createEl({
  tag: 'button',
  text: 'Back to Main',
  classes: ['uk-button', 'uk-border-rounded', 'uk-button-primary'],
  attributes: {
    'data-path': '/',
  },
  parent: containerInf,
});

backToMainBtn.addEventListener('click', (): void => {
  header.style.display = 'flex';
});

export const showErrorPage = (): void => {
  const main = document.querySelector('main');
  main?.append(errorPageWrapper);
};

export { backToMainBtn };
