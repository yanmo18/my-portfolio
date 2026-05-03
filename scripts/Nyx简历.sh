#!/usr/bin/env bash
# =============================================================================
# Nyx简历 - 一键启动脚本
# =============================================================================
# 使用方法:
#   Windows: 双击 Nyx简历.bat
#   macOS/Linux: 在终端运行 ./Nyx简历.sh 或 bash Nyx简历.sh
#
# 功能说明:
#   1. 自动检测 5000 端口占用情况
#   2. 清理残留进程，释放端口
#   3. 启动 Vite 开发服务器
#   4. 等待服务就绪后自动打开浏览器
# =============================================================================

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR"

PORT=5000
URL="http://localhost:$PORT"

echo "========================================"
echo "  Nyx简历 - 张雅岚个人作品集"
echo "========================================"
echo ""

# 检测并清理端口占用
echo "[1/4] 检测端口 $PORT 占用情况..."
if command -v fuser &> /dev/null; then
    if fuser $PORT/tcp &> /dev/null; then
        echo "      端口 $PORT 已被占用，正在清理..."
        fuser -k $PORT/tcp 2>/dev/null || true
        sleep 2
        echo "      端口已释放"
    fi
elif command -v lsof &> /dev/null; then
    PID=$(lsof -ti:$PORT 2>/dev/null)
    if [ -n "$PID" ]; then
        echo "      端口 $PORT 已被占用 (PID: $PID)，正在清理..."
        kill -9 $PID 2>/dev/null || true
        sleep 2
        echo "      端口已释放"
    fi
elif command -v netstat &> /dev/null; then
    if netstat -ano | grep ":$PORT " | grep LISTENING &> /dev/null; then
        echo "      端口 $PORT 已被占用，正在清理..."
        for pid in $(netstat -ano | grep ":$PORT " | grep LISTENING | awk '{print $5}' | cut -d: -f2 | sort -u); do
            [ -n "$pid" ] && [ "$pid" != "0" ] && kill -9 $pid 2>/dev/null || true
        done
        sleep 2
        echo "      端口已释放"
    fi
fi
echo ""

# 检查依赖
echo "[2/4] 检查依赖..."
if ! command -v pnpm &> /dev/null; then
    echo "      错误: 未检测到 pnpm，请先安装: npm install -g pnpm"
    exit 1
fi
echo "      pnpm 已就绪 ($(pnpm --version))"
echo ""

# 启动开发服务器
echo "[3/4] 启动开发服务器..."
echo "      端口: $PORT"
echo "      提示: 按 Ctrl+C 可停止服务"
echo ""

# 后台启动 Vite
pnpm dev --host 0.0.0.0 --port $PORT &
VITE_PID=$!

# 等待服务就绪
echo "[4/4] 等待服务启动..."
MAX_WAIT=30
COUNTER=0
while [ $COUNTER -lt $MAX_WAIT ]; do
    if curl -s --connect-timeout 1 http://localhost:$PORT > /dev/null 2>&1; then
        echo ""
        echo "========================================"
        echo "  服务已就绪!"
        echo "========================================"
        echo ""
        echo "  访问地址: $URL"
        echo ""
        
        # 自动打开浏览器
        echo "  正在打开浏览器..."
        case "$(uname -s)" in
            Darwin*)  open "$URL" ;;
            Linux*)   xdg-open "$URL" 2>/dev/null || sensible-browser "$URL" 2>/dev/null || echo "      请手动打开浏览器访问: $URL" ;;
            CYGWIN*|MINGW*|MSYS*) start "$URL" ;;
            *)        echo "      请手动打开浏览器访问: $URL" ;;
        esac
        echo ""
        echo "  按 Ctrl+C 停止服务"
        echo "========================================"
        
        # 保持运行
        wait $VITE_PID
        exit 0
    fi
    sleep 1
    COUNTER=$((COUNTER + 1))
    [ $((COUNTER % 5)) -eq 0 ] && echo "      等待中... ($COUNTER/$MAX_WAIT 秒)"
done

echo ""
echo "      错误: 服务启动超时 (${MAX_WAIT}秒)"
echo "      请检查端口占用或依赖安装"
kill -9 $VITE_PID 2>/dev/null || true
exit 1
