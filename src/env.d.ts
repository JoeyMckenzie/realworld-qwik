/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_USER_TOKEN_COOKIE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
