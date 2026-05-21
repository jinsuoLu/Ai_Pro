# 快速启动指南

## 环境要求

- Node.js >= 14.x
- npm 或 pnpm

## 安装步骤

### 1. 安装主项目依赖

```bash
npm install --registry=https://registry.npmmirror.com --legacy-peer-deps
```

### 2. 安装服务器依赖

```bash
cd server
npm install --registry=https://registry.npmmirror.com
cd ..
```

## 启动项目

### 方式一：分别启动（推荐）

**终端 1 - 启动反代服务器：**
```bash
npm run serve:proxy
```

**终端 2 - 启动前端开发服务器：**
```bash
npm run serve:rspack
```

### 方式二：一键启动

```bash
npm run serve:all
```

## 访问地址

- **前端地址**：http://localhost:8080
- **反代服务器**：http://localhost:3001
- **默认账号**：admin
- **默认密码**：123456

## 使用流程

1. 登录系统
2. 点击左侧菜单"反代管理"
3. 输入目标网站 URL（如：https://www.baidu.com）
4. 选择有效期
5. 点击"创建反代"按钮
6. 复制生成的代理链接
7. 在浏览器中访问代理链接即可

## 功能说明

### 创建反代
在反代管理页面，填写目标网站 URL 和有效期，即可生成一个带时间限制的代理链接。

### 查看列表
所有创建的代理都会显示在列表中，包括：
- Token
- 目标网站
- 过期时间
- 剩余时间
- 代理访问地址

### 续期
对于还未过期的代理，可以点击"续期"按钮延长使用时间。

### 删除
不再需要的代理可以手动删除，或者等待过期后自动清理。

## API 测试

### 健康检查
```bash
curl http://localhost:3001/health
```

### 创建代理
```bash
curl -X POST http://localhost:3001/api/proxy/create \
  -H "Content-Type: application/json" \
  -d '{"targetUrl":"https://www.baidu.com","expireMinutes":60}'
```

### 获取列表
```bash
curl http://localhost:3001/api/proxy/list
```

### 续期代理
```bash
curl -X POST http://localhost:3001/api/proxy/extend \
  -H "Content-Type: application/json" \
  -d '{"token":"your_token","additionalMinutes":60}'
```

### 删除代理
```bash
curl -X DELETE http://localhost:3001/api/proxy/your_token
```

## 项目文件结构

```
.
├── server/                     # 反代服务器
│   ├── index.js               # 服务器入口
│   ├── tokenManager.js        # Token 管理器
│   ├── timeLimitService.js    # 时间限制服务
│   ├── package.json           # 服务器依赖
│   └── data/                  # 数据存储目录
├── src/
│   ├── api/
│   │   └── proxy.js          # 前端 API 调用
│   ├── views/
│   │   └── proxy/
│   │       └── index.vue     # 反代管理页面
│   └── router/
│       └── index.js          # 路由配置（已添加 proxy 路由）
├── package.json               # 主项目依赖和脚本
├── README_PROXY.md           # 详细文档
└── QUICKSTART.md             # 本文件
```

## 常见问题

### Q: 服务器启动失败，端口被占用？
A: 可以修改 `server/index.js` 中的 `PORT` 值，或查找并关闭占用端口的程序。

### Q: 前端无法调用 API？
A: 确保反代服务器已启动，并检查前端 API 配置（`src/api/proxy.js`）中的地址是否正确。

### Q: 代理访问显示 404？
A: 检查 Token 是否正确，确认代理是否已过期。

### Q: 如何修改默认账号密码？
A: 可以通过修改 `mock/controller/user.js` 或后端数据库来实现。

## 更多信息

详细功能说明和技术文档请查看 [README_PROXY.md](README_PROXY.md)