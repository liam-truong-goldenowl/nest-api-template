#!/usr/bin/env node
const { execSync } = require('child_process');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const DB_MIGRATION_DIR = process.env.MIGRATION_DIR || './src/database/migrations';

yargs(hideBin(process.argv))
  .command(
    'generate <name>',
    'Generate a migration based on schema changes',
    y => y.positional('name', { describe: 'Migration name', type: 'string' }),
    argv => {
      const cmd = `npm run typeorm migration:generate ${DB_MIGRATION_DIR}/${argv.name}`;
      runCommand(cmd);
    }
  )
  .command(
    'up',
    'Run pending migrations',
    () => {},
    () => runCommand('npm run typeorm migration:run')
  )
  .command(
    'down',
    'Revert the last migration',
    () => {},
    () => runCommand('npm run typeorm migration:revert')
  )
  .demandCommand(1, '❌ You must specify a migration command')
  .help()
  .strict()
  .parse();

function runCommand(command) {
  console.log(`➡️ Running: ${command}`);
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}
