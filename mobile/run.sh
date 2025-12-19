#!/bin/bash

echo "🚀 Flutter WebF Demo 启动脚本"
echo ""

# 检查 Flutter 是否安装
if ! command -v flutter &> /dev/null; then
    echo "❌ Flutter 未安装或不在 PATH 中"
    exit 1
fi

echo "📦 安装依赖..."
flutter pub get

echo ""
echo "📱 查看可用设备..."
flutter devices

echo ""
echo "🎯 启动应用..."
echo "提示："
echo "  - 确保 WebF 服务器在 localhost:5173 运行"
echo "  - iOS 模拟器可以直接访问 localhost"
echo "  - 真机需要使用电脑 IP 地址"
echo ""

# 运行应用
flutter run

