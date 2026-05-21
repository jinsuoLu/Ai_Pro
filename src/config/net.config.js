/**
 * @description 导出默认网路配置
 **/

// 部署模式配置
// - 'local': 本地开发模式，前端和后端都在本地运行
// - 'github': GitHub Pages 部署模式，前端在 GitHub Pages，后端需要单独部署
const DEPLOY_MODE = process.env.VUE_APP_DEPLOY_MODE || 'github'

// 后端服务器地址（用于 GitHub Pages 部署模式）
const BACKEND_SERVER_URL = process.env.VUE_APP_BACKEND_URL || 'https://ai-pro-9ceb.onrender.com'

let baseURL

if (process.env.NODE_ENV === 'development') {
  // 开发环境：使用本地后端服务器
  baseURL = 'http://localhost:3001'
} else {
  // 生产环境：使用 Render 后端服务器
  baseURL = BACKEND_SERVER_URL
}

const network = {
  // 默认的接口地址
  baseURL,
  // 配后端数据的接收方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
  contentType: 'application/json;charset=UTF-8',
  //消息框消失时间
  messageDuration: 3000,
  //最长请求时间
  requestTimeout: 15000,
  //操作正常code，支持String、Array、int多种类型
  successCode: [200, 0],
  //登录失效code
  invalidCode: 402,
  //无权限code
  noPermissionCode: 401,
  // 后端服务器地址（用于 GitHub Pages 部署模式）
  backendServerUrl: BACKEND_SERVER_URL,
}
module.exports = network
