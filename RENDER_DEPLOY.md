# Render 部署指南

## 项目概述

本项目是一个前后端一体的 Vue.js + Express.js 应用，使用 SQLite 数据库存储数据。

## Render 平台特性

### ✅ 支持的功能
- Node.js 运行时环境
- 自动部署（Git 集成）
- 免费套餐（Free Plan）
- 健康检查
- 环境变量管理
- SQLite 数据库（Render Disk）

### ⚠️ 免费套餐限制
- 服务在无流量 15 分钟后进入休眠
- 首次访问可能需要 30 秒启动
- 单个 PostgreSQL 数据库（免费）
- 100GB 带宽/月

## 部署方式

### 方式一：通过 Render Dashboard 部署

#### 步骤 1：创建 GitHub 仓库
```bash
# 初始化 Git 仓库（如果还没有）
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

#### 步骤 2：在 Render 上创建服务

1. 访问 [Render Dashboard](https://dashboard.render.com/)
2. 点击 **"New +"** → **"Web Service"**
3. 连接您的 GitHub 仓库
4. 配置以下设置：

**Basic Settings:**
- **Name**: `vue-admin-better`
- **Region**: Singapore（推荐亚太用户）
- **Branch**: `main`
- **Runtime**: `Node`
- **Build Command**: 
  ```bash
  npm install && npm install --prefix server && npm run build
  ```
- **Start Command**: 
  ```bash
  node server/index.js
  ```

**Environment:**
- **Node Version**: `18` 或 `20`

**Environment Variables:**
- `NODE_ENV` = `production`
- `PORT` = `10000`（Render 会自动分配）

#### 步骤 3：创建数据库（可选）

如果您需要持久化数据库：
1. 点击 **"New +"** → **"PostgreSQL"**
2. 配置数据库名称
3. 在 Web Service 的 Environment Variables 中添加：
   - `DATABASE_URL` = （从数据库连接信息获取）

#### 步骤 4：部署

1. 点击 **"Create Web Service"**
2. 等待构建和部署完成
3. 访问您的服务 URL

### 方式二：通过 render.yaml 部署（基础设施即代码）

项目已包含 `render.yaml` 配置文件，可以一键部署。

#### 使用 Render CLI 部署

```bash
# 安装 Render CLI
npm install -g @render/cli

# 登录
render login

# 部署
render deploy
```

## 配置说明

### 环境变量

| 变量名 | 说明 | 本地值 | 生产值 |
|--------|------|--------|--------|
| `NODE_ENV` | 运行环境 | `development` | `production` |
| `PORT` | 服务端口 | `3001` | 自动分配 |
| `PROXY_PORT` | 代理端口 | `3001` | 同 PORT |
| `DATABASE_PATH` | 数据库路径 | `data/app.db` | `/var/data/app.db` |

### CORS 配置

生产环境已配置支持所有来源和必要的方法头。

### 静态文件

前端构建文件会自动从 `dist` 目录提供静态服务。

## 访问地址

部署成功后，您的服务将在以下地址可用：
```
https://vue-admin-better.onrender.com
```

## 数据库注意事项

### SQLite vs PostgreSQL

当前项目使用 **SQLite**，但 Render 免费套餐提供的是 **PostgreSQL**。

#### 选项 1：继续使用 SQLite（推荐用于小型项目）
- SQLite 数据文件存储在 Render Disk
- 免费且无需额外配置
- 适合数据量 < 1GB 的应用

#### 选项 2：迁移到 PostgreSQL
如果需要 PostgreSQL，需要：
1. 安装 `pg` 包：`npm install pg`
2. 修改 `server/database.js` 使用 PostgreSQL
3. 添加环境变量：`DATABASE_URL`

## 故障排查

### 构建失败
- 检查 `npm install` 是否成功
- 确认 Node 版本兼容性
- 查看构建日志中的具体错误

### 运行时错误
- 检查环境变量是否正确设置
- 确认端口配置（Render 使用 PORT 环境变量）
- 查看服务日志

### 数据库连接错误
- 确认数据库服务已启动
- 检查 `DATABASE_URL` 是否正确
- 验证数据库凭证

## 性能优化

### 冷启动优化
免费套餐服务会休眠，首次访问可能较慢。

**建议：**
1. 使用 Uptime Robot 等工具定期 ping
2. 升级到付费套餐（$7/月）
3. 添加缓存层

### 静态资源
- 前端资源已压缩
- 启用 Render 的 CDN 加速
- 考虑使用对象存储（如 AWS S3）存储大文件

## 监控与日志

### 查看日志
```bash
# 使用 Render CLI
render logs -s vue-admin-better
```

### 健康检查
服务已配置 `/health` 端点：
```bash
curl https://vue-admin-better.onrender.com/health
```

## 安全建议

### ✅ 已实现
- CORS 跨域配置
- 环境变量管理敏感信息
- 生产环境日志脱敏

### ⚠️ 需要注意
1. **更换 RSA 密钥对**（当前使用示例密钥）
2. **设置强密码**（更改默认用户密码）
3. **启用 HTTPS**（Render 自动提供）
4. **限制管理接口访问**（添加 IP 白名单）

## 扩展阅读

- [Render 官方文档](https://render.com/docs)
- [Node.js 部署最佳实践](https://render.com/docs/deploy-node-express-app)
- [SQLite vs PostgreSQL](https://render.com/docs/using-node-postgres)

## 支持

如有问题，请：
1. 查看 [Render 社区](https://community.render.com/)
2. 检查服务日志
3. 提交 GitHub Issue

---

**祝部署成功！** 🚀
