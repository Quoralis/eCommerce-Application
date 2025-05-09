import { authUrl, scopes, dataAuth } from '../config.js';
import { wrapperTryCatch } from '../utils/wrapperTryCatch.js';
import { TokenResponse } from '../types/types.js';

export let tokenCache = { token: '', exp: 0 };

export async function getToken(): Promise<string> {
  const now = Date.now();
  // Если токен ещё есть, отдадим кеш
  if (tokenCache.token && now < tokenCache.exp) {
    return tokenCache.token;
  }
  // формируем правильную строку
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    scope: scopes,
  });

  const data = await wrapperTryCatch<TokenResponse>(`${authUrl}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${dataAuth}`,
    },
    body: body.toString(),
  });

  // кешируем токен
  tokenCache = {
    token: data.access_token,
    exp: now + data.expires_in * 1000,
  };
  return data.access_token;
}
