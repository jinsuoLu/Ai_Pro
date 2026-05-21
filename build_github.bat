@echo off
chcp 65001 >nul
echo ========================================
echo   GitHub Pages 部署构建脚本
echo ========================================
echo.

echo [提示] 配置已从 .env.github 文件读取
echo.

echo [1/4] 正在设置环境变量...

REM 读取 .env.github 配置文件
for /f "usebackq tokens=1,* delims==" %%a in (`findstr /v "#" ".env.github"`) do (
    if "%%a"=="VUE_APP_DEPLOY_MODE" set "VUE_APP_DEPLOY_MODE=%%b"
    if "%%a"=="VUE_APP_GITHUB_REPO" set "VUE_APP_GITHUB_REPO=%%b"
    if "%%a"=="VUE_APP_BACKEND_URL" set "VUE_APP_BACKEND_URL=%%b"
)

REM 清理可能存在的空格
set "VUE_APP_DEPLOY_MODE=%VUE_APP_DEPLOY_MODE: =%"
set "VUE_APP_GITHUB_REPO=%VUE_APP_GITHUB_REPO: =%"
set "VUE_APP_BACKEND_URL=%VUE_APP_BACKEND_URL: =%"

if not defined VUE_APP_DEPLOY_MODE (
    echo [错误] VUE_APP_DEPLOY_MODE 未定义，请检查 .env.github 文件
    pause
    exit /b 1
)

if not defined VUE_APP_GITHUB_REPO (
    echo [错误] VUE_APP_GITHUB_REPO 未定义，请检查 .env.github 文件
    pause
    exit /b 1
)

if not defined VUE_APP_BACKEND_URL (
    echo [错误] VUE_APP_BACKEND_URL 未定义，请检查 .env.github 文件
    pause
    exit /b 1
)

echo [2/4] 配置信息：
echo       部署模式: %VUE_APP_DEPLOY_MODE%
echo       仓库名称: %VUE_APP_GITHUB_REPO%
echo       后端地址: %VUE_APP_BACKEND_URL%
echo.

echo [3/4] 正在构建项目...
call npm run build

if %ERRORLEVEL% neq 0 (
    echo.
    echo [错误] 构建失败！
    pause
    exit /b 1
)

echo.
echo [4/4] 构建完成！
echo.
echo ========================================
echo   构建成功！
echo.
echo   构建产物在 dist 目录
echo.
echo   下一步操作：
echo   1. 打开终端，进入项目目录
echo   2. 执行以下命令部署到 GitHub Pages：
echo.
echo      cd dist
echo      git init
echo      git checkout -b gh-pages
echo      git add .
echo      git commit -m "Deploy to GitHub Pages"
echo      git remote add origin https://github.com/jinsuoLu/Ai_Pro.git
echo      git push -u origin gh-pages --force
echo.
echo   3. 开启 GitHub Pages：
echo      进入 GitHub 仓库 -^> Settings -^> Pages
echo      Source 选择 gh-pages 分支
echo.
echo   4. 访问你的网站：
echo      https://jinsuoLu.github.io/%VUE_APP_GITHUB_REPO%/
echo ========================================
echo.
pause
