import { typeCreateElOptions } from '../../types/types';

export const createEl = (options: typeCreateElOptions): HTMLElement => {
  const { tag = '', classes = [], text = '', attribute = {}, parent } = options;
  const el = document.createElement(tag);
  el.textContent = text;
  if (classes.length > 0) {
    el.classList.add(...classes);
  }
  for (const key in attribute) {
    el.setAttribute(key, attribute[key]);
  }
  if (parent) {
    parent.append(el);
  }
  return el;
};
