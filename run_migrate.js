require('dotenv').config();
const { execSync } = require('child_process');
try {
  execSync('npx tsx ./node_modules/.bin/node-pg-migrate up --dry-run', { stdio: 'inherit', env: process.env });
} catch (e) {
  process.exit(1);
}
