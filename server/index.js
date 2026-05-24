const express = require('express')
const cors = require('cors')
const { createProxyMiddleware } = require('http-proxy-middleware')
const crypto = require('crypto')
const path = require('path')
const fs = require('fs')
const UserModel = require('./models/user')
const ProxyModel = require('./models/proxy')
const { tokenManager } = require('./tokenManager')

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAMFPa+v52FkSUXvcUnrGI/XzW3EpZRI0s9BCWJ3oNQmEYA5lbWW5p8h0uadTIoTyYweFPdH4hveyxlwmS7oefvbIdiP+o+QIYW/R4WjsG4Yl8MhR4PJqUE3RCy6IT9fM8ckG4kN9ECs6Ja8fQFc6/mSl5dJczzJO3k1rWMBhKJD/wIDAQAB
-----END RSA PRIVATE KEY-----`

function decryptRSA(encryptedData) {
  try {
    const buffer = Buffer.from(encryptedData, 'base64')
    const decrypted = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING
      },
      buffer
    )
    return decrypted.toString('utf8')
  } catch (error) {
    console.error('[RSA] Decryption error:', error.message)
    return null
  }
}

const app = express()
const PORT = process.env.PROXY_PORT || 3001

const isProduction = process.env.NODE_ENV === 'production'
const corsOptions = isProduction ? {
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Token', 'accessToken', 'AccessToken']
} : {
  origin: ['http://localhost:8090', 'http://127.0.0.1:8090'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Token', 'accessToken', 'AccessToken']
}
app.use(cors(corsOptions))
app.use(express.json({ limit: '50mb' }))

const accessTokens = {
  admin: 'admin-accessToken',
  editor: 'editor-accessToken',
  test: 'test-accessToken'
}

function initAccessTokens() {
  const users = UserModel.getAll()
  users.forEach(user => {
    if (!accessTokens[user.username]) {
      accessTokens[user.username] = `user-accessToken-${user.username}-${Date.now()}`
    }
  })
}

initAccessTokens()

const imageStore = new Map()

function generateUserId() {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

function generateToken() {
  return 'tk_' + Math.random().toString(36).substr(2, 16) + Date.now().toString(36)
}

function formatExpiredDate(expireTime) {
  const d = new Date(expireTime)
  return d.getFullYear() + '-' +
    String(d.getMonth() + 1).padStart(2, '0') + '-' +
    String(d.getDate()).padStart(2, '0') + ' ' +
    String(d.getHours()).padStart(2, '0') + ':' +
    String(d.getMinutes()).padStart(2, '0') + ':' +
    String(d.getSeconds()).padStart(2, '0')
}

function formatDuration(seconds) {
  if (seconds <= 0) return '已过期'
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (days > 0) return days + '天 ' + hours + '小时 ' + minutes + '分'
  if (hours > 0) return hours + '小时 ' + minutes + '分 ' + secs + '秒'
  if (minutes > 0) return minutes + '分 ' + secs + '秒'
  return secs + '秒'
}

function cleanupExpiredProxies() {
  const now = Date.now()
  const allProxies = ProxyModel.getAll()

  allProxies.forEach(proxy => {
    if (proxy.expire_time <= now && proxy.status === 'active') {
      ProxyModel.markAsExpired(proxy.token)
    }
  })
}

setInterval(cleanupExpiredProxies, 60000)
cleanupExpiredProxies()

app.post('/login', (req, res) => {
  let { username, password } = req.body

  if (req.body.param) {
    const decrypted = decryptRSA(req.body.param)
    if (decrypted) {
      try {
        const parsed = JSON.parse(decrypted)
        username = parsed.username
        password = parsed.password
      } catch (error) {
        console.error('[LOGIN] Failed to parse decrypted data:', error.message)
        return res.status(400).json({ code: 500, msg: '数据解析失败' })
      }
    } else {
      return res.status(400).json({ code: 500, msg: '解密失败' })
    }
  }

  if (!username || !password) {
    return res.status(400).json({ code: 500, msg: '用户名和密码不能为空' })
  }

  let user = UserModel.getByUsername(username)

  if (!user || user.password !== password) {
    return res.status(401).json({ code: 500, msg: '帐户或密码不正确' })
  }

  let accessToken = accessTokens[username]
  if (!accessToken) {
    accessToken = 'user-accessToken-' + username + '-' + Date.now()
    accessTokens[username] = accessToken
  }

  res.json({
    code: 200,
    msg: 'success',
    data: { accessToken }
  })
})

app.post('/userInfo', (req, res) => {
  const { accessToken } = req.body

  if (!accessToken) {
    return res.status(401).json({ code: 401, msg: '未授权' })
  }

  let username = null
  for (const [user, token] of Object.entries(accessTokens)) {
    if (token === accessToken) {
      username = user
      break
    }
  }

  if (!username) {
    return res.status(401).json({ code: 401, msg: '无效的token' })
  }

  const user = UserModel.getByUsername(username)
  if (!user) {
    return res.status(401).json({ code: 401, msg: '用户不存在' })
  }

  res.json({
    code: 200,
    msg: 'success',
    data: {
      username: user.username,
      roles: [user.role],
      permissions: JSON.parse(user.permissions || '[]'),
      avatar: 'https://p3-passport.byteimg.com/img/mosaic-legacy/3791/2341680814601~100x100.awebp'
    }
  })
})

app.post('/publicKey', (req, res) => {
  res.json({
    code: 200,
    msg: 'success',
    data: {
      publicKey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBT2vr+dhZElF73FJ6xiP181txKWUSNLPQQlid6DUJhGAOZblluafIdLmnUyKE8mMHhT3R+Ib3ssZcJku6Hn72yHYj/qPkCGFv0eFo7G+GJfDIUeDyalBN0QsuiE/XzPHJBuJDfRArOiWvH0BXOv5kpeXSXM8yTt5Na1jAYSiQ/wIDAQAB'
    }
  })
})

app.get('/publicKey', (req, res) => {
  res.json({
    code: 200,
    msg: 'success',
    data: {
      publicKey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBT2vr+dhZElF73FJ6xiP181txKWUSNLPQQlid6DUJhGAOZblluafIdLmnUyKE8mMHhT3R+Ib3ssZcJku6Hn72yHYj/qPkCGFv0eFo7G+GJfDIUeDyalBN0QsuiE/XzPHJBuJDfRArOiWvH0BXOv5kpeXSXM8yTt5Na1jAYSiQ/wIDAQAB'
    }
  })
})

app.post('/logout', (req, res) => {
  res.json({ code: 200, msg: 'success' })
})

app.post('/api/image/upload', (req, res) => {
  try {
    const { imageBase64 } = req.body

    if (!imageBase64) {
      return res.status(400).json({ code: 400, success: false, msg: 'Image data is required' })
    }

    const imageId = 'img_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)

    imageStore.set(imageId, imageBase64)

    res.json({
      code: 200,
      success: true,
      msg: 'success',
      data: { imageId }
    })
  } catch (error) {
    console.error('[IMAGE] Error uploading image:', error)
    res.status(500).json({ code: 500, success: false, msg: 'Failed to upload image' })
  }
})

app.post('/api/proxy/create', (req, res) => {
  try {
    const { phone, targetUrl, expireMinutes = 60, imageId = '', userId } = req.body

    if (!targetUrl) {
      return res.status(400).json({ code: 400, success: false, msg: 'Target URL is required' })
    }

    try {
      new URL(targetUrl)
    } catch (e) {
      return res.status(400).json({ code: 400, success: false, msg: 'Invalid URL format' })
    }

    const expireMinutesNum = Math.min(Math.max(parseInt(expireMinutes) || 60, 1), 10080)

    let imageBase64 = ''
    if (imageId && imageStore.has(imageId)) {
      imageBase64 = imageStore.get(imageId)
    }

    const token = generateToken()
    const expireTime = Date.now() + expireMinutesNum * 60 * 1000

    tokenManager.addToken(token, {
      phone,
      targetUrl,
      expireTime,
      createdAt: Date.now(),
      captchaCode: '',
      captchaTime: '',
      imageBase64
    })

    const proxy = ProxyModel.create({
      token,
      phone,
      targetUrl,
      expireTime,
      captchaCode: '',
      captchaTime: '',
      imageBase64,
      userId
    })

    const proxyPath = `/proxy/${token}`
    const proxyUrl = `http://localhost:${PORT}${proxyPath}`

    console.log(`[PROXY] Created proxy token: ${token}`)
    console.log(`[PROXY] Phone: ${phone || 'N/A'}`)
    console.log(`[PROXY] Target: ${targetUrl}`)
    console.log(`[PROXY] Expires at: ${formatExpiredDate(expireTime)}`)

    res.json({
      code: 200,
      success: true,
      msg: 'success',
      data: {
        token,
        phone,
        proxyUrl,
        expireTime,
        expireMinutes: expireMinutesNum,
        expiredDate: formatExpiredDate(expireTime),
        captchaCode: '',
        captchaTime: '',
        imageBase64
      }
    })
  } catch (error) {
    console.error('[PROXY] Error creating proxy:', error)
    res.status(500).json({ code: 500, success: false, msg: 'Failed to create proxy' })
  }
})

app.get('/api/proxy/list', (req, res) => {
  try {
    const now = Date.now()
    const allProxies = ProxyModel.getAll()
    const proxies = allProxies.map(proxy => ({
      token: proxy.token,
      phone: proxy.phone || '',
      apiUrl: proxy.target_url,
      expireTime: proxy.expire_time,
      expiredDate: formatExpiredDate(proxy.expire_time),
      remainingTime: Math.max(0, proxy.expire_time - now),
      isExpired: proxy.expire_time <= now,
      captchaCode: proxy.captcha_code || '',
      captchaTime: proxy.captcha_time || '',
      status: proxy.status,
      userId: proxy.user_id
    }))

    res.json({
      code: 200,
      success: true,
      msg: 'success',
      data: proxies
    })
  } catch (error) {
    console.error('[PROXY] Error listing proxies:', error)
    res.status(500).json({ code: 500, success: false, msg: 'Failed to list proxies' })
  }
})

app.post('/api/proxy/batch-create', (req, res) => {
  try {
    const { items, imageId = '', userId } = req.body

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ code: 400, success: false, msg: 'Items array is required' })
    }

    const results = []
    const errors = []

    let imageBase64 = ''
    if (imageId && imageStore.has(imageId)) {
      imageBase64 = imageStore.get(imageId)
    }

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const { phone, targetUrl, expireMinutes = 60 } = item

      if (!targetUrl) {
        errors.push({ index: i, phone, error: 'Target URL is required' })
        continue
      }

      try {
        new URL(targetUrl)
      } catch (e) {
        errors.push({ index: i, phone, error: 'Invalid URL format' })
        continue
      }

      const expireMinutesNum = Math.min(Math.max(parseInt(expireMinutes) || 60, 1), 10080)

      try {
        const token = generateToken()
        const expireTime = Date.now() + expireMinutesNum * 60 * 1000

        tokenManager.addToken(token, {
          phone,
          targetUrl,
          expireTime,
          createdAt: Date.now(),
          captchaCode: '',
          captchaTime: '',
          imageBase64
        })

        const proxy = ProxyModel.create({
          token,
          phone,
          targetUrl,
          expireTime,
          captchaCode: '',
          captchaTime: '',
          imageBase64,
          userId
        })

        const proxyUrl = `http://localhost:${PORT}/proxy/${token}`

        results.push({
          token,
          phone,
          proxyUrl,
          expireTime,
          expireMinutes: expireMinutesNum,
          expiredDate: formatExpiredDate(expireTime),
          captchaCode: '',
          captchaTime: '',
          imageBase64
        })
      } catch (error) {
        errors.push({ index: i, phone, error: 'Failed to create proxy' })
      }
    }

    res.json({
      code: 200,
      success: true,
      msg: 'success',
      data: {
        results,
        errors,
        successCount: results.length,
        errorCount: errors.length
      }
    })
  } catch (error) {
    console.error('[PROXY] Error batch creating proxies:', error)
    res.status(500).json({ code: 500, success: false, msg: 'Failed to batch create proxies' })
  }
})

app.post('/api/proxy/extend', (req, res) => {
  try {
    const { token, additionalMinutes } = req.body

    if (!token || !additionalMinutes) {
      return res.status(400).json({ code: 400, success: false, msg: 'Token and additionalMinutes are required' })
    }

    const additionalTime = parseInt(additionalMinutes) * 60 * 1000
    const success = tokenManager.extendToken(token, additionalTime)

    if (success) {
      ProxyModel.extend(token, additionalTime)
    }

    res.json({ code: 200, success, msg: success ? 'success' : 'Failed to extend' })
  } catch (error) {
    console.error('[PROXY] Error extending proxy:', error)
    res.status(500).json({ code: 500, success: false, msg: 'Failed to extend proxy' })
  }
})

app.delete('/api/proxy/:token', (req, res) => {
  try {
    const { token } = req.params
    const existed = ProxyModel.getByToken(token)

    if (existed) {
      ProxyModel.delete(token)
      tokenManager.removeToken(token)
    }

    res.json({ code: 200, success: true, deleted: !!existed, msg: 'success' })
  } catch (error) {
    console.error('[PROXY] Error deleting proxy:', error)
    res.status(500).json({ code: 500, success: false, msg: 'Failed to delete proxy' })
  }
})

app.post('/api/proxy/refresh-captcha', (req, res) => {
  try {
    const { token } = req.body

    if (!token) {
      return res.status(400).json({ code: 400, success: false, msg: 'Invalid token' })
    }

    const proxy = ProxyModel.getByToken(token)

    if (!proxy) {
      return res.status(400).json({ code: 400, success: false, msg: 'Token not found' })
    }

    if (proxy.expire_time <= Date.now()) {
      ProxyModel.markAsExpired(token)
      return res.status(400).json({ code: 400, success: false, msg: 'Token expired' })
    }

    const targetUrl = proxy.target_url
    const https = targetUrl.startsWith('https://') ? require('https') : require('http')

    const options = new URL(targetUrl)

    const request = https.get(options, (response) => {
      let body = []
      response.on('data', (chunk) => {
        body.push(chunk)
      })
      response.on('end', () => {
        try {
          const responseBody = Buffer.concat(body).toString()
          const parsed = JSON.parse(responseBody)

          if (parsed.data && typeof parsed.data === 'object') {
            if (parsed.data.code !== undefined) {
              let code = parsed.data.code || ''
              const match = code.match(/(\d{4,8})/)
              if (match) {
                code = match[1]
              }

              const captchaTime = parsed.data.code_time || formatExpiredDate(Date.now())

              ProxyModel.update(token, {
                captchaCode: code,
                captchaTime: captchaTime
              })

              res.json({
                code: 200,
                success: true,
                msg: 'success',
                data: {
                  token,
                  proxyUrl: `http://localhost:${PORT}/proxy/${token}`,
                  expiredDate: formatExpiredDate(proxy.expire_time),
                  code: code,
                  code_time: captchaTime
                }
              })
            } else {
              res.json({
                code: 200,
                success: true,
                msg: 'success',
                data: {
                  token,
                  proxyUrl: `http://localhost:${PORT}/proxy/${token}`,
                  expiredDate: formatExpiredDate(proxy.expire_time),
                  code: proxy.captcha_code || '',
                  code_time: proxy.captcha_time || ''
                }
              })
            }
          } else {
            res.json({
              code: 200,
              success: true,
              msg: 'success',
              data: {
                token,
                proxyUrl: `http://localhost:${PORT}/proxy/${token}`,
                expiredDate: formatExpiredDate(proxy.expire_time),
                code: proxy.captcha_code || '',
                code_time: proxy.captcha_time || ''
              }
            })
          }
        } catch (e) {
          console.error('[PROXY] Error parsing response:', e)
          res.json({
            code: 200,
            success: true,
            msg: 'success',
            data: {
              token,
              proxyUrl: `http://localhost:${PORT}/proxy/${token}`,
              expiredDate: formatExpiredDate(proxy.expire_time),
              code: proxy.captcha_code || '',
              code_time: proxy.captcha_time || ''
            }
          })
        }
      })
    })

    request.on('error', (error) => {
      console.error('[PROXY] Error fetching target:', error)
      res.json({
        code: 200,
        success: true,
        msg: 'success',
        data: {
          token,
          proxyUrl: `http://localhost:${PORT}/proxy/${token}`,
          expiredDate: formatExpiredDate(proxy.expire_time),
          code: proxy.captcha_code || '',
          code_time: proxy.captcha_time || ''
        }
      })
    })

    request.end()
  } catch (error) {
    console.error('[PROXY] Error refreshing captcha:', error)
    res.status(500).json({ code: 500, success: false, msg: 'Failed to refresh captcha' })
  }
})

app.get('/proxy/:token', (req, res) => {
  const { token } = req.params

  const proxy = ProxyModel.getByToken(token)

  if (!proxy) {
    return res.json({
      code: 0,
      msg: '',
      data: {
        code: '',
        code_time: '',
        expired_date: '2026-07-31 00:00:00'
      }
    })
  }

  if (proxy.expire_time <= Date.now()) {
    ProxyModel.markAsExpired(token)
    return res.json({
      code: 0,
      msg: '',
      data: {
        code: '',
        code_time: '',
        expired_date: '2026-07-31 00:00:00'
      }
    })
  }

  const remainingSeconds = Math.max(0, Math.floor((proxy.expire_time - Date.now()) / 1000))

  const html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>授权API - 验证码获取</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans SC', sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      position: relative;
    }
    body::before {
      content: '';
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%);
      pointer-events: none;
    }
    .container {
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(20px);
      border-radius: 24px;
      box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
      padding: 40px;
      max-width: 520px;
      width: 100%;
      position: relative;
      animation: slideUp 0.5s ease-out;
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .header {
      text-align: center;
      margin-bottom: 32px;
      position: relative;
    }
    .header::after {
      content: '';
      position: absolute;
      bottom: -16px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, #667eea, #764ba2);
      border-radius: 2px;
    }
    .header h1 {
      color: #1a1a2e;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
      letter-spacing: -0.5px;
    }
    .header p {
      color: #666;
      font-size: 14px;
      font-weight: 400;
    }
    .info-card {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-radius: 16px;
      padding: 20px 24px;
      margin-bottom: 20px;
      border: 1px solid rgba(0, 0, 0, 0.05);
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .info-label {
      color: #555;
      font-size: 15px;
      font-weight: 600;
    }
    .info-value {
      color: #1a1a2e;
      font-weight: 600;
      font-size: 15px;
      font-family: 'SF Mono', 'Consolas', monospace;
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .captcha-section {
      text-align: center;
      padding: 32px 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 20px;
      margin-bottom: 20px;
      position: relative;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
    }
    .captcha-label {
      color: rgba(255, 255, 255, 0.9);
      font-size: 13px;
      margin-bottom: 16px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .captcha-code {
      font-family: 'SF Mono', 'Consolas', monospace;
      font-size: 42px;
      font-weight: 700;
      color: white;
      letter-spacing: 8px;
      text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      animation: pulse 2s ease-in-out infinite;
      cursor: pointer;
      transition: all 0.3s;
    }
    .captcha-code:hover {
      transform: scale(1.05);
    }
    .copy-btn {
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 8px;
      padding: 8px 16px;
      color: white;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.3s;
      margin-top: 12px;
    }
    .copy-btn:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }
    .copy-btn.copied {
      background: #28a745;
      border-color: #28a745;
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.02); }
    }
    .captcha-empty {
      font-size: 18px;
      color: rgba(255, 255, 255, 0.6);
      font-weight: 500;
    }
    .captcha-time {
      color: rgba(255, 255, 255, 0.75);
      font-size: 12px;
      margin-top: 16px;
      font-weight: 500;
    }
    .refresh-btn {
      width: 100%;
      padding: 16px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 14px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }
    .refresh-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
    }
    .refresh-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none;
    }
    .image-guide-section {
      display: flex;
      gap: 16px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 20px;
      padding: 20px;
      margin-top: 20px;
    }
    .image-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .image-wrapper .image-label {
      color: white;
      font-size: 13px;
      margin-bottom: 12px;
      font-weight: 700;
      text-transform: uppercase;
    }
    .image-wrapper .image-container {
      width: 100%;
      height: 160px;
      border: 2px solid rgba(255, 255, 255, 0.25);
      border-radius: 12px;
      position: relative;
      overflow: hidden;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .image-wrapper .display-image {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      cursor: pointer;
    }
    .image-wrapper .no-image {
      color: rgba(255, 255, 255, 0.6);
      font-size: 13px;
    }
    .guide-wrapper {
      flex: 1.5;
      color: white;
      display: flex;
      flex-direction: column;
    }
    .guide-wrapper .guide-title {
      font-size: 15px;
      font-weight: 700;
      margin-bottom: 14px;
      text-align: center;
      padding-bottom: 10px;
      border-bottom: 2px solid rgba(255, 255, 255, 0.2);
      text-transform: uppercase;
    }
    .guide-wrapper .guide-step {
      padding: 8px 0;
      font-size: 12px;
      line-height: 1.6;
      border-bottom: 1px dashed rgba(255, 255, 255, 0.15);
    }
    .guide-wrapper .guide-note {
      font-size: 11px;
      opacity: 0.85;
      margin-top: 12px;
      padding-top: 10px;
      border-top: 1px solid rgba(255, 255, 255, 0.15);
    }
    .timer-section {
      text-align: center;
      padding: 20px;
      background: linear-gradient(135deg, #fff9e6 0%, #fff3cd 100%);
      border-radius: 16px;
      border: 1px solid rgba(255, 193, 7, 0.2);
      margin-bottom: 20px;
    }
    .timer-label {
      color: #856404;
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
    }
    .timer-value {
      font-family: 'SF Mono', 'Consolas', monospace;
      font-size: 24px;
      font-weight: 700;
      background: linear-gradient(135deg, #ff9500, #ff6b00);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-top: 8px;
    }
    .footer {
      text-align: center;
      margin-top: 24px;
      color: #888;
      font-size: 12px;
      padding-top: 20px;
      border-top: 1px solid rgba(0, 0, 0, 0.06);
    }
    .loading {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 0.8s linear infinite;
      vertical-align: middle;
      margin-right: 8px;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>授权API管理</h1>
      <p>实时获取验证码</p>
    </div>
    <div class="info-card">
      <div class="info-row">
        <span class="info-label">手机号</span>
        <span class="info-value">${proxy.phone || '未绑定'}</span>
      </div>
    </div>
    <div class="captcha-section">
      <div class="captcha-label">当前验证码</div>
      <div id="captcha-display">
        ${proxy.captcha_code ? `<div class="captcha-code" onclick="copyCaptcha()">${proxy.captcha_code}</div><button class="copy-btn" id="copy-btn" onclick="copyCaptcha()">点击复制验证码</button>` : '<div class="captcha-empty">暂无验证码</div>'}
      </div>
      ${proxy.captcha_time ? `<div class="captcha-time">获取时间: ${proxy.captcha_time}</div>` : ''}
    </div>
    <div class="timer-section">
      <div class="timer-label">剩余有效时间</div>
      <div class="timer-value" id="timer">${formatDuration(remainingSeconds)}</div>
    </div>
    <button class="refresh-btn" id="refresh-btn" onclick="refreshCaptcha()">
      <span id="btn-content">刷新验证码</span>
    </button>
    <div class="image-guide-section">
      <div class="image-wrapper">
        <div class="image-label">演示示例说明</div>
        <div class="image-container">
          ${proxy.image_base64 ? `<img src="${proxy.image_base64}" alt="图片" class="display-image" />` : '<div class="no-image">暂无图片</div>'}
        </div>
      </div>
      <div class="guide-wrapper">
        <div class="guide-title">如何使用</div>
        <div class="guide-step">1. 打开应用（腾讯视频APP）→ 手机号登陆</div>
        <div class="guide-step">2. 将+86改成【美国+1】，粘贴手机号获取</div>
        <div class="guide-step">3. 返回本页面获取验证码</div>
        <div class="guide-step">4. 复制验证码到软件内登录即可</div>
        <div class="guide-note">说明：请确保在有效期内完成登录操作</div>
      </div>
    </div>
    <div class="footer">
      验证码会自动同步更新 | 请确保目标API返回正确格式
    </div>
  </div>
  <script>
    const token = '${token}';
    let timerInterval;

    function formatDuration(seconds) {
      if (seconds <= 0) return '已过期';
      const days = Math.floor(seconds / 86400);
      const hours = Math.floor((seconds % 86400) / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;

      if (days > 0) return days + '天 ' + hours + '小时 ' + minutes + '分';
      if (hours > 0) return hours + '小时 ' + minutes + '分 ' + secs + '秒';
      if (minutes > 0) return minutes + '分 ' + secs + '秒';
      return secs + '秒';
    }

    function updateTimer() {
      fetch('/api/proxy/timer?token=' + token)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            document.getElementById('timer').textContent = formatDuration(data.remainingSeconds);
            if (data.remainingSeconds <= 0) {
              clearInterval(timerInterval);
              document.getElementById('refresh-btn').disabled = true;
            }
          }
        })
        .catch(() => {});
    }

    function refreshCaptcha() {
      const btn = document.getElementById('refresh-btn');
      const btnContent = document.getElementById('btn-content');
      const captchaDisplay = document.getElementById('captcha-display');

      btn.disabled = true;
      btnContent.innerHTML = '<span class="loading"></span>获取中...';

      fetch('/api/proxy/refresh-captcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          if (data.data.code) {
            captchaDisplay.innerHTML = '<div class="captcha-code" onclick="copyCaptcha()">' + data.data.code + '</div><button class="copy-btn" id="copy-btn" onclick="copyCaptcha()">点击复制验证码</button>';
            if (data.data.code_time) {
              captchaDisplay.innerHTML += '<div class="captcha-time">获取时间: ' + data.data.code_time + '</div>';
            }
          } else {
            captchaDisplay.innerHTML = '<div class="captcha-empty">暂无验证码</div>';
          }
        }
      })
      .catch(() => {
        captchaDisplay.innerHTML = '<div class="captcha-empty">获取失败</div>';
      })
      .finally(() => {
        btn.disabled = false;
        btnContent.textContent = '刷新验证码';
      });
    }

    function copyCaptcha() {
      const captchaCode = document.querySelector('.captcha-code');
      const copyBtn = document.getElementById('copy-btn');
      
      if (!captchaCode || !copyBtn) return;

      const code = captchaCode.textContent.trim();
      
      navigator.clipboard.writeText(code).then(() => {
        copyBtn.textContent = '✓ 已复制';
        copyBtn.classList.add('copied');
        
        setTimeout(() => {
          copyBtn.textContent = '点击复制验证码';
          copyBtn.classList.remove('copied');
        }, 2000);
      }).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = code;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          copyBtn.textContent = '✓ 已复制';
          copyBtn.classList.add('copied');
        } catch (e) {
          alert('复制失败，请手动复制');
        }
        document.body.removeChild(textarea);
        
        setTimeout(() => {
          copyBtn.textContent = '点击复制验证码';
          copyBtn.classList.remove('copied');
        }, 2000);
      });
    }

    timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
    setInterval(refreshCaptcha, 10000);
  </script>
</body>
</html>
  `

  res.setHeader('Content-Type', 'text/html')
  res.end(html)
})

app.post('/proxy/:token', (req, res) => {
  const { token } = req.params

  const proxy = ProxyModel.getByToken(token)

  if (!proxy) {
    return res.json({
      code: 0,
      msg: '',
      data: {
        code: '',
        code_time: '',
        expired_date: '2026-07-31 00:00:00'
      }
    })
  }

  if (proxy.expire_time <= Date.now()) {
    ProxyModel.markAsExpired(token)
    return res.json({
      code: 0,
      msg: '',
      data: {
        code: '',
        code_time: '',
        expired_date: '2026-07-31 00:00:00'
      }
    })
  }

  const expiredDateStr = formatExpiredDate(proxy.expire_time)

  const proxyMiddleware = createProxyMiddleware({
    target: proxy.target_url,
    changeOrigin: true,
    pathRewrite: {
      [`^/proxy/${token}`]: ''
    },
    selfHandleResponse: true,
    onProxyReq: (proxyReq, req) => {
      proxyReq.setHeader('X-Proxy-Token', token)
      proxyReq.setHeader('X-Proxy-Phone', proxy.phone || '')
      proxyReq.setHeader('X-Forwarded-For', req.ip)
    },
    onProxyRes: (proxyRes, req, res) => {
      let responseBody = []
      proxyRes.on('data', (chunk) => {
        responseBody.push(chunk)
      })
      proxyRes.on('end', () => {
        try {
          const body = Buffer.concat(responseBody).toString()
          const parsed = JSON.parse(body)

          if (parsed.data && typeof parsed.data === 'object') {
            parsed.data.expired_date = expiredDateStr

            if (parsed.data.code !== undefined) {
              let code = parsed.data.code || ''
              const match = code.match(/(\d{4,8})/)
              if (match) {
                code = match[1]
              }
              const captchaTime = parsed.data.code_time || formatExpiredDate(Date.now())

              ProxyModel.update(token, {
                captchaCode: code,
                captchaTime: captchaTime
              })
            }
          }

          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(parsed))
        } catch (e) {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({
            code: 0,
            msg: '',
            data: {
              code: '',
              code_time: '',
              expired_date: expiredDateStr
            }
          }))
        }
      })
    },
    onError: (err, req, res) => {
      console.error('[PROXY] Proxy error:', err.message)
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({
        code: 0,
        msg: 'Proxy error',
        data: {
          code: '',
          code_time: '',
          expired_date: expiredDateStr
        }
      }))
    }
  })

  proxyMiddleware(req, res)
})

app.get('/api/proxy/timer', (req, res) => {
  const { token } = req.query

  if (!token) {
    return res.json({ code: 400, success: false, msg: 'Invalid token' })
  }

  const proxy = ProxyModel.getByToken(token)

  if (!proxy) {
    return res.json({ code: 400, success: false, msg: 'Invalid token' })
  }

  const remainingSeconds = Math.max(0, Math.floor((proxy.expire_time - Date.now()) / 1000))

  res.json({
    code: 200,
    success: true,
    msg: 'success',
    remainingSeconds
  })
})

app.get('/api/user/list', (req, res) => {
  try {
    const users = UserModel.getAll()
    const formattedUsers = users.map(user => {
      const proxyCount = UserModel.getUserProxies(user.id).length
      return {
        id: user.id,
        username: user.username,
        nickname: user.nickname,
        email: user.email,
        role: user.role,
        status: user.status,
        permissions: JSON.parse(user.permissions || '[]'),
        createdAt: user.created_at,
        proxyCount
      }
    })

    res.json({
      code: 200,
      success: true,
      msg: 'success',
      data: formattedUsers
    })
  } catch (error) {
    console.error('[USER] Error listing users:', error)
    res.status(500).json({ code: 500, success: false, msg: 'Failed to list users' })
  }
})

app.post('/api/user/create', (req, res) => {
  try {
    const { username, password, nickname, email, role } = req.body

    if (!username || !password || !nickname) {
      return res.status(400).json({ code: 400, success: false, msg: 'Missing required fields' })
    }

    const existingUser = UserModel.getByUsername(username)
    if (existingUser) {
      return res.status(400).json({ code: 400, success: false, msg: 'Username already exists' })
    }

    const userId = generateUserId()
    const newUser = UserModel.create({
      id: userId,
      username,
      password,
      nickname,
      email,
      role: role || 'user',
      status: 'active',
      permissions: []
    })

    res.json({
      code: 200,
      success: true,
      msg: 'success',
      data: newUser
    })
  } catch (error) {
    console.error('[USER] Error creating user:', error)
    res.status(500).json({ code: 500, success: false, msg: 'Failed to create user' })
  }
})

app.put('/api/user/:id', (req, res) => {
  try {
    const { id } = req.params
    const { password, nickname, email, role, status, permissions } = req.body

    const existingUser = UserModel.getById(id)
    if (!existingUser) {
      return res.status(404).json({ code: 404, success: false, msg: 'User not found' })
    }

    UserModel.update(id, {
      password,
      nickname,
      email,
      role,
      status,
      permissions
    })

    res.json({
      code: 200,
      success: true,
      msg: 'success'
    })
  } catch (error) {
    console.error('[USER] Error updating user:', error)
    res.status(500).json({ code: 500, success: false, msg: 'Failed to update user' })
  }
})

app.delete('/api/user/:id', (req, res) => {
  try {
    const { id } = req.params

    if (id === 'admin') {
      return res.status(400).json({ code: 400, success: false, msg: 'Cannot delete admin user' })
    }

    const existingUser = UserModel.getById(id)
    if (!existingUser) {
      return res.status(404).json({ code: 404, success: false, msg: 'User not found' })
    }

    UserModel.delete(id)

    res.json({
      code: 200,
      success: true,
      msg: 'success'
    })
  } catch (error) {
    console.error('[USER] Error deleting user:', error)
    res.status(500).json({ code: 500, success: false, msg: 'Failed to delete user' })
  }
})

app.get('/api/user/:id/proxies', (req, res) => {
  try {
    const { id } = req.params

    const user = UserModel.getById(id)
    if (!user) {
      return res.status(404).json({ code: 404, success: false, msg: 'User not found' })
    }

    const proxies = UserModel.getUserProxies(id)
    const formattedProxies = proxies.map(proxy => ({
      token: proxy.token,
      phone: proxy.phone,
      targetUrl: proxy.target_url,
      expireTime: proxy.expire_time,
      expiredDate: formatExpiredDate(proxy.expire_time),
      status: proxy.status
    }))

    res.json({
      code: 200,
      success: true,
      msg: 'success',
      data: formattedProxies
    })
  } catch (error) {
    console.error('[USER] Error getting user proxies:', error)
    res.status(500).json({ code: 500, success: false, msg: 'Failed to get user proxies' })
  }
})

app.post('/api/user/:id/assign-proxies', (req, res) => {
  try {
    const { id } = req.params
    const { proxies } = req.body

    const user = UserModel.getById(id)
    if (!user) {
      return res.status(404).json({ code: 404, success: false, msg: 'User not found' })
    }

    if (!Array.isArray(proxies)) {
      return res.status(400).json({ code: 400, success: false, msg: 'Proxies must be an array' })
    }

    UserModel.assignProxiesToUser(id, proxies)

    res.json({
      code: 200,
      success: true,
      msg: 'success'
    })
  } catch (error) {
    console.error('[USER] Error assigning proxies:', error)
    res.status(500).json({ code: 500, success: false, msg: 'Failed to assign proxies' })
  }
})

app.get('/api/stats', (req, res) => {
  try {
    const userStats = {
      total: UserModel.getAll().length,
      active: UserModel.getAll().filter(u => u.status === 'active').length
    }

    const proxyStats = ProxyModel.getStats()

    res.json({
      code: 200,
      success: true,
      msg: 'success',
      data: {
        users: userStats,
        proxies: proxyStats
      }
    })
  } catch (error) {
    console.error('[STATS] Error getting stats:', error)
    res.status(500).json({ code: 500, success: false, msg: 'Failed to get stats' })
  }
})

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() })
})

const distPath = path.join(__dirname, '..', 'dist')
if (fs.existsSync(distPath)) {
  console.log(`[SERVER] Serving static files from: ${distPath}`)
  app.use(express.static(distPath))
  
  app.get('*', (req, res) => {
    const indexPath = path.join(distPath, 'index.html')
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath)
    } else {
      res.status(404).send('Frontend not built yet. Please run: npm run build')
    }
  })
} else {
  console.log('[SERVER] Warning: dist folder not found. Frontend not deployed.')
  console.log('[SERVER] To deploy frontend, run: npm run build')
}

const server = app.listen(PORT, () => {
  console.log(`[PROXY] Server running on http://localhost:${PORT}`)
  console.log(`[PROXY] Database: SQLite (${require('path').join(__dirname, '../data/app.db')})`)
  console.log(`[PROXY] Create proxy: POST /api/proxy/create`)
  console.log(`[PROXY] List proxies: GET /api/proxy/list`)
  console.log(`[PROXY] User management: GET /api/user/list`)
  console.log(`[PROXY] Stats: GET /api/stats`)
})

process.on('SIGTERM', () => {
  console.log('[PROXY] SIGTERM received, closing server...')
  server.close(() => {
    console.log('[PROXY] Server closed')
    process.exit(0)
  })
})

module.exports = { app, server }
