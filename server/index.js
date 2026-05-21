const express = require('express')
const cors = require('cors')
const { createProxyMiddleware } = require('http-proxy-middleware')
const crypto = require('crypto')

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAMFPa+v52FkSUXvcUnrGI/XzW3EpZRI0s9BCWJ3oNQmEYA5luWW5p8h0uadTIoTyYweFPdH4hveyxlwmS7oefvbIdiP+o+QIYW/R4Wjsb4Yl8MhR4PJqUE3RCy6IT9fM8ckG4kN9ECs6Ja8fQFc6/mSl5dJczzJO3k1rWMBhKJD/AgMBAAECgYEAucMakH9dWeryhrYoRHcXo4giPVJsH9ypVt4KzmOQY/7jV7KFQK3x//27UoHfUCak51sxFw9ek7UmTPM4HjikA9LkYeE7S381b4QRvFuf3L6IbMP3ywJnJ8pPr2l5SqQ00W+oKv+w/VmEsyUHr+k4Z+4ik+FheTkVWp566WbqFsECQQDjYaMcaKw3j2Zecl8T6eUe7fdaRMIzp/gcpPMfT/9rDzIQk+7ORvm1NI9AUmFv/FAlfpuAMrdL2n7p9uznWb7RAkEA2aP934kbXg5bdV0R313MrL+7WTK/qdcYxATUbMsMuWWQBoS5irrt80WCZbG48hpocJavLNjbtrjmUX3CuJBmzwJAOJg8uP10n/+ZQzjEYXh+BszEHDuw+pp8LuT/fnOy5zrJA0dO0RjpXijO3vuiNPVgHXT9z1LQPJkNrb5ACPVVgQJBALPeb4uV0bNrJDUb5RB4ghZnIxv18CcaqNIft7vuGCcFBAIPIRTBprR+RuVq+xHDt3sNXdsvom4h49+Hky1b0ksCQBBwUtVaqH6ztCtwUF1j2c/Zcrt5P/uN7IHAd44K0gIJc1+Csr3qPG+G2yoqRM8KVqLI8Z2ZYn9c+AvEE+L9OQY=
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
const { tokenManager } = require('./tokenManager')
const { timeLimitService } = require('./timeLimitService')
const path = require('path')

const app = express()
const PORT = process.env.PROXY_PORT || 3001

app.use(cors())
app.use(express.json({ limit: '50mb' }))

const accessTokens = {
  admin: 'admin-accessToken',
  editor: 'editor-accessToken',
  test: 'test-accessToken'
}

const validUsers = {
  admin: { password: '123456', role: 'admin' },
  editor: { password: '123456', role: 'editor' },
  test: { password: '123456', role: 'test' }
}

const userStore = new Map()
const userProxyMap = new Map()
const imageStore = new Map()

function initUsers() {
  userStore.set('admin', {
    id: 'admin',
    username: 'admin',
    password: '123456',
    nickname: '管理员',
    role: 'admin',
    status: 'active',
    createdAt: Date.now(),
  })
  userProxyMap.set('admin', [])
}

initUsers()

function generateUserId() {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

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

  let user = validUsers[username]
  let userId = null
  
  if (!user || user.password !== password) {
    user = userStore.get(username)
    if (user) {
      userId = username
    } else {
      userStore.forEach((u, id) => {
        if (u.username === username && u.password === password) {
          user = u
          userId = id
        }
      })
    }
    
    if (!user || user.password !== password) {
      return res.status(401).json({ code: 500, msg: '帐户或密码不正确' })
    }
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

  res.json({
    code: 200,
    msg: 'success',
    data: {
      username,
      roles: [username === 'admin' ? 'admin' : 'editor'],
      permissions: ['admin', 'editor'],
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

const activeProxies = new Map()

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

function createProxyToken(phone, targetUrl, expireMinutes, imageBase64 = '') {
  const token = generateToken()
  const expireTime = Date.now() + expireMinutes * 60 * 1000

  tokenManager.addToken(token, {
    phone,
    targetUrl,
    expireTime,
    createdAt: Date.now(),
    captchaCode: '',
    captchaTime: '',
    imageBase64
  })

  const proxyPath = `/proxy/${token}`
  const proxyUrl = `http://localhost:${PORT}${proxyPath}`

  activeProxies.set(token, {
    phone,
    targetUrl,
    expireTime,
    path: proxyPath,
    captchaCode: '',
    captchaTime: '',
    imageBase64
  })

  console.log(`[PROXY] Created proxy token: ${token}`)
  console.log(`[PROXY] Phone: ${phone || 'N/A'}`)
  console.log(`[PROXY] Target: ${targetUrl}`)
  console.log(`[PROXY] Expires at: ${formatExpiredDate(expireTime)}`)
  console.log(`[PROXY] Has image: ${!!imageBase64}`)

  return {
    token,
    phone,
    proxyUrl,
    expireTime,
    expireMinutes,
    expiredDate: formatExpiredDate(expireTime),
    captchaCode: '',
    captchaTime: '',
    imageBase64
  }
}

function cleanupExpiredProxies() {
  const now = Date.now()
  for (const [token, data] of activeProxies.entries()) {
    if (data.expireTime <= now) {
      activeProxies.delete(token)
      tokenManager.removeToken(token)
      console.log(`[PROXY] Cleaned up expired token: ${token}`)
    }
  }
}

setInterval(cleanupExpiredProxies, 60000)

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
      data: {
        imageId
      }
    })
  } catch (error) {
    console.error('[IMAGE] Error uploading image:', error)
    res.status(500).json({ code: 500, success: false, msg: 'Failed to upload image' })
  }
})

app.post('/api/proxy/create', (req, res) => {
  try {
    const { phone, targetUrl, expireMinutes = 60, imageId = '' } = req.body

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
    
    const result = createProxyToken(phone, targetUrl, expireMinutesNum, imageBase64)

    res.json({
      code: 200,
      success: true,
      msg: 'success',
      data: result
    })
  } catch (error) {
    console.error('[PROXY] Error creating proxy:', error)
    res.status(500).json({ code: 500, success: false, msg: 'Failed to create proxy' })
  }
})

app.get('/api/proxy/list', (req, res) => {
  try {
    const now = Date.now()
    const proxies = []

    for (const [token, data] of activeProxies.entries()) {
      proxies.push({
        token,
        phone: data.phone || '',
        apiUrl: data.targetUrl,
        expireTime: data.expireTime,
        expiredDate: formatExpiredDate(data.expireTime),
        remainingTime: Math.max(0, data.expireTime - now),
        isExpired: data.expireTime <= now,
        captchaCode: data.captchaCode || '',
        captchaTime: data.captchaTime || ''
      })
    }

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
    const { items, imageId = '' } = req.body

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
        const result = createProxyToken(phone, targetUrl, expireMinutesNum, imageBase64)
        results.push(result)
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

    const success = tokenManager.extendToken(token, parseInt(additionalMinutes))

    if (success) {
      const tokenData = tokenManager.getToken(token)
      if (tokenData && activeProxies.has(token)) {
        activeProxies.get(token).expireTime = tokenData.expireTime
      }
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
    const existed = activeProxies.delete(token)
    tokenManager.removeToken(token)

    res.json({ code: 200, success: true, deleted: existed, msg: 'success' })
  } catch (error) {
    console.error('[PROXY] Error deleting proxy:', error)
    res.status(500).json({ code: 500, success: false, msg: 'Failed to delete proxy' })
  }
})

app.post('/api/proxy/refresh-captcha', (req, res) => {
  try {
    const { token } = req.body

    if (!token || !activeProxies.has(token)) {
      return res.status(400).json({ code: 400, success: false, msg: 'Invalid token' })
    }

    const proxyData = activeProxies.get(token)

    if (proxyData.expireTime <= Date.now()) {
      activeProxies.delete(token)
      tokenManager.removeToken(token)
      return res.status(400).json({ code: 400, success: false, msg: 'Token expired' })
    }

    const targetUrl = proxyData.targetUrl
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
              proxyData.captchaCode = code
              proxyData.captchaTime = parsed.data.code_time || formatExpiredDate(Date.now())
              activeProxies.set(token, proxyData)

              const tokenData = tokenManager.getToken(token)
              if (tokenData) {
                tokenData.captchaCode = proxyData.captchaCode
                tokenData.captchaTime = proxyData.captchaTime
              }
            }
          }

          res.json({
            code: 200,
            success: true,
            msg: 'success',
            data: {
              token,
              proxyUrl: `http://localhost:${PORT}/proxy/${token}`,
              expiredDate: formatExpiredDate(proxyData.expireTime),
              code: proxyData.captchaCode || '',
              code_time: proxyData.captchaTime || ''
            }
          })
        } catch (e) {
          console.error('[PROXY] Error parsing response:', e)
          res.json({
            code: 200,
            success: true,
            msg: 'success',
            data: {
              token,
              proxyUrl: `http://localhost:${PORT}/proxy/${token}`,
              expiredDate: formatExpiredDate(proxyData.expireTime),
              code: proxyData.captchaCode || '',
              code_time: proxyData.captchaTime || ''
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
          expiredDate: formatExpiredDate(proxyData.expireTime),
          code: proxyData.captchaCode || '',
          code_time: proxyData.captchaTime || ''
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

  if (!activeProxies.has(token)) {
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

  const proxyData = activeProxies.get(token)

  if (proxyData.expireTime <= Date.now()) {
    activeProxies.delete(token)
    tokenManager.removeToken(token)
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

  const remainingSeconds = Math.max(0, Math.floor((proxyData.expireTime - Date.now()) / 1000))
  
  const html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>授权API - 验证码获取</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
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
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
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
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .info-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
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
    .info-value.phone {
      font-family: 'SF Mono', 'Consolas', monospace;
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
    .captcha-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
      animation: shine 3s infinite;
    }
    @keyframes shine {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
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
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }
    .refresh-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s;
    }
    .refresh-btn:hover::before {
      left: 100%;
    }
    .refresh-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
    }
    .refresh-btn:active {
      transform: translateY(-1px);
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
      box-shadow: 0 10px 40px rgba(102, 126, 234, 0.25);
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
      letter-spacing: 0.5px;
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
      transition: all 0.3s ease;
    }
    .image-wrapper .image-container:hover {
      border-color: rgba(255, 255, 255, 0.4);
      background: rgba(255, 255, 255, 0.15);
    }
    .image-wrapper .display-image {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      cursor: pointer;
      transition: transform 0.3s ease;
    }
    .image-wrapper .display-image:hover {
      transform: scale(1.05);
    }
    .image-wrapper .no-image {
      color: rgba(255, 255, 255, 0.6);
      font-size: 13px;
      font-weight: 500;
    }
    .image-wrapper .image-hint {
      color: rgba(255, 255, 255, 0.7);
      font-size: 11px;
      margin-top: 10px;
      font-weight: 500;
    }
    .image-modal {
      display: none;
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.92);
      backdrop-filter: blur(10px);
    }
    .modal-content {
      margin: auto;
      display: block;
      max-width: 90%;
      max-height: 85%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation: zoomIn 0.3s ease-out;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    }
    @keyframes zoomIn {
      from {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.7);
      }
      to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
    }
    .modal-close {
      position: absolute;
      top: 30px;
      right: 40px;
      color: #fff;
      font-size: 45px;
      font-weight: 300;
      cursor: pointer;
      transition: all 0.3s ease;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
    }
    .modal-close:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: rotate(90deg);
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
      letter-spacing: 0.5px;
    }
    .guide-wrapper .guide-content {
      flex: 1;
    }
    .guide-wrapper .guide-step {
      padding: 8px 0;
      font-size: 12px;
      line-height: 1.6;
      border-bottom: 1px dashed rgba(255, 255, 255, 0.15);
      font-weight: 500;
      transition: all 0.2s ease;
    }
    .guide-wrapper .guide-step:hover {
      padding-left: 4px;
      color: rgba(255, 255, 255, 1);
    }
    .guide-wrapper .guide-step:last-child {
      border-bottom: none;
    }
    .guide-wrapper .guide-note {
      font-size: 11px;
      opacity: 0.85;
      margin-top: 12px;
      padding-top: 10px;
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      font-weight: 500;
    }
    .timer-section {
      text-align: center;
      padding: 20px;
      background: linear-gradient(135deg, #fff9e6 0%, #fff3cd 100%);
      border-radius: 16px;
      border: 1px solid rgba(255, 193, 7, 0.2);
      margin-bottom: 20px;
      box-shadow: 0 4px 15px rgba(255, 193, 7, 0.1);
    }
    .timer-label {
      color: #856404;
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .timer-value {
      font-family: 'SF Mono', 'Consolas', monospace;
      font-size: 24px;
      font-weight: 700;
      background: linear-gradient(135deg, #ff9500, #ff6b00);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-top: 8px;
    }
    .footer {
      text-align: center;
      margin-top: 24px;
      color: #888;
      font-size: 12px;
      font-weight: 500;
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
        <span class="info-value phone">${proxyData.phone || '未绑定'}</span>
      </div>
    </div>

    <div class="captcha-section">
      <div class="captcha-label">当前验证码</div>
      <div id="captcha-display">
        ${proxyData.captchaCode ? `<div class="captcha-code">${proxyData.captchaCode}</div>` : '<div class="captcha-empty">暂无验证码</div>'}
      </div>
      ${proxyData.captchaTime ? `<div class="captcha-time">获取时间: ${proxyData.captchaTime}</div>` : ''}
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
          ${proxyData.imageBase64 ? `<img src="${proxyData.imageBase64}" alt="图片" class="display-image" onclick="zoomImage(this)" />` : '<div class="no-image">暂无图片</div>'}
        </div>
        <div class="image-hint">点击图片放大查看</div>
      </div>
      <div class="guide-wrapper">
        <div class="guide-title">如何使用</div>
        <div class="guide-content">
          <div class="guide-step">1. 打开应用（腾讯视频APP）→ 手机号登陆</div>
          <div class="guide-step">2. 将+86改成【美国+1】，粘贴手机号获取</div>
          <div class="guide-step">3. 返回本页面获取验证码</div>
          <div class="guide-step">4. 复制验证码到软件内登录即可</div>
        </div>
        <div class="guide-note">说明：请确保在有效期内完成登录操作</div>
      </div>
    </div>

    <div id="image-modal" class="image-modal" onclick="closeModal()">
      <span class="modal-close" onclick="closeModal()">×</span>
      <img class="modal-content" id="modal-image">
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
            captchaDisplay.innerHTML = '<div class="captcha-code">' + data.data.code + '</div>';
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
        btnContent.textContent = '🔄 刷新验证码';
      });
    }

    timerInterval = setInterval(updateTimer, 1000);
    updateTimer();

    setInterval(refreshCaptcha, 10000);

    function zoomImage(img) {
      const modal = document.getElementById('image-modal');
      const modalImg = document.getElementById('modal-image');
      modal.style.display = 'block';
      modalImg.src = img.src;
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      const modal = document.getElementById('image-modal');
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeModal();
      }
    });
  </script>
</body>
</html>
  `

  res.setHeader('Content-Type', 'text/html')
  res.end(html)
})

app.post('/proxy/:token', (req, res) => {
  const { token } = req.params

  if (!activeProxies.has(token)) {
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

  const proxyData = activeProxies.get(token)

  if (proxyData.expireTime <= Date.now()) {
    activeProxies.delete(token)
    tokenManager.removeToken(token)
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

  const expiredDateStr = formatExpiredDate(proxyData.expireTime)

  const proxy = createProxyMiddleware({
    target: proxyData.targetUrl,
    changeOrigin: true,
    pathRewrite: {
      [`^/proxy/${token}`]: ''
    },
    selfHandleResponse: true,
    onProxyReq: (proxyReq, req) => {
      proxyReq.setHeader('X-Proxy-Token', token)
      proxyReq.setHeader('X-Proxy-Phone', proxyData.phone || '')
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
              proxyData.captchaCode = code
              proxyData.captchaTime = parsed.data.code_time || formatExpiredDate(Date.now())
              activeProxies.set(token, proxyData)
              
              const tokenData = tokenManager.getToken(token)
              if (tokenData) {
                tokenData.captchaCode = proxyData.captchaCode
                tokenData.captchaTime = proxyData.captchaTime
              }
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

  proxy(req, res)
})

app.get('/api/proxy/timer', (req, res) => {
  const { token } = req.query
  
  if (!token || !activeProxies.has(token)) {
    return res.json({ code: 400, success: false, msg: 'Invalid token' })
  }

  const proxyData = activeProxies.get(token)
  const remainingSeconds = Math.max(0, Math.floor((proxyData.expireTime - Date.now()) / 1000))

  res.json({
    code: 200,
    success: true,
    msg: 'success',
    remainingSeconds
  })
})

app.get('/api/user/list', (req, res) => {
  try {
    const users = []
    userStore.forEach((user, id) => {
      const proxyTokens = userProxyMap.get(id) || []
      users.push({
        id: user.id,
        username: user.username,
        nickname: user.nickname,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
        proxyCount: proxyTokens.length,
      })
    })
    res.json({
      code: 200,
      success: true,
      msg: 'success',
      data: users,
    })
  } catch (error) {
    console.error('[USER] Error listing users:', error)
    res.status(500).json({ code: 500, success: false, msg: 'Failed to list users' })
  }
})

app.post('/api/user/create', (req, res) => {
  try {
    const { username, password, nickname, role = 'user' } = req.body

    if (!username || !password || !nickname) {
      return res.status(400).json({ code: 400, success: false, msg: 'Missing required fields' })
    }

    if (userStore.has(username)) {
      return res.status(400).json({ code: 400, success: false, msg: 'Username already exists' })
    }

    const userId = generateUserId()
    const newUser = {
      id: userId,
      username,
      password,
      nickname,
      role,
      status: 'active',
      createdAt: Date.now(),
    }

    userStore.set(userId, newUser)
    userProxyMap.set(userId, [])

    res.json({
      code: 200,
      success: true,
      msg: 'success',
      data: {
        id: userId,
        username,
        nickname,
        role,
        status: 'active',
        createdAt: newUser.createdAt,
      },
    })
  } catch (error) {
    console.error('[USER] Error creating user:', error)
    res.status(500).json({ code: 500, success: false, msg: 'Failed to create user' })
  }
})

app.put('/api/user/:id', (req, res) => {
  try {
    const { id } = req.params
    const { password, nickname, role, status } = req.body

    if (!userStore.has(id)) {
      return res.status(404).json({ code: 404, success: false, msg: 'User not found' })
    }

    const user = userStore.get(id)

    if (password) {
      user.password = password
    }
    if (nickname) {
      user.nickname = nickname
    }
    if (role) {
      user.role = role
    }
    if (status) {
      user.status = status
    }

    userStore.set(id, user)

    res.json({
      code: 200,
      success: true,
      msg: 'success',
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

    if (!userStore.has(id)) {
      return res.status(404).json({ code: 404, success: false, msg: 'User not found' })
    }

    userStore.delete(id)
    userProxyMap.delete(id)

    res.json({
      code: 200,
      success: true,
      msg: 'success',
    })
  } catch (error) {
    console.error('[USER] Error deleting user:', error)
    res.status(500).json({ code: 500, success: false, msg: 'Failed to delete user' })
  }
})

app.get('/api/user/:id/proxies', (req, res) => {
  try {
    const { id } = req.params

    if (!userStore.has(id)) {
      return res.status(404).json({ code: 404, success: false, msg: 'User not found' })
    }

    const proxyTokens = userProxyMap.get(id) || []
    const proxies = []

    proxyTokens.forEach(token => {
      if (activeProxies.has(token)) {
        const proxyData = activeProxies.get(token)
        proxies.push({
          token,
          phone: proxyData.phone,
          targetUrl: proxyData.targetUrl,
          expireTime: proxyData.expireTime,
          expiredDate: formatExpiredDate(proxyData.expireTime),
        })
      }
    })

    res.json({
      code: 200,
      success: true,
      msg: 'success',
      data: proxies,
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

    if (!userStore.has(id)) {
      return res.status(404).json({ code: 404, success: false, msg: 'User not found' })
    }

    if (!Array.isArray(proxies)) {
      return res.status(400).json({ code: 400, success: false, msg: 'Proxies must be an array' })
    }

    const validTokens = []
    proxies.forEach(token => {
      if (activeProxies.has(token)) {
        validTokens.push(token)
      }
    })

    userProxyMap.set(id, validTokens)

    res.json({
      code: 200,
      success: true,
      msg: 'success',
    })
  } catch (error) {
    console.error('[USER] Error assigning proxies:', error)
    res.status(500).json({ code: 500, success: false, msg: 'Failed to assign proxies' })
  }
})

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() })
})

const server = app.listen(PORT, () => {
  console.log(`[PROXY] Proxy server running on http://localhost:${PORT}`)
  console.log(`[PROXY] Create proxy endpoint: POST /api/proxy/create`)
  console.log(`[PROXY] List proxies endpoint: GET /api/proxy/list`)
  console.log(`[PROXY] User management endpoint: GET /api/user/list`)
})

process.on('SIGTERM', () => {
  console.log('[PROXY] SIGTERM received, closing server...')
  server.close(() => {
    console.log('[PROXY] Server closed')
    process.exit(0)
  })
})

module.exports = { app, server }
