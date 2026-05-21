class TokenManager {
  constructor() {
    this.tokens = new Map()
  }

  addToken(token, data) {
    this.tokens.set(token, {
      ...data,
      lastAccessed: Date.now()
    })
  }

  getToken(token) {
    const tokenData = this.tokens.get(token)
    if (tokenData) {
      tokenData.lastAccessed = Date.now()
    }
    return tokenData
  }

  hasToken(token) {
    const tokenData = this.tokens.get(token)
    if (!tokenData) return false
    return tokenData.expireTime > Date.now()
  }

  removeToken(token) {
    return this.tokens.delete(token)
  }

  extendToken(token, additionalMinutes) {
    const tokenData = this.tokens.get(token)
    if (!tokenData) return false

    tokenData.expireTime += additionalMinutes * 60 * 1000
    return true
  }

  getAllTokens() {
    return Array.from(this.tokens.entries()).map(([token, data]) => ({
      token,
      ...data
    }))
  }

  cleanupExpired() {
    const now = Date.now()
    let cleaned = 0
    for (const [token, data] of this.tokens.entries()) {
      if (data.expireTime <= now) {
        this.tokens.delete(token)
        cleaned++
      }
    }
    return cleaned
  }

  getStats() {
    const now = Date.now()
    let active = 0
    let expired = 0

    for (const [, data] of this.tokens.entries()) {
      if (data.expireTime > now) {
        active++
      } else {
        expired++
      }
    }

    return {
      total: this.tokens.size,
      active,
      expired
    }
  }
}

const tokenManager = new TokenManager()

module.exports = { tokenManager }