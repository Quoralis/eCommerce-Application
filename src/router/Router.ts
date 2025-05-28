import { showLoginPage } from '../pages/loginPage/loginStructure.js';
import { clearDom } from '../utils/clearDom.js';
import { createEl } from '../utils/createElement.js';
import { showRegistrationPage } from '../pages/registrationPage/registration.js';
import { showErrorPage } from '../pages/errorPage/errorPageStructure.js';
import { header } from '../pages/header/headerStructure.js';
import { showCatalogPage } from '../pages/catalogPage/showCatalogPage.js';
import { showProductPage } from '../pages/detailedProductPage/showProductPage.js';
import { showUserProfilePage as showUserProfilePage } from '../pages/userProfilePage/userProfile.js';
import { showUserAddresses } from '../pages/userProfilePage/userAddresses.js';
import { currentProduct } from '../ui/productCard.js';
import { handleCategoryClick } from '../ui/handleCategoryClick.js';
import { openPage } from '../pages/openPage.js';

export default class Router {
  private readonly routes: Record<string, () => void>;
  private static instance: Router | null = null;

  private constructor() {
    document.body.addEventListener('click', openPage);
    if (!document.querySelector('main')) {
      const main = createEl({
        tag: 'main',
        classes: ['uk-height-1-1', 'main-page-wrapper'],
      });
      document.body.appendChild(main);
      main.addEventListener('click', async (e) => {
        const li = (e.target as Element).closest<HTMLLIElement>(
          'li[data-category-key]'
        );
        if (li) {
          await handleCategoryClick(e as MouseEvent);
        }
      });
    }

    this.routes = {
      '/': this.renderMainPage.bind(this),
      '/login': this.renderLogin.bind(this),
      '/registration': this.renderRegistrationPage.bind(this),
      '/catalog': this.renderCatalogPage.bind(this),
      '/catalog/macbooks': this.renderCategories.bind(this),
      '/catalog/iphones': this.renderCategories.bind(this),
      '/catalog/airpods': this.renderCategories.bind(this),
      '/catalog/accessories': this.renderCategories.bind(this),
      '/catalog/applewatch': this.renderCategories.bind(this),
      '/catalog/detailed-product': this.renderDetailedProductPage.bind(this),
      '/user': this.renderUserPage.bind(this),
      '/user/addresses': this.renderAddressPage.bind(this),
    };
    window.addEventListener('popstate', () => {
      this.render(window.location.pathname);
    });
    sessionStorage.clear();
  }

  public static getInstance(): Router {
    if (!Router.instance) {
      Router.instance = new Router();
    }
    return Router.instance;
  }

  public initialRender(): void {
    this.render(window.location.pathname);
  }

  public navigate(path: string): void {
    history.pushState({}, '', path);
    this.render(path);
  }

  private render(path: string): void {
    const renderPage = this.routes[path];
    if (renderPage) {
      renderPage();
    } else {
      header.style.display = 'none';
      showErrorPage();
      console.warn(`Not found page: ${path}`);
    }
  }

  private renderMainPage(): void {
    clearDom('main-page-wrapper');
  }

  private renderLogin(): void {
    clearDom('main-page-wrapper');

    showLoginPage();
  }

  private async renderDetailedProductPage(): Promise<void> {
    clearDom('main-page-wrapper');
    await showProductPage(currentProduct);
    // }
  }

  private renderRegistrationPage(): void {
    clearDom('main-page-wrapper');

    showRegistrationPage();
  }
  private async renderCatalogPage(): Promise<void> {
    clearDom('main-page-wrapper');
    await showCatalogPage();
  }

  private renderUserPage(): void {
    clearDom('main-page-wrapper');
    showUserProfilePage();
  }

  private renderAddressPage(): void {
    clearDom('main-page-wrapper');
    showUserAddresses();
  }

  private async renderCategories(): Promise<void> {
    clearDom('product-container');
  }
}
