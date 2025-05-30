import Router from '../router/Router.js';

export async function openPage(e: MouseEvent): Promise<void> {
  const target = e.target as HTMLElement;

  const linkEl = target.closest('[data-path]');
  if (linkEl instanceof HTMLElement) {
    const path = linkEl.getAttribute('data-path');
    if (path) {
      e.preventDefault();
      await Router.getInstance().navigate(path);
      return;
    }
  }

  const categoryEl = target.closest('li[data-category-key]');
  if (categoryEl instanceof HTMLElement) {
    const categoryKey = categoryEl.getAttribute('data-category-key');
    const path = categoryKey ? `/catalog/${categoryKey}` : '/catalog';
    e.preventDefault();
    await Router.getInstance().navigate(path);
    return;
  }

  const productCard = target.closest('article[data-product-key]');
  if (productCard instanceof HTMLElement) {
    const productId = productCard.getAttribute('data-product-key');
    if (productId) {
      const path = `/catalog/product/${productId}`;
      e.preventDefault();
      await Router.getInstance().navigate(path);
    }
  }
}
