# GitHub Pages 部署教程（方法一）

## 一、部署方案选择

### 方案对比

| 方案 | 成本 | 优点 | 缺点 | 推荐场景 |
|------|------|------|------|----------|
| **Render**（推荐） | 免费版可用 | 自动部署、稳定、亚洲节点 | 15分钟休眠 | 测试/个人使用 |
| **Railway** | $5/月额度 | 速度快、配置简单 | 免费额度有限 | 小型生产环境 |
| **Glitch** | 完全免费 | 无需配置、在线编辑 | 5分钟休眠、较慢 | 快速测试 |
| **自建服务器** | 付费 | 完全可控、高性能 | 需要运维 | 大型生产环境 |

**推荐选择**：**Render**（免费版足够个人使用）

---

## 二、免费后端部署：Render（推荐）

Render 是一个现代化的应用部署平台，提供免费的 Node.js 托管服务。

### 2.1 准备工作

1. 确保代码已推送到 GitHub 仓库
2. 注册 Render 账号：https://render.com（使用 GitHub 登录）

### 2.2 创建 Web Service

1. 登录 Render 后，点击顶部 **New** → **Web Service**

2. **连接 GitHub 仓库**：
   - 在仓库列表中找到你的项目
   - 点击 **Connect**

3. **配置部署参数**：

| 配置项 | 推荐值 | 说明 |
|--------|--------|------|
| **Name** | `proxy-api` | 自定义应用名称 |
| **Region** | `Singapore` | 亚洲最近区域 |
| **Branch** | `main` | 要部署的分支 |
| **Root Directory** | `server` | 后端代码目录 |
| **Build Command** | `npm install` | 安装依赖命令 |
| **Start Command** | `node index.js` | 启动应用命令 |
| **Instance Type** | **Free** | 选择免费版 |

4. **高级配置（可选）**：
   - 点击 **Advanced** → **Add Environment Variable**
   - 添加环境变量（如需要）

5. 点击 **Create Web Service**

### 2.3 等待部署

部署过程大约需要 2-3 分钟，完成后：
- 应用状态变为 **Live**
- 获取访问地址：`https://your-app-name.onrender.com`

### 2.4 自动部署

Render 默认开启 **Auto-Deploy**，当你向 GitHub 推送代码时：
1. GitHub 发送 Webhook 通知 Render
2. Render 自动拉取最新代码
3. 重新构建并部署

### 2.5 验证后端

访问 `https://your-app-name.onrender.com/api/proxy/list`，应返回：
```json
{"code":200,"data":[],"msg":"success"}
```

---

## 三、前端 GitHub Pages 部署

### 3.1 配置环境变量

编辑 `.env.github` 文件：

```env
VUE_APP_DEPLOY_MODE=github
VUE_APP_GITHUB_REPO=your-repo-name
VUE_APP_BACKEND_URL=https://your-app-name.onrender.com
```

### 3.2 构建前端

**方法一**：双击运行 `build:github.bat`

**方法二**：手动执行：
```bash
set VUE_APP_DEPLOY_MODE=github
set VUE_APP_GITHUB_REPO=your-repo-name
set VUE_APP_BACKEND_URL=https://your-app-name.onrender.com
npm run build
```

### 3.3 推送到 GitHub Pages

#### 方式一：GitHub Actions 自动部署（推荐）

项目已包含 `.github/workflows/deploy.yml`，自动构建部署到 `gh-pages` 分支。

#### 方式二：手动部署

```bash
cd dist
git init
git checkout -b gh-pages
git add .
git commit -m "Deploy to GitHub Pages"
git remote add origin https://github.com/yourname/your-repo.git
git push -u origin gh-pages --force
```

### 3.4 开启 GitHub Pages

1. 进入 GitHub 仓库 → **Settings** → **Pages**
2. **Source** 选择 `gh-pages` 分支
3. 等待部署完成，访问地址：`https://yourname.github.io/your-repo-name/`

---

## 四、自建服务器部署（可选）

### 2.4 安装后端依赖

```bash
cd server
npm install
```

### 2.5 配置后端

编辑 `server/index.js` 中的 CORS 配置（第48行左右）：
```javascript
// 如果只需要允许特定域名访问，请将 * 改为具体域名
// 例如：ctx.set('Access-Control-Allow-Origin', 'https://yourname.github.io')
ctx.set('Access-Control-Allow-Origin', '*')  // 允许所有域名访问（测试环境）
ctx.set('Access-Control-Allow-Credentials', 'true')
```

### 2.6 启动后端服务

#### 开发环境测试：
```bash
node index.js
```

#### 生产环境守护进程（推荐使用 PM2）：

```bash
# 全局安装 PM2
npm install -g pm2

# 启动服务
pm2 start index.js --name proxy-api

# 设置开机自启
pm2 startup
pm2 save

# 查看状态
pm2 list
pm2 logs proxy-api
```

#### 使用 PM2 常用命令：
```bash
pm2 stop proxy-api      # 停止服务
pm2 restart proxy-api   # 重启服务
pm2 delete proxy-api    # 删除服务
pm2 monit               # 监控面板
```

### 2.7 配置 Nginx 反向代理（可选但推荐）

安装 Nginx：
```bash
# Ubuntu/Debian
sudo apt-get install nginx

# CentOS
sudo yum install nginx
```

配置 Nginx：
```bash
sudo nano /etc/nginx/sites-available/default
```

添加以下配置：
```nginx
server {
    listen 80;
    server_name your-domain.com;  # 你的域名或IP

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

测试并重启 Nginx：
```bash
sudo nginx -t
sudo systemctl restart nginx
```

### 2.8 申请 SSL 证书（推荐使用 Let's Encrypt）

```bash
# Ubuntu/Debian
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

配置完成后，后端 API 地址将是：`https://your-domain.com`

---

## 三、前端 GitHub Pages 部署

### 3.1 创建 GitHub 仓库

1. 登录 GitHub：https://github.com
2. 点击右上角 **+** → **New repository**
3. 填写仓库信息：
   - Repository name: `vue-admin-better`（或你喜欢的名字）
   - Description: `管理后台`
   - 选择 **Public**（GitHub Pages 免费版只支持公开仓库）
   - 勾选 **Add a README file**
4. 点击 **Create repository**

### 3.2 上传项目代码到 GitHub

#### 方式一：使用 Git（推荐）

```bash
# 在项目根目录下初始化 Git（如果还没有初始化）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/你的仓库名.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

#### 方式二：使用 GitHub Desktop

1. 下载 GitHub Desktop：https://desktop.github.com/
2. 登录你的 GitHub 账号
3. 点击 **File** → **Add Local Repository**
4. 选择你的项目文件夹
5. 点击 **Publish repository** 推送到 GitHub

### 3.3 配置 .env.github 文件

编辑项目根目录下的 `.env.github` 文件：

```env
# GitHub Pages 部署配置
# 部署模式：github 表示 GitHub Pages 部署
VUE_APP_DEPLOY_MODE=github

# GitHub 仓库名称（必须与你的仓库名完全一致，区分大小写）
VUE_APP_GITHUB_REPO=vue-admin-better

# 后端服务器地址（替换为你部署的后端服务器地址）
# 如果后端部署在国内服务器且没有域名，直接使用 IP 地址
# 格式：http://IP地址:端口号 或 https://域名
VUE_APP_BACKEND_URL=http://localhost:3001
```

**重要配置说明：**

| 配置项 | 说明 | 示例 |
|--------|------|------|
| `VUE_APP_GITHUB_REPO` | 你的 GitHub 仓库名称 | `vue-admin-better` |
| `VUE_APP_BACKEND_URL` | 后端 API 服务器地址 | `http://123.45.67.89:3001` 或 `https://api.example.com` |

### 3.4 构建前端项目

#### 方法一：使用构建脚本（推荐）

双击运行项目根目录下的 `build:github.bat` 文件

#### 方法二：手动构建

```bash
# Windows PowerShell 或 CMD
set VUE_APP_DEPLOY_MODE=github
set VUE_APP_GITHUB_REPO=your-repo-name
set VUE_APP_BACKEND_URL=http://your-backend-server:3001
npm run build
```

#### 方法三：使用环境变量文件

```bash
# Linux/Mac
export VUE_APP_DEPLOY_MODE=github
export VUE_APP_GITHUB_REPO=your-repo-name
export VUE_APP_BACKEND_URL=http://your-backend-server:3001
npm run build

# Windows CMD
set VUE_APP_DEPLOY_MODE=github&&set VUE_APP_GITHUB_REPO=your-repo-name&&set VUE_APP_BACKEND_URL=http://your-backend-server:3001&&npm run build
```

构建完成后，项目根目录会生成 `dist` 文件夹，这就是要部署到 GitHub Pages 的内容。

### 3.5 开启 GitHub Pages

1. 进入你的 GitHub 仓库
2. 点击 **Settings**（设置）
3. 左侧菜单找到 **Pages**
4. 配置 Source（源）：
   - **Source**: Deploy from a branch
   - **Branch**: gh-pages（如果没有，先选择 main，然后点击 Save，会自动创建 gh-pages 分支）
   - **Folder**: / (root)
5. 点击 **Save**
6. 等待 1-2 分钟，页面会显示你的访问地址：
   ```
   Your site is live at https://yourname.github.io/your-repo-name/
   ```

### 3.6 推送 dist 目录到 gh-pages 分支

#### 方法一：使用 GitHub Actions 自动部署（推荐）

项目已经包含了 `.github/workflows/deploy.yml` 文件，会自动构建和部署。

如果你需要修改自动部署配置，编辑 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        env:
          VUE_APP_DEPLOY_MODE: github
          VUE_APP_GITHUB_REPO: your-repo-name  # 改成你的仓库名
          VUE_APP_BACKEND_URL: http://your-backend-server:3001  # 改成你的后端地址
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          publish_branch: gh-pages
```

#### 方法二：手动部署

```bash
# 进入 dist 目录
cd dist

# 初始化 Git（如果需要）
git init
git remote add origin https://github.com/你的用户名/你的仓库名.git

# 创建 gh-pages 分支
git checkout -b gh-pages

# 添加所有文件
git add .

# 提交
git commit -m "Deploy to GitHub Pages"

# 推送到 gh-pages 分支
git push -u origin gh-pages --force
```

---

## 四、验证部署

### 4.1 检查前端是否可访问

访问：`https://yourname.github.io/your-repo-name/`

应该能看到登录页面。

### 4.2 检查后端连接

1. 登录管理后台（默认账号：`admin`，密码：`123456`）
2. 打开浏览器开发者工具（F12）
3. 切换到 **Network** 标签
4. 进行任意操作（如刷新用户列表）
5. 检查是否有请求发送到你的后端服务器

如果请求失败，检查：
- 后端服务是否正常运行
- 后端地址是否正确配置
- 浏览器控制台是否有 CORS 错误

### 4.3 测试完整功能

- [ ] 登录/登出
- [ ] 用户管理（刷新、添加、编辑、删除）
- [ ] 角色权限管理
- [ ] 授权 API 管理（创建、删除）
- [ ] 反代链接页面（验证码刷新、图片显示）

---

## 五、常见问题

### Q1: 登录时报错 "Network Error" 或 "CORS Error"

**原因**：后端 CORS 配置问题或后端服务未运行

**解决方法**：
1. 确认后端服务正在运行：`pm2 list`
2. 检查后端 CORS 配置是否允许你的 GitHub Pages 域名
3. 如果使用 HTTP 后端，确保前端也通过 HTTP 访问（GitHub Pages 支持 HTTPS）

### Q2: API 请求返回 404

**原因**：后端地址配置错误

**解决方法**：
1. 检查 `.env.github` 中的 `VUE_APP_BACKEND_URL` 是否正确
2. 确认后端服务端口是 3001
3. 确认后端路由是否正确（`/api/proxy/create` 等）

### Q3: 图片显示不出来

**原因**：图片上传到了后端服务器，但请求路径不对

**解决方法**：
1. 确认后端服务器的 `imageStore` 配置正确
2. 检查前端是否正确引用了图片 URL

### Q4: 验证码不刷新

**原因**：代理转发目标 URL 无法访问

**解决方法**：
1. 确认目标 API（如 `https://api.sms8.net/api/record`）可从后端服务器访问
2. 检查后端服务器的防火墙/网络配置

### Q5: 部署后页面空白

**原因**：`VUE_APP_GITHUB_REPO` 配置与实际仓库名不一致

**解决方法**：
1. 确认 `.env.github` 中的 `VUE_APP_GITHUB_REPO` 与 GitHub 仓库名完全一致
2. 区分大小写，例如 `Vue-Admin-Better` 和 `vue-admin-better` 是不同的

### Q6: GitHub Pages 访问报错 404

**原因**：gh-pages 分支没有正确部署

**解决方法**：
1. 确认 gh-pages 分支存在
2. 确认分支中有 `index.html` 文件
3. 等待几分钟让 GitHub 完成部署
4. 检查 GitHub Pages 设置中的 Source 配置

---

## 六、安全建议

### 6.1 修改默认密码

部署完成后，请立即修改默认管理员密码：
- 默认账号：`admin`
- 默认密码：`123456`

### 6.2 配置 CORS 白名单

生产环境中，建议将 CORS 配置为只允许你的 GitHub Pages 域名：

```javascript
// server/index.js
const allowedOrigins = [
  'https://yourname.github.io',
  'https://yourname.github.io/your-repo-name/'
]

ctx.set('Access-Control-Allow-Origin', allowedOrigins.includes(ctx.request.header.origin)
  ? ctx.request.header.origin
  : '')
```

### 6.3 启用 HTTPS

- 推荐使用 Let's Encrypt 免费 SSL 证书
- 后端和前端都应使用 HTTPS

### 6.4 定期更新依赖

```bash
# 检查更新
npm outdated

# 更新依赖
npm update
```

---

## 七、附录：快速命令参考

### 后端服务器常用命令

```bash
# 进入后端目录
cd server

# 安装依赖
npm install

# 启动开发服务器
node index.js

# 使用 PM2 启动生产服务器
pm2 start index.js --name proxy-api

# 查看日志
pm2 logs proxy-api

# 重启服务
pm2 restart proxy-api

# 查看服务状态
pm2 list
```

### 前端构建命令

```bash
# 设置环境变量并构建
set VUE_APP_DEPLOY_MODE=github
set VUE_APP_GITHUB_REPO=your-repo-name
set VUE_APP_BACKEND_URL=http://your-backend-server:3001
npm run build

# 或双击运行
build:github.bat
```

### Git 常用命令

```bash
# 克隆仓库
git clone https://github.com/yourname/your-repo.git

# 推送代码
git add .
git commit -m "Your commit message"
git push

# 切换分支
git checkout -b gh-pages
git push -u origin gh-pages
```

---

## 八、技术支持

如果部署过程中遇到问题，请检查：
1. 控制台错误信息
2. GitHub Actions 日志（如果使用自动部署）
3. 后端服务器日志
4. 浏览器的 Network 标签页

---

*文档版本：2026-05-20*
*适用版本：vue-admin-better 3.0.2+*
