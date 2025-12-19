#!/bin/bash

# Network Manage 构建脚本
# 编译 Dart 代码为 JavaScript 供 Node.js 使用

set -e

echo "🚀 开始构建 network_manage..."

# 1. 检查 Dart 环境
if ! command -v dart &> /dev/null; then
    echo "❌ 错误：未找到 Dart 命令"
    echo "请安装 Dart SDK: https://dart.dev/get-dart"
    exit 1
fi

echo "✅ Dart 版本: $(dart --version 2>&1 | head -1)"

# 2. 安装依赖
echo "📦 安装 Dart 依赖..."
dart pub get

# 3. 运行测试
echo "🧪 运行测试..."
dart test

# 4. 创建 dist 目录
mkdir -p dist

# 5. 编译为 JavaScript（优化模式）
echo "🔨 编译 Dart -> JavaScript..."
dart compile js lib/network_manage_node.dart -o dist/network_manage.js -O4

# 6. 创建 TypeScript 类型定义（手动）
echo "📝 创建 TypeScript 类型定义..."
cat > dist/network_manage.d.ts << 'EOF'
declare module '@tomo/network-manage' {
  export interface Network {
    chainId: number;
    chainIndex: number;
    name: string;
    chainName: string;
    nativeCurrencyName: string;
    nativeCurrencySymbol: string;
    nativeCurrencyDecimals: number;
    platformType: string;
    icon: string;
    supportSwap: boolean;
    supportGift: boolean;
    supportHistory: boolean;
    rpcUrls?: string[];
    blockExplorerUrl?: string;
    isTestnet?: boolean;
  }

  export class NetworkManager {
    static getInstance(options?: { walletDomain?: string }): NetworkManager;
    loadNetworks(chainType?: string): Network[];
    getNetwork(chainId: number, chainType?: string): Network | null;
    getNetworkByName(name: string): Network | null;
    getSupportedChainTypes(): string[];
    getTestnetNetworks(): Network[];
    getMainnetNetworks(): Network[];
  }
}
EOF

echo "✅ 构建完成！"
echo "📦 输出文件："
echo "  - dist/network_manage.js"
echo "  - dist/network_manage.d.ts"
echo ""
echo "💡 使用方法："
echo "  Node.js: const { NetworkManager } = require('./dist/network_manage.js');"
echo "  TypeScript: import { NetworkManager } from '@tomo/network-manage';"

