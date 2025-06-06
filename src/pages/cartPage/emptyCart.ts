import { createEl } from '../../utils/createElement.js';

export const emptyCart = (parent: HTMLElement): void => {
  createEl({
    tag: 'h4',
    text: "here are no products yet, don't you want to buy something?",
    parent: parent,
  });

  createEl({
    tag: 'a',
    classes: ['el-nav'],
    attributes: {
      'data-path': '/catalog',
    },
    parent: parent,
  });
};
