import React, { Suspense, lazy } from 'react';
import { Theme } from '@mfe-poc/shared';
import ErrorBoundary from './ErrorBoundary';
import './App.css';

// Import remote components with proper type annotations
// Using type casting to handle the remote component types
const Header = lazy(() => import('header/Header')
  .then(module => ({ default: module.Header as React.ComponentType<{ theme: Theme }> }))
  .catch(error => {
    console.error('Failed to load Header component:', error);
    return { default: () => <div>Header could not be loaded</div> };
  })
);

const Landing = lazy(() => import('landing/Landing')
  .then(module => ({ default: module.Landing as React.ComponentType<{ theme: Theme }> }))
  .catch(error => {
    console.error('Failed to load Landing component:', error);
    return { default: () => <div>Landing content could not be loaded</div> };
  })
);

const Footer = lazy(() => import('footer/Footer')
  .then(module => ({ default: module.Footer as React.ComponentType<{ theme: Theme }> }))
  .catch(error => {
    console.error('Failed to load Footer component:', error);
    return { default: () => <div>Footer could not be loaded</div> };
  })
);

interface AppProps {
  theme: Theme;
}

const App: React.FC<AppProps> = ({ theme }) => {
  // Create a fallback theme in case the theme is undefined or incomplete
  const safeTheme: Theme = {
    primaryColor: theme?.primaryColor || '#1a73e8',
    secondaryColor: theme?.secondaryColor || '#4285f4',
    logoUrl: theme?.logoUrl || '/default-logo.png',
    fontFamily: theme?.fontFamily || 'Arial, sans-serif',
    spacing: {
      small: theme?.spacing?.small || '8px',
      medium: theme?.spacing?.medium || '16px',
      large: theme?.spacing?.large || '24px'
    }
  };
  
  return (
    <div className="app">
      <ErrorBoundary fallback={<div className="error-fallback">Header could not be loaded</div>}>
        <Suspense fallback={<div>Loading Header...</div>}>
          <Header theme={safeTheme} />
        </Suspense>
      </ErrorBoundary>
      
      <main className="main-content">
        <ErrorBoundary fallback={<div className="error-fallback">Content could not be loaded</div>}>
          <Suspense fallback={<div>Loading Content...</div>}>
            <Landing theme={safeTheme} />
          </Suspense>
        </ErrorBoundary>
      </main>
      
      <ErrorBoundary fallback={<div className="error-fallback">Footer could not be loaded</div>}>
        <Suspense fallback={<div>Loading Footer...</div>}>
          <Footer theme={safeTheme} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default App; 