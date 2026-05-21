@echo off
echo ========================================
echo   Time-Limited Proxy Setup and Test
echo ========================================
echo.

echo [1/5] Installing main project dependencies...
call npm install --registry=https://registry.npmmirror.com --legacy-peer-deps
if %errorlevel% neq 0 (
    echo Main project dependencies installation failed!
    pause
    exit /b 1
)
echo Main project dependencies installed successfully!
echo.

echo [2/5] Installing server dependencies...
cd server
call npm install --registry=https://registry.npmmirror.com
if %errorlevel% neq 0 (
    echo Server dependencies installation failed!
    pause
    exit /b 1
)
cd ..
echo Server dependencies installed successfully!
echo.

echo [3/5] Testing proxy server startup...
start /b node server\index.js
timeout /t 3 /nobreak >nul
curl -s http://localhost:3001/health >nul 2>&1
if %errorlevel% equ 0 (
    echo Proxy server is running on http://localhost:3001
) else (
    echo Warning: Proxy server may not be running properly
)
echo.

echo [4/5] Testing proxy creation API...
curl -X POST http://localhost:3001/api/proxy/create ^
  -H "Content-Type: application/json" ^
  -d "{\"targetUrl\":\"https://www.baidu.com\",\"expireMinutes\":60}" ^
  -s > test_response.json
echo Response saved to test_response.json
type test_response.json
echo.

echo [5/5] Testing proxy listing API...
curl -X GET http://localhost:3001/api/proxy/list -s
echo.
echo.

echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo To start the project:
echo.
echo 1. Start proxy server:
echo    npm run serve:proxy
echo.
echo 2. Start frontend (in another terminal):
echo    npm run serve:rspack
echo.
echo 3. Or start both:
echo    npm run serve:all
echo.
echo Frontend URL: http://localhost:8080
echo Proxy Server URL: http://localhost:3001
echo.
echo Access the proxy management page after login:
echo Username: admin
echo Password: 123456
echo.
pause