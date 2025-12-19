# network_manage

一个用于管理区块链网络配置的 Dart package，支持多种链类型。

## 特性

- ✅ 支持多链类型（EVM, Solana, Bitcoin, TON, TRON 等）
- ✅ 简洁的 API 设计（loadNetworks, getNetwork）
- ✅ 单例模式，内存高效
- ✅ 类型安全的 Network 模型
- ✅ 支持主网/测试网过滤
- ✅ 可编译为 Node.js 包（使用 dart2js）

## 安装

在 `pubspec.yaml` 中添加依赖：

```yaml
dependencies:
  network_manage:
    path: ../packages/network_manage
```

然后运行：

```bash
dart pub get
```

## 使用方法

### 1. 初始化

```dart
import 'package:network_manage/network_manage.dart';

// 获取 NetworkManager 实例（单例模式）
final networkManager = NetworkManager.getInstance(
  walletDomain: 'https://api.tomo.inc', // 可选，默认值
);
```

### 2. 加载网络列表

```dart
// 加载所有网络
final allNetworks = networkManager.loadNetworks();
print('总共 ${allNetworks.length} 个网络');

// 按链类型过滤
final evmNetworks = networkManager.loadNetworks('EVM');
print('EVM 网络: ${evmNetworks.length} 个');

final solanaNetworks = networkManager.loadNetworks('SOLANA');
final btcNetworks = networkManager.loadNetworks('BTC');
```

### 3. 获取网络详情

```dart
// 根据 chainId 获取网络
final ethereum = networkManager.getNetwork(1);
if (ethereum != null) {
  print('网络名称: ${ethereum.chainName}');
  print('原生货币: ${ethereum.nativeCurrencySymbol}');
  print('区块浏览器: ${ethereum.blockExplorerUrl}');
}

// 指定链类型优化查询
final baseNetwork = networkManager.getNetwork(8453, 'EVM');

// 根据名称获取
final bitcoin = networkManager.getNetworkByName('BITCOIN');
```

### 4. 其他实用方法

```dart
// 获取所有支持的链类型
final chainTypes = networkManager.getSupportedChainTypes();
print('支持的链类型: $chainTypes');

// 获取测试网列表
final testnets = networkManager.getTestnetNetworks();

// 获取主网列表
final mainnets = networkManager.getMainnetNetworks();
```

## Network 模型

```dart
class Network {
  final int chainId;              // 链 ID
  final int chainIndex;           // 链索引
  final String name;              // 网络名称（如 'ETH'）
  final String chainName;         // 完整链名（如 'Ethereum'）
  final String nativeCurrencyName;    // 原生货币名称
  final String nativeCurrencySymbol;  // 原生货币符号
  final int nativeCurrencyDecimals;   // 原生货币精度
  final String platformType;      // 平台类型（EVM, SOLANA 等）
  final String icon;              // 图标 URL
  final bool supportSwap;         // 是否支持交换
  final bool supportGift;         // 是否支持赠送
  final bool supportHistory;      // 是否支持历史记录
  final List<String>? rpcUrls;   // RPC 地址列表（可选）
  final String? blockExplorerUrl; // 区块浏览器 URL（可选）
  final bool? isTestnet;         // 是否测试网（可选）
}
```

## 支持的链类型

- **EVM**: Ethereum, BSC, Polygon, Arbitrum, Base, Optimism 等
- **SOLANA**: Solana 主网
- **BTC**: Bitcoin
- **DOGE**: Dogecoin
- **TON**: TON Network
- **SUI**: SUI Network
- **TRON**: Tron Network
- **COSMOS**: Cosmos Hub
- **APTOS**: Movement Network

## 完整示例

```dart
import 'package:network_manage/network_manage.dart';

void main() {
  // 初始化
  final manager = NetworkManager.getInstance();

  // 1. 加载所有 EVM 网络
  print('=== EVM 网络 ===');
  final evmNetworks = manager.loadNetworks('EVM');
  for (var network in evmNetworks) {
    print('${network.chainName} (chainId: ${network.chainId})');
  }

  // 2. 获取特定网络详情
  print('\n=== Ethereum 详情 ===');
  final eth = manager.getNetwork(1);
  if (eth != null) {
    print('名称: ${eth.chainName}');
    print('符号: ${eth.nativeCurrencySymbol}');
    print('精度: ${eth.nativeCurrencyDecimals}');
    print('支持交换: ${eth.supportSwap}');
  }

  // 3. 查询支持的链类型
  print('\n=== 支持的链类型 ===');
  final types = manager.getSupportedChainTypes();
  print(types.join(', '));

  // 4. 获取测试网
  print('\n=== 测试网络 ===');
  final testnets = manager.getTestnetNetworks();
  for (var network in testnets) {
    print('${network.chainName} (测试网)');
  }
}
```

## 编译为 Node.js 包

### 🔨 一键构建

```bash
cd packages/network_manage
chmod +x build.sh
./build.sh
```

构建脚本会自动：
1. ✅ 检查 Dart 环境
2. ✅ 安装依赖
3. ✅ 运行测试
4. ✅ 编译为 JavaScript（优化模式）
5. ✅ 生成 TypeScript 类型定义

**输出文件：**
- `dist/network_manage.js` - 编译后的 JavaScript（~5KB）
- `dist/network_manage.d.ts` - TypeScript 类型定义

### 测试编译结果

```bash
node test_node.js
```

### ⚠️ 重要说明

Dart 编译到 JavaScript 的模块主要用于演示。**生产环境推荐：**
1. 在 Dart/Flutter 项目中直接使用此 package
2. 对于 Node.js 项目，将数据导出为 JSON 或用 TypeScript 重写

详细说明请参考 `BUILD_NOTES.md`

## API 参考

### NetworkManager

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `getInstance()` | `walletDomain?` | `NetworkManager` | 获取单例实例 |
| `loadNetworks()` | `chainType?` | `List<Network>` | 加载网络列表 |
| `getNetwork()` | `chainId, chainType?` | `Network?` | 获取网络详情 |
| `getNetworkByName()` | `name` | `Network?` | 根据名称获取 |
| `getSupportedChainTypes()` | - | `List<String>` | 获取支持的链类型 |
| `getTestnetNetworks()` | - | `List<Network>` | 获取测试网列表 |
| `getMainnetNetworks()` | - | `List<Network>` | 获取主网列表 |

## 许可证

MIT License

## 维护者

Tomo Team

