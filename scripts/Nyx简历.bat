@echo off
chcp 65001 >nul
REM =============================================================================
REM Nyx简历 - 一键启动脚本 (Windows)
REM =============================================================================

setlocal enabledelayedexpansion

set "PORT=5000"
set "URL=http://localhost:%PORT%"

echo ========================================
echo   Nyx简历 - 张雅岚个人作品集
echo ========================================
echo.

REM 检测并清理端口占用
echo [1/4] 检测端口 %PORT% 占用情况...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":%PORT%.*LISTENING" 2^>nul') do (
    set "PID=%%a"
    goto :kill_port
)
echo       端口 %PORT% 可用
goto :check_deps

:kill_port
if defined PID (
    echo       端口 %PORT% 已被占用 (PID: !PID!)
    echo       正在清理...
    taskkill /F /PID !PID! >nul 2>&1
    timeout /t 1 /nobreak >nul
)
echo       端口已释放

:check_deps
echo.

REM 检查依赖
echo [2/4] 检查依赖...
where pnpm >nul 2>&1
if errorlevel 1 (
    echo       [错误] 未检测到 pnpm
    echo       请先安装: npm install -g pnpm
    echo.
    pause
    exit /b 1
)
echo       pnpm 已就绪
echo.

REM 启动开发服务器
echo [3/4] 启动开发服务器...
echo       端口: %PORT%
echo.

REM 直接在当前窗口启动（可以看到日志）
echo [4/4] 启动中，请稍候...
echo.
start http://localhost:%PORT%
pnpm dev --host 0.0.0.0 --port %PORT%

pause
