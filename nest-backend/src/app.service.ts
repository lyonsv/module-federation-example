import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return { message: 'Hello from NestJS Backend!' };
  }

  getTheme() {
    return {
      siteA: {
        primaryColor: '#1a73e8',
        secondaryColor: '#4285f4',
        logoUrl: '/siteA-logo.png',
        fontFamily: 'Roboto, sans-serif',
        spacing: {
          small: '8px',
          medium: '16px',
          large: '24px'
        }
      },
      siteB: {
        primaryColor: '#ea4335',
        secondaryColor: '#fbbc04',
        logoUrl: '/siteB-logo.png',
        fontFamily: 'Open Sans, sans-serif',
        spacing: {
          small: '8px',
          medium: '16px',
          large: '24px'
        }
      }
    };
  }
} 