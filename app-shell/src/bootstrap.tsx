import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

declare global {
  interface Window {
    __INITIAL_THEME__: any;
  }
}

const mount = () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App theme={window.__INITIAL_THEME__} />);
  }
};

mount(); 