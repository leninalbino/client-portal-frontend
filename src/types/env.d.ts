/// <reference types="vite/client" />

// 🔒 Tipos seguros para variables de entorno
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  // Agrega más variables según necesites
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}