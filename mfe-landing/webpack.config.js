const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
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
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'landing',
      filename: 'remoteEntry.js',
      exposes: {
        './Landing': './src/index'
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: '^18.2.0' },
        'react-dom': { singleton: true, eager: true, requiredVersion: '^18.2.0' },
        '@mfe-poc/shared': { singleton: true, eager: true }
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css',
    }),
  ],
  devServer: {
    port: 3003,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
}; 