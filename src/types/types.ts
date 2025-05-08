export interface typeCreateElOptions {
  tag: string;
  classes?: string[];
  text?: string;
  keyAttribute?: string[];
  valueAttribute?: string[];
  attribute?: Record<string, string>;
  parent?: HTMLElement;
}
export interface TokenResponse {
  access_token: string;
  expires_in: number;
}
