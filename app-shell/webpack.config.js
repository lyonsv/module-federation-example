const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
  },
}; 