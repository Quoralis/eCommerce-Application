import { createEl } from '../../utils/createElement.js';
import { showHeaderComponent } from '../header/headerStructure.js';
import { showBurgerMenu } from '../header/burgerMenu.js';

showHeaderComponent();
showBurgerMenu();

const mainPageWrapper = createEl({
  tag: 'div',
  classes: ['uk-height-1-1', 'main-page-wrapper'],
});

const showMainPage = (): void => {
  document.body.append(mainPageWrapper);
};

export { showMainPage };
