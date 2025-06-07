import { showLoginPage } from '../pages/loginPage/loginStructure.js';
import { clearDom } from '../utils/clearDom.js';
import { createEl } from '../utils/createElement.js';
import { showRegistrationPage } from '../pages/registrationPage/registration.js';
import { showErrorPage } from '../pages/errorPage/errorPageStructure.js';
import { header } from '../pages/header/headerStructure.js';
import { showCatalogPage } from '../pages/catalogPage/showCatalogPage.js';
import { showProductPage } from '../pages/detailedProductPage/showProductPage.js';
import { showUserProfilePage as showUserProfilePage } from '../pages/userProfilePage/userProfile.js';
import { showUserAddresses } from '../pages/userAddressPage/userAddresses.js';
import { openPage } from '../pages/openPage.js';
import { renderProductList } from '../ui/renderProductList.js';
import { renderProductsInCategory } from '../ui/renderProductsInCategory.js';
import { renderBreadcrumb } from '../ui/renderBreadcrumb.js';
import { paths } from '../constants/paths.js';
import { deleteModalWindow } from '../ui/modalWindow.js';
import { showAboutPage } from '../pages/aboutPage/showAboutPage.js';
import { showCartPage } from '../pages/cartPage/showCartPage.js';
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
    }

    this.routes = {
      '/': this.renderMainPage.bind(this),
      '/login': this.renderLogin.bind(this),
      '/registration': this.renderRegistrationPage.bind(this),
      '/catalog': this.renderCatalogPage.bind(this),
      '/user': this.renderUserPage.bind(this),
      '/user/addresses': this.renderAddressPage.bind(this),
      '/about': this.renderAboutPage.bind(this),
      '/cart': this.renderCartPage.bind(this),
    };
    window.addEventListener('popstate', async () => {
      await this.render(window.location.pathname);
    });
    sessionStorage.clear();
  }

  public static getInstance(): Router {
    if (!Router.instance) {
      Router.instance = new Router();
    }
    return Router.instance;
  }

  public async initialRender(): Promise<void> {
    await this.render(window.location.pathname);
  }

  public async navigate(path: string): Promise<void> {
    history.pushState({}, '', path);
    await this.render(path);
  }

  private async render(path: string): Promise<void> {
    const arrPath = path.split('/').filter(Boolean); // удаляем пустые элементы
    const [root, category, id] = arrPath;

    if (root === 'catalog' && category && id) {
      await this.renderDetailedProductPage(id, path);
      return;
    }
    if (root === 'catalog' && category) {
      await this.renderCategories(category);
      return;
    }

    const renderPage = this.routes[path];
    if (path === paths.catalog) {
      deleteModalWindow();
    }
    if (path === paths.cart) {
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

  private renderMainPage(): void {
    clearDom('main-page-wrapper');
  }

  private renderLogin(): void {
    clearDom('main-page-wrapper');

    showLoginPage();
  }

  private async renderDetailedProductPage(
    currentProduct: string,
    path: string
  ): Promise<void> {
    clearDom('main-page-wrapper');
    await showProductPage(currentProduct);
    renderBreadcrumb(path);
  }

  private renderRegistrationPage(): void {
    clearDom('main-page-wrapper');

    showRegistrationPage();
  }

  private async renderCatalogPage(): Promise<void> {
    clearDom('main-page-wrapper');
    await showCatalogPage();
    renderBreadcrumb('catalog');
  }

  private renderUserPage(): void {
    clearDom('main-page-wrapper');
    showUserProfilePage();
  }

  private renderAddressPage(): void {
    clearDom('main-page-wrapper');
    showUserAddresses();
  }

  private renderAboutPage(): void {
    clearDom('main-page-wrapper');
    showAboutPage();
  }

  private renderCartPage(): void {
    clearDom('main-page-wrapper');
    showCartPage();
  }

  private async renderCategories(category: string): Promise<void> {
    clearDom('main-page-wrapper');
    await showCatalogPage();
    const container = document.querySelector('.product-container');
    if (!(container instanceof HTMLElement)) return;
    renderBreadcrumb(`/catalog/${category}`);
    container.innerHTML = '';

    const listItems = document.querySelectorAll('.categories-list li');
    listItems.forEach((li) => {
      li.classList.remove('active__category');
      if (li.getAttribute('data-category-key') === category) {
        li.classList.add('active__category');
      }
    });

    if (category) {
      await renderProductsInCategory(category);
    } else {
      await renderProductList(container);
    }
  }
}
