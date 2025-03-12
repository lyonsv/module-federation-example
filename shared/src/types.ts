export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string;
  fontFamily: string;
  spacing: {
    small: string;
    medium: string;
    large: string;
  };
}

export interface SiteConfig {
  name: string;
  domain: string;
  theme: Theme;
} 