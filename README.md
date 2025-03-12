🚧 This is AI generated and problably does not work. 

# Microfrontend POC with Module Federation

This project demonstrates a microfrontend architecture using Webpack Module Federation, with multiple sites sharing the same components but with different themes.

## Project Structure

- `app-shell`: The main application shell that hosts the microfrontends
- `mfe-header`: Header microfrontend
- `mfe-landing`: Landing page microfrontend
- `mfe-footer`: Footer microfrontend
- `shared`: Shared utilities and types
- `nest-backend`: NestJS backend service

## Prerequisites

- Node.js 16+
- Yarn

## Installation

```bash
# Install all dependencies
yarn install
```

## Development

Start all services in development mode:

```bash
# Start all services
yarn start

# Or start individual services
cd app-shell && yarn start
cd mfe-header && yarn start
cd mfe-landing && yarn start
cd mfe-footer && yarn start
cd nest-backend && yarn start
```

The services will be available at:

- App Shell: http://localhost:3000
- Header MFE: http://localhost:3002
- Landing MFE: http://localhost:3003
- Footer MFE: http://localhost:3004
- NestJS Backend: http://localhost:3001

## Multi-site Testing

To test different themes, add these entries to your hosts file:

```
127.0.0.1 sitea.localhost
127.0.0.1 siteb.localhost
```

Then access:
- Site A: http://sitea.localhost:3000
- Site B: http://siteb.localhost:3000

## Building for Production

```bash
# Build all packages
yarn build
```

## Features

- **Module Federation**: Each MFE exposes its components for consumption by the App Shell
- **Multi-site Theming**: Different themes based on the accessing domain
- **CSS Modules**: Scoped styling with CSS Modules
- **Shared Code**: Common utilities and types shared across MFEs
- **Server-side Rendering**: SSR support in the App Shell
- **NestJS Backend**: API endpoints for data and theme configuration 
