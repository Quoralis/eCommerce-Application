export interface typeCreateElOptions {
  tag: string;
  classes?: string[];
  text?: string;
  attributes?: Record<string, string>;
  parent?: HTMLElement;
}

export interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
}

export interface UserFormValues {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  address?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

interface IValidationRule {
  regExp: RegExp;
  errMessage: string;
}

export interface IRegValidationRules {
  [key: string]: IValidationRule;
}
