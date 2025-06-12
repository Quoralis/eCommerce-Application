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
  billingAddresses?: number[];
  shippingAddresses?: number[];
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
  shippingAddressIds?: string[];
  billingAddressIds?: string[];
  defaultShippingAddressId?: string;
  defaultBillingAddressId?: string;
  password?: string;
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
  id: string;
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

export interface productCart {
  id: string;
  productKey: string;
  productId: string;
  name: {
    en: string;
  };
  variant: {
    images: [
      {
        url: string;
      },
    ];
  };
  price: {
    discounted?: {
      value: {
        centAmount: number;
      };
    };
    value: {
      centAmount: number;
    };
  };
  totalPrice: {
    centAmount: number;
  };
  quantity?: number;
  lineItems?: productCart[];
}

export interface DisplayProduct {
  productName: string;
  imageUrl: string;
  description: string;
  productKey: string;
  productId?: string;
  price: number;
  discountedPrice?: number;
  totalPrice?: number;
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

export interface updateCustomer {
  version?: number;
  actions: Array<{
    action: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    dateOfBirth?: string;
  }>;
}

export interface updateCustomerPasswordType {
  id: string;
  version: number;
  currentPassword: string;
  newPassword: string;
}

export interface CustomerAddress {
  country: string | undefined;
  city?: string | undefined;
  streetName?: string | undefined;
  postalCode?: string | undefined;
}

export interface AddressUpdate {
  version: number | undefined;
  actions: [
    {
      action: string;
      addressId?: string | undefined;
      address: CustomerAddress;
    },
  ];
}

interface Action {
  action: string;
  addressId: string | undefined;
}

export interface AddressModify {
  version: number | undefined;
  actions: Action[];
}

export interface MyCart {
  currency: string;
}

export interface responseMyCart {
  id: string;
  version: number;
  lineItems: [productCart];
}

export interface updateMyCart {
  version: number;
  actions: Array<{
    action: string;
    distributionChannel: {
      typeId: string;
      id: string;
    };
    productId?: string;
    lineItemId?: string;
    variantId?: number;
    currency?: string;
    productPriceMode?: string;
    country?: string;
    actionIndex?: number;
    quantity?: number;
  }>;
}

export interface IChangeQuantity {
  version: number;
  actions: Array<{
    action: string;
    lineItemId: string | undefined;
    quantity: number;
  }>;
}

export interface ICart {
  [key: string]:
    | string
    | number
    | boolean
    | ICart
    | productCart[]
    | []
    | undefined;
  lineItems: productCart[];
}
