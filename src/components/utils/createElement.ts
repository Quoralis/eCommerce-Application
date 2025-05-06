import { typeCreateElOptions } from '../../types/types';

export const createEl = (
  options: Partial<typeCreateElOptions>
): HTMLElement => {
  const {
    tag = '',
    classes = [],
    text = '',
    keyAttribute = [],
    valueAttribute = [],
    parent,
  } = options;
  const el = document.createElement(tag);
  el.textContent = text;
  if (classes.length > 0) {
    el.classList.add(...classes);
  }
  for (let i = 0; i < keyAttribute.length; i++) {
    el.setAttribute(keyAttribute[i], valueAttribute[i]);
  }
  if (parent) {
    parent.append(el);
  }
  return el;
};
