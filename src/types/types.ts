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
