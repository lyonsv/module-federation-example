import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { getInitialTheme } from './utils/themeUtils';

declare global {
  interface Window {
    __INITIAL_THEME__: any;
  }
}

const mount = () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = createRoot(rootElement);
    
    // Get theme based on hostname or from initial server-provided theme
    const theme = getInitialTheme();
    console.log('Rendering app with theme:', theme);
    
    root.render(<App theme={theme} />);
  }
};

mount(); 