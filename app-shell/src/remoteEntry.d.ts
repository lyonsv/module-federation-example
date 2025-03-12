declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "header/Header" {
  import { FC } from 'react';
  import { Theme } from '@mfe-poc/shared';
  
  export interface HeaderProps {
    theme: Theme;
  }
  
  export const Header: FC<HeaderProps>;
}

declare module "landing/Landing" {
  import { FC } from 'react';
  import { Theme } from '@mfe-poc/shared';
  
  export interface LandingProps {
    theme: Theme;
  }
  
  export const Landing: FC<LandingProps>;
}

declare module "footer/Footer" {
  import { FC } from 'react';
  import { Theme } from '@mfe-poc/shared';
  
  export interface FooterProps {
    theme: Theme;
  }
  
  export const Footer: FC<FooterProps>;
} 