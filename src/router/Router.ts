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
import { paths } from '../constants/paths.js';
import { deleteModalWindow } from '../ui/modalWindow.js';
export default class Router {
  private readonly routes: Record<string, () => void>;
  private static instance: Router | null = null;

  private constructor() {
    if (!document.querySelector('main')) {
      const main = createEl({
        tag: 'main',
        classes: ['uk-height-1-1', 'main-page-wrapper'],
      });
      document.body.appendChild(main);
    }

    this.routes = {
      '/': this.renderMainPage.bind(this),
      '/login': this.renderLogin.bind(this),
      '/registration': this.renderRegistrationPage.bind(this),
      '/catalog': this.renderCatalogPage.bind(this),
      '/detailed-product': this.renderDetailedProductPage.bind(this),
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
    clearDom('main');
    const renderPage = this.routes[path];
    if (path === paths.catalog) {
      deleteModalWindow();
    }
    if (renderPage) {
      renderPage();
    } else {
      header.style.display = 'none';
      showErrorPage();
      console.warn(`Not found page: ${path}`);
    }
  }

  private renderMainPage(): void {}

  private renderLogin(): void {
    showLoginPage();
  }

  private async renderDetailedProductPage(): Promise<void> {
    showProductPage(currentProduct);
  }

  private renderRegistrationPage(): void {
    showRegistrationPage();
  }
  private async renderCatalogPage(): Promise<void> {
    await showCatalogPage();
  }

  private renderUserPage(): void {
    showUserProfilePage();
  }

  private renderAddressPage(): void {
    showUserAddresses();
  }
}
