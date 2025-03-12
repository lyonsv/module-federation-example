import React from 'react';
import { createRoot } from 'react-dom/client';
import { Footer } from './Footer';

// Mount function for standalone or integrated use
const mount = (el: HTMLElement, props: any) => {
  const root = createRoot(el);
  root.render(<Footer {...props} />);
  return () => root.unmount();
};

// For standalone development
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#root');
  if (devRoot) {
    mount(devRoot as HTMLElement, {
      theme: {
        primaryColor: '#1a73e8',
        secondaryColor: '#4285f4',
        logoUrl: '/default-logo.png',
        fontFamily: 'Roboto, sans-serif',
        spacing: {
          small: '8px',
          medium: '16px',
          large: '24px'
        }
      }
    });
  }
}

export { mount, Footer }; 