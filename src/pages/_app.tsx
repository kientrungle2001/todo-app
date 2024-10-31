// src/pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'select2/dist/css/select2.min.css';
import 'select2/dist/js/select2.min.js';
import $ from 'jquery';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Ensure jQuery and Select2 are available globally
    if (typeof window !== 'undefined') {
      require('select2');
    }
  }, []);
  return (
      <Component {...pageProps} />
  );
}
