const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbDir = path.join(__dirname, './data');
const dbPath = path.join(dbDir, 'app.db');

console.log('Database path:', dbPath);
console.log('Database exists:', fs.existsSync(dbPath));

const db = new Database(dbPath);

console.log('\n=== Users in database ===');
const users = db.prepare('SELECT * FROM users').all();
console.log(users);

console.log('\n=== User permissions (admin:');
console.log(JSON.parse(users[0].permissions));
console.log('Type:', typeof JSON.parse(users[0].permissions));
