const db = require('../database')

class UserModel {
  static getAll() {
    const stmt = db.prepare('SELECT * FROM users ORDER BY created_at DESC')
    return stmt.all()
  }

  static getById(id) {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?')
    return stmt.get(id)
  }

  static getByUsername(username) {
    const stmt = db.prepare('SELECT * FROM users WHERE username = ?')
    return stmt.get(username)
  }

  static create(userData) {
    const { id, username, password, nickname, email, role, status, permissions } = userData
    const now = Date.now()

    const stmt = db.prepare(`
      INSERT INTO users (id, username, password, nickname, email, role, status, permissions, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    const result = stmt.run(
      id,
      username,
      password,
      nickname,
      email || null,
      role || 'user',
      status || 'active',
      JSON.stringify(permissions || []),
      now,
      now
    )

    return { id, ...userData, created_at: now, updated_at: now }
  }

  static update(id, userData) {
    const { password, nickname, email, role, status, permissions } = userData
    const now = Date.now()

    const updates = []
    const params = []

    if (password !== undefined) {
      updates.push('password = ?')
      params.push(password)
    }
    if (nickname !== undefined) {
      updates.push('nickname = ?')
      params.push(nickname)
    }
    if (email !== undefined) {
      updates.push('email = ?')
      params.push(email)
    }
    if (role !== undefined) {
      updates.push('role = ?')
      params.push(role)
    }
    if (status !== undefined) {
      updates.push('status = ?')
      params.push(status)
    }
    if (permissions !== undefined) {
      updates.push('permissions = ?')
      params.push(JSON.stringify(permissions))
    }

    updates.push('updated_at = ?')
    params.push(now)
    params.push(id)

    const stmt = db.prepare(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`)
    return stmt.run(...params)
  }

  static delete(id) {
    const stmt = db.prepare('DELETE FROM users WHERE id = ?')
    return stmt.run(id)
  }

  static getUserProxies(userId) {
    const stmt = db.prepare('SELECT * FROM proxies WHERE user_id = ? ORDER BY created_at DESC')
    return stmt.all(userId)
  }

  static assignProxiesToUser(userId, proxyTokens) {
    const stmt = db.prepare('UPDATE proxies SET user_id = ?, updated_at = ? WHERE token = ?')
    const now = Date.now()

    const updateMany = db.transaction((tokens) => {
      for (const token of tokens) {
        stmt.run(userId, now, token)
      }
    })

    return updateMany(proxyTokens)
  }
}

module.exports = UserModel
