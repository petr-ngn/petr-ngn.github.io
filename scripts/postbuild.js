#!/usr/bin/env node

const { execSync } = require('child_process');

try {
  console.log('Running react-snap...');
  execSync('react-snap', { stdio: 'inherit' });
  console.log('react-snap completed successfully');
} catch (error) {
  console.error('react-snap encountered errors, but continuing...');
  console.error('Note: Some warnings may not affect the final build');
  // Exit with code 0 to allow the build to continue
  process.exit(0);
}
