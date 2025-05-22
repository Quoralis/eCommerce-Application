import { createEl } from '../utils/createElement.js';
import { renderProductCard } from './productCard.js';

export function renderProductLContainer(parent: HTMLElement): void {
  const section = createEl({
    tag: 'section',
    classes: ['product-container'],
    parent: parent,
  });
  renderProductCard(
    section,
    'MacBook',
    '../assets/images/image.png',
    'NoteBook',
    'mac',
    '999$'
  );
  renderProductCard(
    section,
    'MacBook',
    '../assets/images/image.png',
    'NoteBook',
    'mac',
    '999$'
  );
  renderProductCard(
    section,
    'MacBook',
    '../assets/images/image.png',
    'NoteBook',
    'mac',
    '999$'
  );
  renderProductCard(
    section,
    'MacBook',
    '../assets/images/image.png',
    'NoteBook',
    'mac',
    '999$'
  );
  renderProductCard(
    section,
    'MacBook',
    '../assets/images/image.png',
    'NoteBook',
    'mac',
    '999$'
  );
  renderProductCard(
    section,
    'MacBook',
    '../assets/images/image.png',
    'NoteBook',
    'mac',
    '999$'
  );
  renderProductCard(
    section,
    'MacBook',
    '../assets/images/image.png',
    'NoteBook',
    'mac',
    '999$'
  );
  renderProductCard(
    section,
    'MacBook',
    '../assets/images/image.png',
    'NoteBook',
    'mac',
    '999$'
  );
}
