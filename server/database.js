const Database = require('better-sqlite3')
const path = require('path')
const fs = require('fs')

const dbDir = path.join(__dirname, '../data')
const dbPath = path.join(dbDir, 'app.db')

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

const db = new Database(dbPath)

db.pragma('journal_mode = WAL')

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    nickname TEXT NOT NULL,
    email TEXT,
    role TEXT DEFAULT 'user',
    status TEXT DEFAULT 'active',
    permissions TEXT DEFAULT '[]',
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS proxies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    token TEXT UNIQUE NOT NULL,
    phone TEXT,
    target_url TEXT NOT NULL,
    expire_time INTEGER NOT NULL,
    captcha_code TEXT,
    captcha_time TEXT,
    image_base64 TEXT,
    status TEXT DEFAULT 'active',
    user_id TEXT,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE INDEX IF NOT EXISTS idx_proxies_token ON proxies(token);
  CREATE INDEX IF NOT EXISTS idx_proxies_user_id ON proxies(user_id);
  CREATE INDEX IF NOT EXISTS idx_proxies_expire_time ON proxies(expire_time);
  CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
`)

const existingUsers = db.prepare('SELECT COUNT(*) as count FROM users').get()
if (existingUsers.count === 0) {
  const insertUser = db.prepare(`
    INSERT INTO users (id, username, password, nickname, email, role, status, permissions, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  const now = Date.now()
  insertUser.run('admin', 'admin', '123456', '管理员', 'admin@example.com', 'admin', 'active', '["admin"]', now, now)
  insertUser.run('editor', 'editor', '123456', '编辑员', 'editor@example.com', 'editor', 'active', '["editor"]', now, now)
  insertUser.run('test', 'test', '123456', '测试员', 'test@example.com', 'user', 'active', '["user"]', now, now)

  console.log('[DB] Initial users created')
}

module.exports = db
