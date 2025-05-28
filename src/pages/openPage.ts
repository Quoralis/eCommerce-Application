import Router from '../router/Router.js';

export const openPage = (e: Event): void => {
  const clicked = e.target as Element;
  const link = clicked.closest<HTMLElement>('[data-path]');

  if (!link) return;

  const route = link.dataset.path!;
  Router.getInstance().navigate(route);
};
