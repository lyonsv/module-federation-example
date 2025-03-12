import React from 'react';
import { Theme } from '@mfe-poc/shared';
import styles from './Header.module.css';

// Explicitly define the component's props interface
export interface HeaderProps {
  theme: Theme;
}

export const Header: React.FC<HeaderProps> = ({ theme }) => {
  React.useEffect(() => {
    try {
      // Add fallback values to prevent undefined CSS variables
      document.documentElement.style.setProperty('--primary-color', theme?.primaryColor || '#1a73e8');
      document.documentElement.style.setProperty('--font-family', theme?.fontFamily || 'Arial, sans-serif');
      document.documentElement.style.setProperty('--spacing-small', theme?.spacing?.small || '8px');
      document.documentElement.style.setProperty('--spacing-medium', theme?.spacing?.medium || '16px');
    } catch (error) {
      console.error('Error setting CSS variables:', error);
    }
  }, [theme]);
  
  // Add inline fallback styles
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme?.spacing?.medium || '16px',
    backgroundColor: theme?.primaryColor || '#1a73e8',
    color: 'white'
  };

  return (
    <header className={styles.header} style={headerStyle}>
      <img src={theme?.logoUrl || '/default-logo.png'} alt="Site Logo" className={styles.logo} />
      <nav className={styles.nav}>
        <a href="/" className={styles.navLink}>Home</a>
        <a href="/about" className={styles.navLink}>About</a>
        <a href="/contact" className={styles.navLink}>Contact</a>
      </nav>
    </header>
  );
}; 