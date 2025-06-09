import { createEl } from '../utils/createElement.js';

export function renderPagination(
  parent: HTMLElement,
  pages: number,
  currentPage: number,
  onPageClick: (page: number) => void
) {
  const nav = createEl({
    tag: 'nav',
    classes: ['pagination-container'],
    parent,
  });

  const backBtn = createEl({
    tag: 'div',
    classes: ['btn-back'],
    parent: nav,
  });

  backBtn.addEventListener('click', () => {
    if (currentPage > 1) onPageClick(currentPage - 1);
  });

  for (let i = 1; i <= pages; i++) {
    const pageBtn = createEl({
      tag: 'button',
      classes: ['pages'],
    });
    pageBtn.textContent = i.toString();

    if (i === currentPage) {
      pageBtn.classList.add('active');
    }

    pageBtn.addEventListener('click', () => onPageClick(i));

    nav.appendChild(pageBtn);
  }

  const nextBtn = createEl({
    tag: 'div',
    classes: ['btn-next'],
    parent: nav,
  });

  nextBtn.addEventListener('click', () => {
    if (currentPage < pages) onPageClick(currentPage + 1);
  });
}
