# 🚀 Network Manage - 快速参考

## 📦 安装

```yaml
# pubspec.yaml
dependencies:
  network_manage:
    path: ../packages/network_manage
```

```bash
flutter pub get
```

---

## 💻 使用

### 基础用法

```dart
import 'package:network_manage/network_manage.dart';

// 获取实例
final manager = NetworkManager.getInstance(
  walletDomain: 'https://api.tomo.inc'
);

// 获取所有网络
final allNetworks = manager.loadNetworks();

// 按链类型过滤
final evmNetworks = manager.loadNetworks(chainType: 'EVM');
final btcNetworks = manager.loadNetworks(chainType: 'BTC');

// 获取特定网络
final ethNetwork = manager.getNetwork(chainId: 1);
final btcNetwork = manager.getNetworkByName('BITCOIN');
```

### 常用方法

| 方法 | 参数 | 返回 | 说明 |
|------|------|------|------|
| `loadNetworks()` | `chainType?` | `List<Network>` | 获取所有或指定类型网络 |
| `getNetwork()` | `chainId?`, `chainName?` | `Network?` | 按 ID 或名称获取网络 |
| `getNetworkByName()` | `name` | `Network?` | 按名称获取网络 |
| `getSupportedChainTypes()` | - | `List<String>` | 获取支持的链类型 |
| `getTestnetNetworks()` | - | `List<Network>` | 获取所有测试网 |
| `getMainnetNetworks()` | - | `List<Network>` | 获取所有主网 |

---

## 🌐 支持的网络

| 网络 | Chain ID | 类型 | 符号 |
|------|----------|------|------|
| Bitcoin | 0 | BTC | BTC |
| Dogecoin | 3 | DOGE | DOGE |
| Ethereum | 1 | EVM | ETH |
| Solana | 501 | SOLANA | SOL |
| BSC | 56 | EVM | BNB |
| Base | 8453 | EVM | ETH |
| TON | 1100 | TON | TON |
| SUI | 784 | SUI | SUI |
| Arbitrum | 42161 | EVM | ETH |
| Polygon | 137 | EVM | POL |
| Tron | 19484 | TRON | TRX |

---

## 🔨 构建（Node.js）

### 快速构建

```bash
cd packages/network_manage
./build.sh
```

### npm scripts

```bash
npm run build           # 完整构建（测试+编译）
npm run build:quick     # 仅编译
npm run test            # 运行 Dart 测试
npm run test:node       # 测试 Node.js 编译结果
npm run example         # 运行示例
```

### 输出文件

```
dist/
├── network_manage.js       # JavaScript 代码（5.1KB）
├── network_manage.d.ts     # TypeScript 定义
├── network_manage.js.deps  # 依赖关系
└── network_manage.js.map   # Source map
```

---

## 🧪 测试

```bash
# Dart 单元测试
dart test

# Node.js 编译测试
node test_node.js

# 运行示例
dart run example/example.dart
```

---

## 📁 文件结构

```
packages/network_manage/
├── lib/
│   ├── network_manage.dart          # Dart/Flutter 入口
│   ├── network_manage_node.dart     # Node.js 编译入口
│   └── src/
│       ├── models/network.dart      # 数据模型
│       ├── data/network_data.dart   # 网络数据
│       └── network_manager.dart     # 管理器实现
├── test/network_manage_test.dart    # 单元测试
├── example/example.dart             # 使用示例
├── pubspec.yaml                     # Dart 依赖
├── package.json                     # Node.js 配置
├── build.sh                         # 构建脚本
└── test_node.js                     # Node.js 测试
```

---

## 🐛 故障排查

### 编译失败

```bash
# 清理并重新构建
rm -rf dist
dart pub get
./build.sh
```

### 测试失败

```bash
# 详细测试输出
dart test --reporter=verbose
```

### Node.js 加载失败

```bash
# 检查输出文件
ls -lh dist/
node test_node.js
```

---

## 📚 文档

| 文档 | 说明 |
|------|------|
| `README.md` | 功能介绍和快速开始 |
| `USAGE.md` | 详细使用指南 |
| `BUILD_NOTES.md` | 构建问题和解决方案 |
| `BUILD_REPORT.md` | 完整的构建修复报告 |
| `REVIEW_SUMMARY.md` | Code Review 总结 |
| `CHANGELOG.md` | 版本更新日志 |
| `QUICK_REFERENCE.md` | 本文档 |

---

## ⚡ 常见问题

**Q: 为什么有两个入口文件？**
- `network_manage.dart`: Dart/Flutter 项目使用
- `network_manage_node.dart`: Node.js 编译使用（包含 main()）

**Q: Dart/Flutter 项目需要修改代码吗？**
- 不需要！使用方式完全不变

**Q: 可以在 Node.js 项目中使用吗？**
- 可以，但建议用于演示。生产环境推荐导出 JSON 或重写为 TS/JS

**Q: 如何添加新网络？**
- 编辑 `lib/src/data/network_data.dart`
- 在 `loadNetworks()` 中添加新的 Network 对象

**Q: 支持自定义 RPC URLs 吗？**
- 支持！在 Network 对象中设置 `rpcUrls` 字段

---

## 🔗 相关链接

- [Dart SDK](https://dart.dev/)
- [Flutter](https://flutter.dev/)
- [Tomo Wallet](https://tomo.inc/)

---

**版本**: 1.0.0  
**更新时间**: 2025-12-19  
**状态**: ✅ Ready for Production

💡 **提示**: 收藏此文档以便快速查阅！

