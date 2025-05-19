import { requestLoginToken, revokeAccessToken } from '../clients/authClient.js';
import { RegistrationLoginData } from '../types/types.js';
import { registerCustomer } from '../clients/customerClient.js';
import { parseError } from '../utils/parseError.js';
import { updateAuthUI } from '../utils/auth.js';

//cache token
const tokenCache = {
  accessToken: '',
  refreshToken: '',
  timeEndTokenMs: 0,
};

export async function login(data: RegistrationLoginData) {
  try {
    const response = await requestLoginToken(
      data.userData.email,
      data.userData.password
    );
    tokenCache.accessToken = response.access_token;
    tokenCache.refreshToken = response.refresh_token;
    tokenCache.timeEndTokenMs = Date.now() + response.expires_in * 1000; // в мс переводим
    return tokenCache.accessToken;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
    }
  }
}

export async function registerAndLogin(data: RegistrationLoginData) {
  try {
    const customerID = await registerCustomer(data);
    const accessToken = await login(data);
    updateAuthUI();
    return { customerID, accessToken };
  } catch (err) {
    if (err instanceof Error) {
      const errorParse = parseError(err.message);
      console.error('Registration/Login failed', errorParse.errors[0].message); //  сделать вывод на страницу
    }
    throw err;
  }
}

export async function logOut(): Promise<void> {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) return;
  const statusRevokeToken: number | undefined =
    await revokeAccessToken(accessToken);
  if (statusRevokeToken === 200) {
    localStorage.removeItem('accessToken');
    updateAuthUI();
  }
}
