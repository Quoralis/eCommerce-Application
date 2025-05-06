import { typeCreateElOptions } from '../../types/types';

export const createEl = (options: Partial<typeCreateElOptions>) => {
  const {
    tag = '',
    classes = [],
    text = '',
    keyAtrribute = [],
    valueAtrribute = [],
  } = options;
  const el = document.createElement(tag);
  el.textContent = text;
  if (classes.length > 0) {
    el.classList.add(...classes);
  }
  for (let i = 0; i < keyAtrribute.length; i++) {
    el.setAttribute(keyAtrribute[i], valueAtrribute[i]);
  }
  return el;
};
