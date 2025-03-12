import React from 'react';
import { renderToString } from 'react-dom/server';
import { Theme } from '@mfe-poc/shared';
import App from './App';

export const renderPage = (theme: Theme): string => {
  // @ts-ignore
  const app = renderToString(<App theme={theme} />);
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MFE POC</title>
        <link href="http://localhost:3002/main.css" rel="stylesheet">
        <link href="http://localhost:3003/main.css" rel="stylesheet">
        <link href="http://localhost:3004/main.css" rel="stylesheet">
        <script src="http://localhost:3002/remoteEntry.js"></script>
        <script src="http://localhost:3003/remoteEntry.js"></script>
        <script src="http://localhost:3004/remoteEntry.js"></script>
      </head>
      <body>
        <div id="root">${app}</div>
        <script>
          window.__INITIAL_THEME__ = ${JSON.stringify(theme)};
        </script>
        <script src="/main.js"></script>
      </body>
    </html>
  `;
}; 