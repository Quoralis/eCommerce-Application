import { typeCreateElOptions } from '../types/types.js';

export const createEl = (options: typeCreateElOptions): HTMLElement => {
  const {
    tag = '',
    classes = [],
    text = '',
    attributes = {},
    parent,
  } = options;
  const el = document.createElement(tag);
  el.textContent = text;
  if (classes.length > 0) {
    el.classList.add(...classes);
  }
  for (const key in attributes) {
    el.setAttribute(key, attributes[key]);
  }
  if (parent) {
    parent.append(el);
  }
  return el;
};
