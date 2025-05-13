export interface typeCreateElOptions {
  tag: string;
  classes?: string[];
  text?: string;
  attributes?: Record<string, string>;
  parent?: HTMLElement;
}

interface IValidationRule {
  regExp: RegExp;
  errMessage: string;
}

export interface IRegValidationRules {
  [key: string]: IValidationRule;
}
