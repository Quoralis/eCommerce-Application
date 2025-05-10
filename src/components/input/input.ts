import { CreateInputOptions } from '../../types/types';
import { createEl } from '../../utils/createElement';

export const createInput = (options: CreateInputOptions) => {
  const input = createEl({
    tag: 'input',
    ...options,
    classes: options.classes ?? ['uk-input'],
  });

  const { type = 'text', placeholder } = options;

  if (input instanceof HTMLInputElement) {
    if (type) {
      input.type = type;
    }

    if (placeholder) {
      input.placeholder = placeholder;
    }
  }

  return input;
};
