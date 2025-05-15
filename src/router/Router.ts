import { showLoginPage } from '../components/loginPage/loginStructure.js';
import { clearDom } from '../utils/clearDom.js';
import { createEl } from '../utils/createElement.js';

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
    if (renderPage) {
      renderPage();
    } else {
      console.warn(`Not found page: ${path}`);
    }
  }

  private renderMainPage(): void {}

  private renderLogin(): void {
    showLoginPage();
  }

  private renderRegistrationPage(): void {}
}
