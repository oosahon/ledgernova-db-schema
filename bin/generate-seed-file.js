const fs = require('fs');
const path = require('path');

const seedDir = path.join(__dirname, '../', 'seeds');

const files = fs.readdirSync(seedDir);
const count = files.length;
const newFileName = `000${count + 1}-${process.argv[2]}.sql`;
const newFilePath = path.join(seedDir, newFileName);

fs.writeFileSync(newFilePath, '');

console.log(`Created new seed file: ${newFileName}`);
