const fs = require('fs')
const path = require('path')

class TimeLimitService {
  constructor() {
    this.dataDir = path.join(__dirname, '../data')
    this.proxiesFile = path.join(this.dataDir, 'proxies.json')

    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true })
    }

    if (!fs.existsSync(this.proxiesFile)) {
      fs.writeFileSync(this.proxiesFile, JSON.stringify([], null, 2))
    }
  }

  loadProxies() {
    try {
      const data = fs.readFileSync(this.proxiesFile, 'utf-8')
      return JSON.parse(data)
    } catch (error) {
      console.error('[TimeLimit] Error loading proxies:', error)
      return []
    }
  }

  saveProxies(proxies) {
    try {
      fs.writeFileSync(this.proxiesFile, JSON.stringify(proxies, null, 2))
    } catch (error) {
      console.error('[TimeLimit] Error saving proxies:', error)
    }
  }

  addProxy(token, targetUrl, expireTime) {
    const proxies = this.loadProxies()
    const proxy = {
      token,
      targetUrl,
      expireTime,
      createdAt: Date.now(),
      status: 'active'
    }

    proxies.push(proxy)
    this.saveProxies(proxies)

    return proxy
  }

  removeProxy(token) {
    const proxies = this.loadProxies()
    const filtered = proxies.filter(p => p.token !== token)
    this.saveProxies(filtered)
    return filtered.length < proxies.length
  }

  getProxy(token) {
    const proxies = this.loadProxies()
    return proxies.find(p => p.token === token)
  }

  getActiveProxies() {
    const proxies = this.loadProxies()
    const now = Date.now()
    return proxies.filter(p => p.expireTime > now && p.status === 'active')
  }

  getExpiredProxies() {
    const proxies = this.loadProxies()
    const now = Date.now()
    return proxies.filter(p => p.expireTime <= now || p.status === 'expired')
  }

  markAsExpired(token) {
    const proxies = this.loadProxies()
    const proxy = proxies.find(p => p.token === token)
    if (proxy) {
      proxy.status = 'expired'
      this.saveProxies(proxies)
    }
  }

  cleanupExpired() {
    const proxies = this.loadProxies()
    const now = Date.now()
    const active = proxies.filter(p => p.expireTime > now)
    const expired = proxies.length - active.length

    if (expired > 0) {
      this.saveProxies(active)
    }

    return expired
  }

  extendProxy(token, additionalMinutes) {
    const proxies = this.loadProxies()
    const proxy = proxies.find(p => p.token === token)

    if (proxy) {
      proxy.expireTime += additionalMinutes * 60 * 1000
      proxy.status = 'active'
      this.saveProxies(proxies)
      return true
    }

    return false
  }

  getStats() {
    const proxies = this.loadProxies()
    const now = Date.now()

    return {
      total: proxies.length,
      active: proxies.filter(p => p.expireTime > now && p.status === 'active').length,
      expired: proxies.filter(p => p.expireTime <= now || p.status === 'expired').length
    }
  }
}

const timeLimitService = new TimeLimitService()

module.exports = { timeLimitService }