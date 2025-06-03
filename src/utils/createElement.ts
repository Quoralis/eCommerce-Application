import { typeCreateElOptions } from '../types/types.js';

export const createEl = <K extends keyof HTMLElementTagNameMap>(
  options: typeCreateElOptions<K>
): HTMLElementTagNameMap[K] => {
  const {
    tag,
    classes = [],
    text = '',
    attributes = {},
    onClick,
    parent,
  } = options;
  const el = document.createElement(tag) as HTMLElementTagNameMap[K];
  el.textContent = text;
  if (classes.length > 0) {
    el.classList.add(...classes);
  }
  for (const key in attributes) {
    el.setAttribute(key, attributes[key]);
  }
  if (onClick) {
    el.addEventListener('click', onClick);
  }
  if (parent) {
    parent.append(el);
  }
  return el;
};
