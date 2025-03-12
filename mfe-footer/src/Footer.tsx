import React from 'react';
import { Theme } from '@mfe-poc/shared';
import styles from './Footer.module.css';

// Explicitly define the component's props interface
export interface FooterProps {
  theme: Theme;
}

export const Footer: React.FC<FooterProps> = ({ theme }) => {
  React.useEffect(() => {
    try {
      // Add fallback values to prevent undefined CSS variables
      document.documentElement.style.setProperty('--primary-color', theme?.primaryColor || '#1a73e8');
      document.documentElement.style.setProperty('--font-family', theme?.fontFamily || 'Arial, sans-serif');
      document.documentElement.style.setProperty('--spacing-small', theme?.spacing?.small || '8px');
      document.documentElement.style.setProperty('--spacing-medium', theme?.spacing?.medium || '16px');
      document.documentElement.style.setProperty('--spacing-large', theme?.spacing?.large || '24px');
    } catch (error) {
      console.error('Error setting CSS variables:', error);
    }
  }, [theme]);

  // Add inline fallback styles
  const footerStyle = {
    backgroundColor: theme?.primaryColor || '#1a73e8',
    color: 'white',
    padding: theme?.spacing?.large || '24px',
    fontFamily: theme?.fontFamily || 'Arial, sans-serif'
  };

  return (
    <footer className={styles.footer} style={footerStyle}>
      <div className={styles.content}>
        <div className={styles.section}>
          <h4 className={styles.title}>About Us</h4>
          <a href="/about" className={styles.link}>Company</a>
          <a href="/careers" className={styles.link}>Careers</a>
          <a href="/blog" className={styles.link}>Blog</a>
        </div>
        <div className={styles.section}>
          <h4 className={styles.title}>Support</h4>
          <a href="/help" className={styles.link}>Help Center</a>
          <a href="/contact" className={styles.link}>Contact Us</a>
          <a href="/faq" className={styles.link}>FAQ</a>
        </div>
        <div className={styles.section}>
          <h4 className={styles.title}>Legal</h4>
          <a href="/privacy" className={styles.link}>Privacy Policy</a>
          <a href="/terms" className={styles.link}>Terms of Service</a>
          <a href="/cookies" className={styles.link}>Cookie Policy</a>
        </div>
      </div>
      <div className={styles.copyright}>
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
}; 