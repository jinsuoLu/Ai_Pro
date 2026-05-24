@echo off
echo ===================================
echo  前后端一体启动脚本
echo ===================================
echo.

echo [1/3] 正在启动后端服务器 (SQLite)...
start "Proxy Server" cmd /k "cd /d %~dp0server && node index.js"

echo.
echo [2/3] 等待后端服务启动...
timeout /t 3 /nobreak >nul

echo.
echo [3/3] 正在启动前端开发服务器...
start "Vue Frontend" cmd /k "npm run serve:rspack"

echo.
echo ===================================
echo  服务已启动！
echo  - 后端服务: http://localhost:3001
echo  - 前端服务: http://localhost:8888
echo ===================================
echo.
echo 按任意键打开浏览器...
pause >nul
start http://localhost:8888
