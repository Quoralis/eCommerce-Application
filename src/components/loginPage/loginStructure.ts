import { createEl } from '../../utils/createElement';

const loginPageWrapper = createEl({
  tag: 'div',
  classes: [
    'login-page-wrapper',
    'uk-flex',
    'uk-height-1-1',
    'uk-flex-middle',
    'uk-flex-center',
  ],
  parent: document.body,
});

const cardLogin = createEl({
  tag: 'div',
  classes: ['uk-card', 'uk-height-large', 'uk-width-large', 'uk-card-default'],
  parent: loginPageWrapper,
});

createEl({
  tag: 'div',
  parent: cardLogin,
});
