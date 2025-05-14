import { createEl } from '../../utils/createElement.js';
import { showHeaderComponent } from '../header/headerStructure.js';
import { showBurgerMenu } from '../header/burgerMenu.js';

const mainPageWrapper = createEl({
  tag: 'div',
  classes: ['uk-height-1-1', 'main-page-wrapper'],
});

const showMainPage = (): void => {
  showHeaderComponent();
  showBurgerMenu();
  document.body.append(mainPageWrapper);
};

export { showMainPage };
