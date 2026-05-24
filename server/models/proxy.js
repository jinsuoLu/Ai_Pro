const db = require('../database')

class ProxyModel {
  static getAll() {
    const stmt = db.prepare('SELECT * FROM proxies ORDER BY created_at DESC')
    return stmt.all()
  }

  static getByToken(token) {
    const stmt = db.prepare('SELECT * FROM proxies WHERE token = ?')
    return stmt.get(token)
  }

  static getActive() {
    const now = Date.now()
    const stmt = db.prepare('SELECT * FROM proxies WHERE expire_time > ? AND status = ? ORDER BY created_at DESC')
    return stmt.all(now, 'active')
  }

  static getExpired() {
    const now = Date.now()
    const stmt = db.prepare('SELECT * FROM proxies WHERE expire_time <= ? OR status = ? ORDER BY created_at DESC')
    return stmt.all(now, 'expired')
  }

  static create(proxyData) {
    const { token, phone, targetUrl, expireTime, captchaCode, captchaTime, imageBase64, userId } = proxyData
    const now = Date.now()

    const stmt = db.prepare(`
      INSERT INTO proxies (token, phone, target_url, expire_time, captcha_code, captcha_time, image_base64, user_id, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    const result = stmt.run(
      token,
      phone || null,
      targetUrl,
      expireTime,
      captchaCode || null,
      captchaTime || null,
      imageBase64 || null,
      userId || null,
      now,
      now
    )

    return { id: result.lastInsertRowid, ...proxyData, created_at: now, updated_at: now }
  }

  static update(token, proxyData) {
    const { phone, targetUrl, expireTime, captchaCode, captchaTime, imageBase64, status, userId } = proxyData
    const now = Date.now()

    const updates = []
    const params = []

    if (phone !== undefined) {
      updates.push('phone = ?')
      params.push(phone)
    }
    if (targetUrl !== undefined) {
      updates.push('target_url = ?')
      params.push(targetUrl)
    }
    if (expireTime !== undefined) {
      updates.push('expire_time = ?')
      params.push(expireTime)
    }
    if (captchaCode !== undefined) {
      updates.push('captcha_code = ?')
      params.push(captchaCode)
    }
    if (captchaTime !== undefined) {
      updates.push('captcha_time = ?')
      params.push(captchaTime)
    }
    if (imageBase64 !== undefined) {
      updates.push('image_base64 = ?')
      params.push(imageBase64)
    }
    if (status !== undefined) {
      updates.push('status = ?')
      params.push(status)
    }
    if (userId !== undefined) {
      updates.push('user_id = ?')
      params.push(userId)
    }

    updates.push('updated_at = ?')
    params.push(now)
    params.push(token)

    const stmt = db.prepare(`UPDATE proxies SET ${updates.join(', ')} WHERE token = ?`)
    return stmt.run(...params)
  }

  static delete(token) {
    const stmt = db.prepare('DELETE FROM proxies WHERE token = ?')
    return stmt.run(token)
  }

  static markAsExpired(token) {
    const stmt = db.prepare("UPDATE proxies SET status = 'expired', updated_at = ? WHERE token = ?")
    return stmt.run(Date.now(), token)
  }

  static extend(token, additionalTime) {
    const stmt = db.prepare('UPDATE proxies SET expire_time = expire_time + ?, status = ?, updated_at = ? WHERE token = ?')
    return stmt.run(additionalTime, 'active', Date.now(), token)
  }

  static cleanupExpired() {
    const now = Date.now()
    const stmt = db.prepare('DELETE FROM proxies WHERE expire_time <= ? AND status = ?')
    const result = stmt.run(now, 'active')

    db.prepare("UPDATE proxies SET status = 'expired' WHERE expire_time <= ?").run(now)

    return result.changes
  }

  static getStats() {
    const now = Date.now()
    const total = db.prepare('SELECT COUNT(*) as count FROM proxies').get().count
    const active = db.prepare('SELECT COUNT(*) as count FROM proxies WHERE expire_time > ? AND status = ?').get(now, 'active').count
    const expired = total - active

    return { total, active, expired }
  }
}

module.exports = ProxyModel
