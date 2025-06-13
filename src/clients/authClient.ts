import { authUrl, scopes, dataAuth, projectKey } from '../config.js';
import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';
import { TokenResponse } from '../types/types.js';

const body = new URLSearchParams({
  grant_type: 'client_credentials',
  scope: scopes,
}).toString();

export async function fetchToken(
  url: string,
  body: string
): Promise<TokenResponse> {
  return await wrapperTryCatch<TokenResponse>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${dataAuth}`,
    },
    body: body,
  });
}

export async function requestBearerToken() {
  const bearToken: TokenResponse = await fetchToken(
    `${authUrl}/oauth/token`,
    body
  );
  return bearToken.access_token;
}

export async function requestAnonymousToken() {
  const anonymousToken: TokenResponse = await fetchToken(
    `${authUrl}/oauth/${projectKey}/anonymous/token`,
    body
  );
  return anonymousToken.access_token;
}

export async function requestToken() {
  let token: string;
  const loginToken = <string>localStorage.getItem('accessToken');
  if (loginToken) {
    token = loginToken;
  } else {
    token = await requestAnonymousToken();
  }
  return token;
}

export async function requestLoginToken(email: string, password: string) {
  const bodyLogin = new URLSearchParams({
    grant_type: 'password',
    username: email,
    password: password,
    scope: scopes,
  }).toString();

  const loginToken: TokenResponse = await fetchToken(
    `${authUrl}/oauth/${projectKey}/customers/token`,
    bodyLogin
  );
  return loginToken;
}

export async function revokeAccessToken(accessToken: string): Promise<number> {
  const body = new URLSearchParams({
    token: accessToken,
    token_type_hint: 'access_token',
  }).toString();
  const res = await fetch(`${authUrl}/oauth/token/revoke`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${dataAuth}`,
    },
    body,
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to revoke token: ${res.status} — ${errText}`);
  }
  return res.status;
}
