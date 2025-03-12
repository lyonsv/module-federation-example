#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Keep track of all child processes
const childProcesses = [];

// Helper to create and track processes
function startService(packageName, message) {
  console.log(message);
  const child = spawn('yarn', ['workspace', packageName, 'start'], {
    stdio: 'inherit',
    shell: true
  });
  
  child.on('error', (err) => {
    console.error(`Error starting ${packageName}:`, err);
  });
  
  // Track the process
  childProcesses.push({ name: packageName, process: child });
  
  return child;
}

// Start all the services
console.log('Starting all services...');

// Start in the order of dependencies
const header = startService('@mfe-poc/header', 'Starting Header MFE on port 3002...');
const landing = startService('@mfe-poc/landing', 'Starting Landing MFE on port 3003...');
const footer = startService('@mfe-poc/footer', 'Starting Footer MFE on port 3004...');
const backend = startService('@mfe-poc/nest-backend', 'Starting NestJS backend on port 3001...');

// Start the app shell after a short delay to ensure other services are ready
setTimeout(() => {
  const appShell = startService('@mfe-poc/app-shell', 'Starting App Shell on port 3000...');
}, 3000);

// Set up cleanup handler for proper shutdown
function cleanup() {
  console.log('\nShutting down all services...');
  
  childProcesses.forEach(({ name, process }) => {
    console.log(`Stopping ${name}...`);
    // On Windows use taskkill, on Unix use process.kill
    if (process.pid) {
      if (process.platform === 'win32') {
        spawn('taskkill', ['/pid', process.pid, '/f', '/t']);
      } else {
        process.kill('SIGTERM');
      }
    }
  });
  
  console.log('All services stopped. Goodbye!');
  process.exit(0);
}

// Listen for termination signals
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);

console.log('\n[Press Ctrl+C to stop all services]\n'); 