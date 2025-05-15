import { showLoginPage } from '../components/loginPage/loginStructure.js';
import { showMainPage } from '../components/mainPage/mainStructure.js';
import { clearDom } from '../utils/clearDom.js';

export default class Router {
  private readonly routes: Record<string, () => void>;
  private static instance: Router | null = null;

  private constructor() {
    this.routes = {
      '/': this.renderMainPage,
      '/login': this.renderLogin,
      '/registration': this.renderRegistrationPage,
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

  public navigate(path: string): void {
    history.pushState({}, '', path);
    this.render(path);
  }

  private render(path: string): void {
    clearDom('main');
    const renderPage = this.routes[path];
    if (renderPage) {
      renderPage();
    } else {
      console.warn(`Not found page: ${path}`);
    }

    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const pathLoginAuth = ['/login', '/registration'];
    if (pathLoginAuth.includes(path)) {
      header?.classList.add('hidden');
      footer?.classList.add('hidden');
    } else {
      header?.classList.remove('hidden');
      footer?.classList.remove('hidden');
    }
  }

  private renderMainPage(): void {
    showMainPage();
  }

  private renderLogin(): void {
    showLoginPage();
  }

  private renderRegistrationPage(): void {}
}
