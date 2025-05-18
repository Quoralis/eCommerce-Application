import Router from '../router/Router.js';

export const openPage = (path: string): void => {
  const router = Router.getInstance();
  router.navigate(path);
};
