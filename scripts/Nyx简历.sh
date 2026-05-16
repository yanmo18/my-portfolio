#!/usr/bin/env bash
# =============================================================================
# Nyx简历 - 一键启动脚本 (macOS/Linux)
# =============================================================================

PORT=5000
URL="http://localhost:$PORT"

echo "========================================"
echo "  Nyx简历 - Fernoa个人作品集"
echo "========================================"
echo ""

# 检测并清理端口占用
echo "[1/4] 检测端口 $PORT 占用情况..."
if command -v lsof &> /dev/null; then
    PID=$(lsof -ti:$PORT 2>/dev/null)
    if [ -n "$PID" ]; then
        echo "      端口 $PORT 已被占用 (PID: $PID)"
        echo "      正在清理..."
        kill -9 $PID 2>/dev/null || true
        sleep 1
        echo "      端口已释放"
    else
        echo "      端口 $PORT 可用"
    fi
fi
echo ""

# 检查依赖
echo "[2/4] 检查依赖..."
if ! command -v pnpm &> /dev/null; then
    echo "      [错误] 未检测到 pnpm"
    echo "      请先安装: npm install -g pnpm"
    exit 1
fi
echo "      pnpm 已就绪"
echo ""

# 启动开发服务器
echo "[3/4] 启动开发服务器..."
echo "      端口: $PORT"
echo ""

# 打开浏览器并启动服务
open $URL 2>/dev/null || xdg-open $URL 2>/dev/null || echo "请手动打开浏览器访问: $URL"
pnpm dev --host 0.0.0.0 --port $PORT
