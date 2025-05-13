interface ImportMetaEnv {
  readonly VITE_CTP_PROJECT_KEY: string;
  readonly VITE_CTP_CLIENT_ID: string;
  readonly VITE_CTP_CLIENT_SECRET: string;
  readonly VITE_CTP_AUTH_URL: string;
  readonly VITE_CTP_API_URL: string;
  readonly VITE_CTP_SCOPES: string;
  // добавьте здесь другие VITE_* переменные, если нужно
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
