#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// First build the shared library
console.log('Building shared library...');
const buildShared = spawn('yarn', ['workspace', '@mfe-poc/shared', 'build'], {
  stdio: 'inherit',
  shell: true
});

buildShared.on('close', (code) => {
  if (code !== 0) {
    console.error('Error building shared library');
    process.exit(code);
  }

  console.log('Starting all services...');
  
  // The order matters for dependencies
  startService('@mfe-poc/header', 'Starting Header MFE on port 3002...');
  startService('@mfe-poc/landing', 'Starting Landing MFE on port 3003...');
  startService('@mfe-poc/footer', 'Starting Footer MFE on port 3004...');
  startService('@mfe-poc/nest-backend', 'Starting NestJS backend on port 3001...');
  
  // Start the app shell last
  setTimeout(() => {
    startService('@mfe-poc/app-shell', 'Starting App Shell on port 3000...');
  }, 3000);
});

function startService(packageName, message) {
  console.log(message);
  const child = spawn('yarn', ['workspace', packageName, 'start'], {
    stdio: 'inherit',
    shell: true,
    detached: true
  });
  
  child.on('error', (err) => {
    console.error(`Error starting ${packageName}:`, err);
  });
  
  // Don't wait for these processes, let them run in background
  child.unref();
}

// Set up cleanup handler
process.on('SIGINT', () => {
  console.log('Stopping all services...');
  process.exit();
}); 