@echo off
echo ================================
echo   前后端一体部署脚本 (Render)
echo ================================
echo.

echo [1/4] 安装前端依赖...
call npm install
if %errorlevel% neq 0 (
    echo ❌ 前端依赖安装失败
    exit /b 1
)
echo ✅ 前端依赖安装完成

echo.
echo [2/4] 安装后端依赖...
call npm install --prefix server
if %errorlevel% neq 0 (
    echo ❌ 后端依赖安装失败
    exit /b 1
)
echo ✅ 后端依赖安装完成

echo.
echo [3/4] 构建前端项目...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ 前端构建失败
    exit /b 1
)
echo ✅ 前端构建完成

echo.
echo [4/4] 创建data目录...
if not exist "data" mkdir data
echo ✅ 目录创建完成

echo.
echo ================================
echo   部署准备完成！
echo ================================
echo.
echo 启动服务器...
node server/index.js
