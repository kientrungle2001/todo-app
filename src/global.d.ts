// src/global.d.ts
export {};

declare global {
  interface Window {
    tinymce: any; // You can replace `any` with the appropriate type if needed
  }
}
