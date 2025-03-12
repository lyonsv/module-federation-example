const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');

// Load theme configurations
const siteAThemeRaw = fs.readFileSync(path.resolve(__dirname, 'src/themeConfig/siteAOverrides.ts'), 'utf8');
const siteBThemeRaw = fs.readFileSync(path.resolve(__dirname, 'src/themeConfig/siteBOverrides.ts'), 'utf8');

// Parse theme objects (simple approach - modify as needed for your actual theme structure)
const getSiteATheme = () => {
  const match = siteAThemeRaw.match(/export\s+const\s+siteATheme\s*=\s*({[^}]+})/s);
  if (match && match[1]) {
    // Convert theme object from string to actual object (simplified)
    return {
      primaryColor: '#1a73e8',
      secondaryColor: '#4285f4',
      logoUrl: '/siteA-logo.png',
      fontFamily: 'Roboto, sans-serif',
      spacing: {
        small: '8px',
        medium: '16px',
        large: '24px'
      }
    };
  }
  return null;
};

const getSiteBTheme = () => {
  const match = siteBThemeRaw.match(/export\s+const\s+siteBTheme\s*=\s*({[^}]+})/s);
  if (match && match[1]) {
    // Convert theme object from string to actual object (simplified)
    return {
      primaryColor: '#ea4335',
      secondaryColor: '#fbbc04',
      logoUrl: '/siteB-logo.png',
      fontFamily: 'Open Sans, sans-serif',
      spacing: {
        small: '8px',
        medium: '16px',
        large: '24px'
      }
    };
  }
  return null;
};

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist/public'),
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@mfe-poc/shared': path.resolve(__dirname, '../shared/src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.module\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app_shell',
      remotes: {
        header: 'header@http://localhost:3002/remoteEntry.js',
        landing: 'landing@http://localhost:3003/remoteEntry.js',
        footer: 'footer@http://localhost:3004/remoteEntry.js',
      },
      shared: {
        react: { 
          singleton: true, 
          eager: true, 
          requiredVersion: '^18.2.0' 
        },
        'react-dom': { 
          singleton: true, 
          eager: true, 
          requiredVersion: '^18.2.0' 
        },
        '@mfe-poc/shared': { 
          singleton: true, 
          eager: true,
          requiredVersion: false,  // Accept any version
        }
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['main'],
      templateParameters: {
        initialTheme: JSON.stringify(getSiteATheme()) // Default theme
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      // Add middleware to inject themes based on hostname
      middlewares.unshift({
        name: 'theme-middleware',
        middleware: (req, res, next) => {
          const host = req.get('host') || '';
          if (req.url === '/' || req.url === '/index.html') {
            let theme = getSiteATheme(); // Default theme
            if (host.includes('siteb')) {
              console.log('Using SiteB theme for host:', host);
              theme = getSiteBTheme();
            } else {
              console.log('Using SiteA theme for host:', host);
            }
            
            // Inject the theme into the HTML
            const originalSend = res.send;
            res.send = function(html) {
              if (typeof html === 'string') {
                const updatedHtml = html.replace(
                  '<script',
                  `<script>
                  console.log('Initializing theme for host: ${host}');
                  window.__INITIAL_THEME__ = ${JSON.stringify(theme)};
                  </script>
                  <script`
                );
                return originalSend.call(this, updatedHtml);
              }
              return originalSend.call(this, html);
            };
          }
          next();
        }
      });

      return middlewares;
    }
  },
}; 