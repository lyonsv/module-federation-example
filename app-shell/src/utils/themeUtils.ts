import { Theme } from '@mfe-poc/shared';
import { siteATheme } from '../themeConfig/siteAOverrides';
import { siteBTheme } from '../themeConfig/siteBOverrides';

/**
 * Utility to determine the correct theme based on the hostname
 */
export const getThemeFromHost = (hostname: string = window.location.hostname): Theme => {
  console.log(`Detecting theme for hostname: ${hostname}`);
  
  if (hostname.includes('siteb')) {
    console.log('Using Site B theme');
    return siteBTheme;
  }
  
  console.log('Using Site A theme');
  return siteATheme;
};

/**
 * Get the initial theme from window.__INITIAL_THEME__ or fallback to hostname detection
 */
export const getInitialTheme = (): Theme => {
  if (window.__INITIAL_THEME__) {
    console.log('Using server-provided initial theme');
    return window.__INITIAL_THEME__;
  }
  
  return getThemeFromHost();
}; 