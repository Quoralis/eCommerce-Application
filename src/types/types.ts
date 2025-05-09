export interface typeCreateElOptions {
  tag: string;
  classes?: string[];
  text?: string;
  attributes?: Record<string, string>;
  parent?: HTMLElement;
}

interface IInputOptions {
  placeholder: string;
  type: string;
}

export type CreateInputOptions = Omit<typeCreateElOptions, 'tag'> &
  Partial<IInputOptions>;
