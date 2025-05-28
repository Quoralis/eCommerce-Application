export interface typeCreateElOptions<K extends keyof HTMLElementTagNameMap> {
  tag: K;
  classes?: string[];
  text?: string;
  attributes?: Record<string, string>;
  parent?: HTMLElement;
  onClick?: (e: Event) => void;
}

declare global {
  interface HTMLElementTagNameMap {
    'dotlottie-player': HTMLElement;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'dotlottie-player': HTMLElement;
  }
}

export interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  status?: number;
}

export interface UserFormValues {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  addresses?: BaseAddress[];
}

interface BaseAddress {
  city: string;
  country: string;
  postalCode: string;
  streetName: string;
}

export interface RegistrationLoginData {
  userData: UserFormValues;
  bearerToken?: string;
  defShipIdx?: number;
  defBillIdx?: number;
}

interface IValidationRule {
  regExp: RegExp;
  errMessage: string;
}

export interface IRegValidationRules {
  [key: string]: IValidationRule;
}

export type PartialBaseAddress = Partial<BaseAddress> & {
  [key: string]: string | undefined;
};

export type ModifiedUserFormValues = Omit<UserFormValues, 'addresses'> & {
  [key: string]: string | number | PartialBaseAddress[];
};

export interface Customer {
  id: string;
  version?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  addresses?: PartialBaseAddress[];
}

export interface CustomerSearchResponse {
  results: Customer[];
}

export interface ProductsResponse {
  count: number;
  limit: number;
  results: [CurrentProduct];
  total: number;
}

export interface CurrentProduct {
  name: {
    en: string;
  };
  description: {
    en: string;
  };
  key: string;
  masterVariant: {
    prices: [
      {
        value: {
          centAmount: number;
        };
        discounted?: {
          value: {
            centAmount: number;
          };
        };
      },
    ];
    images?: [
      {
        url: string;
      },
    ];
    key: string;
  };
}

export interface DisplayProduct {
  productName: string;
  imageUrl: string;
  description: string;
  productKey: string;
  price: number;
  discountedPrice?: number;
}

export interface Categories {
  count: number;
  limit: number;
  results: [DataCategory];
  total: number;
}

interface DataCategory {
  id: string;
  key: string;
  name: { en: string };
}
