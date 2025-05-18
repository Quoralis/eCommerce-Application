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
  [key: string]: string | PartialBaseAddress[];
};

export interface Customer {
  id: string;
  version?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
}

export interface CustomerSearchResponse {
  results: Customer[];
}
