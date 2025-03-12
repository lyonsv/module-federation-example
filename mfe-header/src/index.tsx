import React from 'react';
import { createRoot } from 'react-dom/client';
import { Header } from './Header';
import { Theme } from '@mfe-poc/shared';

// For standalone development
if (process.env.NODE_ENV === 'development') {
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    const defaultTheme: Theme = {
      primaryColor: '#1976d2',
      secondaryColor: '#dc004e',
      logoUrl: '/logo.svg',
      fontFamily: 'Arial, sans-serif',
      spacing: {
        small: '8px',
        medium: '16px',
        large: '24px',
      }
    };
    
    root.render(<Header theme={defaultTheme} />);
  }
}

// Export the component for module federation
export { Header };
// Export the type for better type support
export type { HeaderProps } from './Header'; 