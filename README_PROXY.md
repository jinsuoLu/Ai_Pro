# Time-Limited Proxy Website Generator

基于 vue-admin-better 构建的反代网站生成系统，支持创建有时间限制的临时网站访问。

## 功能特性

- 🌐 **反向代理**：支持将任意网站通过代理访问
- ⏱️ **时间限制**：为每个代理设置有效期（30分钟至7天）
- 🔄 **自动续期**：支持手动延长代理有效期
- 📊 **实时监控**：查看所有代理的使用状态和剩余时间
- 🗑️ **自动清理**：过期代理自动清理
- 📝 **操作日志**：记录所有代理创建、续期、删除操作

## 项目结构

```
├── server/                 # 反代服务器
│   ├── index.js           # 服务器入口
│   ├── tokenManager.js    # Token 管理器
│   ├── timeLimitService.js # 时间限制服务
│   └── package.json       # 服务器依赖
├── src/
│   ├── api/
│   │   └── proxy.js       # 反代 API 调用
│   ├── views/
│   │   └── proxy/
│   │       └── index.vue  # 反代管理页面
│   └── router/
│       └── index.js       # 路由配置
└── package.json
```

## 快速开始

### 1. 安装前端依赖

```bash
npm install --registry=https://registry.npmmirror.com
```

### 2. 安装服务器依赖

```bash
cd server
npm install --registry=https://registry.npmmirror.com
cd ..
```

### 3. 启动服务器

```bash
# 启动前端开发服务器
npm run serve:rspack

# 启动反代服务器
npm run serve:proxy

# 或者同时启动两者
npm run serve:all
```

### 4. 访问系统

- 前端地址：http://localhost:8080
- 代理服务器：http://localhost:3001

## 使用说明

### 创建反代

1. 登录系统（默认账号：admin，密码：123456）
2. 进入"反代管理"菜单
3. 输入目标网站 URL（如：https://www.example.com）
4. 选择有效期（默认1小时）
5. 点击"创建反代"按钮

### 使用反代

创建成功后，系统会生成一个代理 URL，格式为：
```
http://localhost:3001/proxy/{token}
```

用户可以通过这个 URL 访问目标网站，在过期时间内有效。

### 续期反代

如果需要延长代理时间：
1. 在反代列表中找到要续期的代理
2. 点击"续期"按钮
3. 选择延长时间
4. 确认续期

### 删除反代

不再需要的代理可以手动删除：
1. 在反代列表中找到要删除的代理
2. 点击"删除"按钮
3. 确认删除

## API 接口

### 创建反代

```http
POST /api/proxy/create
Content-Type: application/json

{
  "targetUrl": "https://www.example.com",
  "expireMinutes": 60
}
```

### 获取反代列表

```http
GET /api/proxy/list
```

### 续期反代

```http
POST /api/proxy/extend
Content-Type: application/json

{
  "token": "tk_xxxxx",
  "additionalMinutes": 60
}
```

### 删除反代

```http
DELETE /api/proxy/{token}
```

### 访问反代

```http
GET /proxy/{token}/*
```

所有请求都会被代理到创建时指定的目标网站。

## 配置说明

### 服务器配置

服务器默认运行在 `3001` 端口，可通过环境变量修改：

```bash
PROXY_PORT=3001 node server/index.js
```

### Token 管理

- Token 格式：`tk_` + 随机字符串 + 时间戳
- 默认有效期：根据创建时指定
- 最大有效期：7天（10080分钟）

### 自动清理

服务器每 60 秒自动清理过期的代理。

## 技术栈

- **前端**：Vue 2.7 + Element UI + rspack
- **后端**：Express.js + http-proxy-middleware
- **代理**：HTTP/HTTPS 反向代理

## 注意事项

1. 代理服务器需要与前端分开部署
2. 代理服务器默认监听 3001 端口，确保该端口未被占用
3. 创建代理时请确保目标网站允许被代理
4. 过期代理会自动清理，重要数据请及时导出
5. 默认配置下，代理仅限本地访问，如有需要可修改 CORS 配置

## 安全建议

1. 生产环境请修改 CORS 配置限制来源
2. 建议添加认证机制
3. 限制单用户可创建的代理数量
4. 监控异常访问行为

## License

MIT