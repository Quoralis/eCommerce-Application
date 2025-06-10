import { createEl } from '../utils/createElement.js';

export function renderPagination(
  parent: HTMLElement,
  products: number,
  currentPage: number,
  onPageClick: (page: number) => void
) {
  const countPages = Math.ceil(products / 8);
  parent.querySelector('.pagination-container')?.remove();
  const nav = createEl({
    tag: 'nav',
    classes: ['pagination-container'],
    parent,
  });

  const backBtn = createEl({
    tag: 'button',
    classes: [
      'uk-width-1-1',
      'uk-button',
      'uk-border-rounded',
      'uk-button-primary',
      'btn-back',
    ],
    attributes: { disabled: 'true' },
    text: '<',
    parent: nav,
  });

  backBtn.addEventListener('click', () => {
    if (currentPage > 1) onPageClick(currentPage - 1);
  });

  for (let i = 1; i <= countPages; i++) {
    const pageBtn = createEl({
      tag: 'button',
      classes: [
        'uk-width-1-1',
        'uk-button',
        'uk-border-rounded',
        'uk-button-primary',
        'pages',
      ],
    });
    pageBtn.textContent = i.toString();

    if (i === currentPage) {
      pageBtn.classList.add('active');
    }

    pageBtn.addEventListener('click', () => onPageClick(i));

    nav.appendChild(pageBtn);
  }

  const nextBtn = createEl({
    tag: 'button',
    classes: [
      'uk-width-1-1',
      'uk-button',
      'uk-border-rounded',
      'uk-button-primary',
      'btn-next',
    ],
    parent: nav,
    text: '>',
  });
  if (currentPage <= 1) {
    backBtn.setAttribute('disabled', 'true');
  } else {
    backBtn.removeAttribute('disabled');
  }
  nextBtn.addEventListener('click', () => {
    if (currentPage < countPages) onPageClick(currentPage + 1);
  });
}
