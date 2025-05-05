import fetch from 'node-fetch';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder, MiddlewareResponse } from '@commercetools/ts-client';
import 'dotenv/config';
import type {
  Middleware,
  AuthMiddlewareOptions,
  LoggerMiddlewareOptions,
} from '@commercetools/ts-client';

// --- Configuration ---
const projectKey = process.env.CTP_PROJECT_KEY;
if (!projectKey) throw new Error('There is not  CTP_AUTH_URL in .env');
const clientId = process.env.CTP_CLIENT_ID;
if (!clientId) throw new Error('There is not  CTP_CLIENT_ID in .env');
const clientSecret = process.env.CTP_CLIENT_SECRET;
if (!clientSecret) throw new Error('There is not  CTP_CLIENT_SECRET in .env');

const authUrl =
  process.env.CTP_AUTH_URL ?? 'https://auth.europe-west1.gcp.commercetools.com'; // default value
const apiUrl =
  process.env.CTP_API_URL ?? 'https://api.europe-west1.gcp.commercetools.com'; // default value
const scopes = process.env.CTP_SCOPES!.trim().split(',');

// Function for custom header middleware
function createCustomHeaderMiddleware(): Middleware {
  //Middleware  описан в  comm. tools docs
  return (next) => (request) => {
    return next({
      ...request,
      headers: {
        ...request.headers,
        'accept-language': 'en-AU',
      },
    });
  };
}

// Function for custom logger middleware
const loggerMiddlewareOptions: LoggerMiddlewareOptions = {
  loggerFn: (response: MiddlewareResponse) => {
    console.log('Response is: ', response);
  },
};

// Auth Middleware Options
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: authUrl,
  projectKey: projectKey,
  credentials: { clientId, clientSecret },
  scopes: scopes,
  httpClient: fetch,
};

// Http Middleware Options
const httpMiddlewareOptions = {
  host: apiUrl,
  includeResponseHeaders: true,
  maskSensitiveHeaderData: false,
  includeOriginalRequest: true,
  includeRequestInErrorResponse: true,
  enableRetry: true,
  retryConfig: {
    maxRetries: 3,
    retryDelay: 200,
    backoff: false,
    retryCodes: [500, 503],
  },
  httpClient: fetch,
};

//Correlation ID Middleware Options
const correlationIdMiddlewareOptions = {
  generate: () => 'cd260fc9-c575-4ba3-8789-cc4c9980ee4e',
};

// --- Client Creation ---
export const client = new ClientBuilder()
  .withProjectKey(projectKey!)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withLoggerMiddleware(loggerMiddlewareOptions)
  .withCorrelationIdMiddleware(correlationIdMiddlewareOptions)
  .withMiddleware(createCustomHeaderMiddleware())
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();
// --- API Root Creation ---
const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
  projectKey,
});

export { apiRoot };
