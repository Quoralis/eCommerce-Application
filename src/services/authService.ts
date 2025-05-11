import { requestLoginToken } from '../clients/authClient.js';
import { UserFormValues } from '../types/types.js';

//cache token
const tokenCache = {
  accessToken: '',
  refreshToken: '',
  timeEndTokenMs: 0,
};

export async function login(dataUser: UserFormValues) {
  const response = await requestLoginToken(dataUser.email, dataUser.password);
  tokenCache.accessToken = response.access_token;
  tokenCache.refreshToken = response.refresh_token;
  tokenCache.timeEndTokenMs = Date.now() + response.expires_in * 1000; // в мс переводим
  console.log('Authentication success,Token: ', response.access_token);
  console.log('login response', response);
  return tokenCache.accessToken;
}
