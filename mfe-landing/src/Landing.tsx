import React from 'react';
import { Theme } from '@mfe-poc/shared';
import styles from './Landing.module.css';

// Explicitly define the component's props interface
export interface LandingProps {
  theme: Theme;
}

export const Landing: React.FC<LandingProps> = ({ theme }) => {
  React.useEffect(() => {
    try {
      // Add fallback values to prevent undefined CSS variables
      document.documentElement.style.setProperty('--secondary-color', theme?.secondaryColor || '#4285f4');
      document.documentElement.style.setProperty('--font-family', theme?.fontFamily || 'Arial, sans-serif');
      document.documentElement.style.setProperty('--spacing-medium', theme?.spacing?.medium || '16px');
      document.documentElement.style.setProperty('--spacing-large', theme?.spacing?.large || '24px');
    } catch (error) {
      console.error('Error setting CSS variables:', error);
    }
  }, [theme]);

  // Add inline fallback styles for safety
  const landingStyle = {
    padding: theme?.spacing?.large || '24px',
    fontFamily: theme?.fontFamily || 'Arial, sans-serif'
  };

  const heroStyle = {
    backgroundColor: theme?.secondaryColor || '#4285f4',
    color: 'white',
    padding: theme?.spacing?.large || '24px',
    borderRadius: '8px',
    marginBottom: theme?.spacing?.large || '24px'
  };

  return (
    <main className={styles.landing} style={landingStyle}>
      <section className={styles.hero} style={heroStyle}>
        <h1 className={styles.title}>Welcome to Our Platform</h1>
        <p className={styles.subtitle}>Discover amazing features and possibilities</p>
      </section>

      <div className={styles.features}>
        <div className={styles.feature}>
          <h3>Feature 1</h3>
          <p>Description of the first amazing feature</p>
        </div>
        <div className={styles.feature}>
          <h3>Feature 2</h3>
          <p>Description of the second amazing feature</p>
        </div>
        <div className={styles.feature}>
          <h3>Feature 3</h3>
          <p>Description of the third amazing feature</p>
        </div>
      </div>
    </main>
  );
}; 
