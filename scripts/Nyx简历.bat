@echo off
chcp 65001 >nul
REM =============================================================================
REM Nyx简历 - 一键启动脚本 (Windows)
REM =============================================================================
REM 使用方法:
REM   直接双击运行，或在命令提示符中运行 Nyx简历.bat
REM
REM 功能说明:
REM   1. 自动检测 5000 端口占用情况
REM   2. 清理残留进程，释放端口
REM   3. 启动 Vite 开发服务器
REM   4. 等待服务就绪后自动打开浏览器
REM =============================================================================

setlocal enabledelayedexpansion

set "SCRIPT_DIR=%~dp0"
set "PROJECT_DIR=%SCRIPT_DIR%"
cd /d "%PROJECT_DIR%"

set "PORT=5000"
set "URL=http://localhost:%PORT%"

echo ========================================
echo   Nyx简历 - 张雅岚个人作品集
echo ========================================
echo.

REM 检测并清理端口占用
echo [1/4] 检测端口 %PORT% 占用情况...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":%PORT%.*LISTENING"') do (
    set "PID=%%a"
    goto :kill_port
)
:kill_port
if defined PID (
    echo       端口 %PORT% 已被占用 (PID: !PID!)，正在清理...
    taskkill /F /PID !PID! >nul 2>&1
    timeout /t 2 /nobreak >nul
    echo       端口已释放
)
echo.

REM 检查依赖
echo [2/4] 检查依赖...
where pnpm >nul 2>&1
if errorlevel 1 (
    echo       错误: 未检测到 pnpm，请先安装: npm install -g pnpm
    pause
    exit /b 1
)
echo       pnpm 已就绪
echo.

REM 启动开发服务器
echo [3/4] 启动开发服务器...
echo       端口: %PORT%
echo       提示: 关闭此窗口可停止服务
echo.

REM 后台启动 Vite
start "Nyx简历 - 开发服务器" cmd /c "pnpm dev --host 0.0.0.0 --port %PORT%"

REM 等待服务就绪
echo [4/4] 等待服务启动...
set "MAX_WAIT=30"
set "COUNTER=0"

:wait_loop
ping -n 2 127.0.0.1 >nul 2>&1
curl -s --connect-timeout 1 http://localhost:%PORT% >nul 2>&1
if not errorlevel 1 goto :service_ready

set /a COUNTER+=1
if !COUNTER! geq !MAX_WAIT! (
    echo.
    echo       错误: 服务启动超时 (!MAX_WAIT!秒)
    echo       请检查端口占用或依赖安装
    pause
    exit /b 1
)

if !COUNTER! neq 0 (
    set /a mod=COUNTER %% 5
    if !mod! equ 0 echo       等待中... (!COUNTER!/!MAX_WAIT! 秒)
)
goto :wait_loop

:service_ready
echo.
echo ========================================
echo   服务已就绪!
echo ========================================
echo.
echo   访问地址: %URL%
echo.
echo   正在打开浏览器...
start %URL%
echo.
echo   关闭浏览器后，可按任意键停止服务
echo ========================================
pause >nul
