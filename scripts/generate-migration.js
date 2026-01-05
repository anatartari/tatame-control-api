#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

// Get migration name from command line arguments
const migrationName = process.argv[2];

if (!migrationName) {
  console.error('Error: Migration name is required');
  console.error('Usage: npm run migration:generate -- MigrationName');
  process.exit(1);
}

// Build the full path to the migration file
const migrationPath = path.join(
  'src',
  'infrastructure',
  'database',
  'migrations',
  migrationName
);

// Build the command
const command = `typeorm-ts-node-commonjs migration:generate ${migrationPath} -d src/infrastructure/database/config/data-source.ts`;

try {
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  process.exit(1);
}

