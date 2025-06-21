import { createEl } from '../utils/createElement.js';
export function renderPagination(
  parent: HTMLElement,
  totalProducts: number,
  currentPage: number = 1,
  onPageClick: (page: number) => void,
  pageSize: number = 8
) {
  const totalPages = Math.ceil(totalProducts / pageSize);
  parent.querySelector('.pagination-container')?.remove();

  if (totalPages <= 1) return;

  const nav = createEl({
    tag: 'nav',
    classes: ['pagination-container'],
    parent,
  });

  const baseBtnClasses = [
    'uk-width-1-1',
    'uk-button',
    'uk-border-rounded',
    'uk-button-primary',
  ];

  const backBtn = createEl({
    tag: 'button',
    classes: [...baseBtnClasses, 'btn-back'],
    text: '<',
    parent: nav,
  });

  backBtn.disabled = currentPage <= 1;
  backBtn.addEventListener('click', async () => {
    if (currentPage > 1) onPageClick(currentPage - 1);
  });

  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = createEl({
      tag: 'button',
      classes: [...baseBtnClasses, 'pages'],
      text: i.toString(),
      parent: nav,
    });

    if (i === currentPage) {
      pageBtn.classList.add('active');
      pageBtn.disabled = true;
    }

    pageBtn.addEventListener('click', () => onPageClick(i));
  }

  const nextBtn = createEl({
    tag: 'button',
    classes: [...baseBtnClasses, 'btn-next'],
    text: '>',
    parent: nav,
  });

  nextBtn.disabled = currentPage >= totalPages;
  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) onPageClick(currentPage + 1);
  });
}
