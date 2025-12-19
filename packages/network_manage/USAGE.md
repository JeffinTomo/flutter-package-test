# Network Manage SDK - 使用说明

## 🚀 快速开始

### 1. 安装依赖

#### Dart/Flutter 项目

在 `pubspec.yaml` 中添加：

```yaml
dependencies:
  network_manage:
    path: ../packages/network_manage  # 相对路径
```

然后运行：

```bash
dart pub get
# 或
flutter pub get
```

#### Node.js/TypeScript 项目

```bash
# 首先编译 Dart 为 JavaScript
cd packages/network_manage
chmod +x build.sh
./build.sh

# 在您的项目中引用
npm install --save file:./packages/network_manage
```

---

## 📚 基础用法

### Dart/Flutter

```dart
import 'package:network_manage/network_manage.dart';

void main() {
  // 1. 获取 NetworkManager 实例（单例模式）
  final manager = NetworkManager.getInstance(
    walletDomain: 'https://api.tomo.inc', // 可选，默认值
  );

  // 2. 加载所有网络
  final allNetworks = manager.loadNetworks();
  print('总共 ${allNetworks.length} 个网络');

  // 3. 按链类型过滤
  final evmNetworks = manager.loadNetworks('EVM');
  print('EVM 网络: ${evmNetworks.length} 个');

  // 4. 获取特定网络详情
  final ethereum = manager.getNetwork(1);
  if (ethereum != null) {
    print('网络: ${ethereum.chainName}');
    print('符号: ${ethereum.nativeCurrencySymbol}');
    print('精度: ${ethereum.nativeCurrencyDecimals}');
  }

  // 5. 根据名称查询
  final bitcoin = manager.getNetworkByName('BITCOIN');
}
```

### Node.js

```javascript
const { NetworkManager } = require('./dist/network_manage.js');

const manager = NetworkManager.getInstance({
  walletDomain: 'https://api.tomo.inc'
});

const allNetworks = manager.loadNetworks();
console.log(`总共 ${allNetworks.length} 个网络`);

const ethereum = manager.getNetwork(1);
console.log(`Ethereum: ${ethereum.chainName}`);
```

### TypeScript

```typescript
import { NetworkManager, Network } from '@tomo/network-manage';

const manager = NetworkManager.getInstance({
  walletDomain: 'https://api.tomo.inc'
});

const allNetworks: Network[] = manager.loadNetworks();
const ethereum: Network | null = manager.getNetwork(1);

if (ethereum) {
  console.log(`网络: ${ethereum.chainName}`);
  console.log(`符号: ${ethereum.nativeCurrencySymbol}`);
}
```

---

## 🔧 API 详解

### NetworkManager.getInstance()

获取 NetworkManager 单例实例。

**参数：**
- `walletDomain` (可选): RPC 服务器域名，默认 `'https://api.tomo.inc'`

**返回值：** `NetworkManager` 实例

**示例：**
```dart
final manager = NetworkManager.getInstance();
// 或指定域名
final manager = NetworkManager.getInstance(
  walletDomain: 'https://custom-api.example.com'
);
```

---

### loadNetworks(chainType?)

加载网络列表，支持按链类型过滤。

**参数：**
- `chainType` (可选): 链类型过滤，如 `'EVM'`, `'SOLANA'`, `'BTC'` 等
  - 不传或传 `null` 返回所有网络

**返回值：** `List<Network>`

**示例：**
```dart
// 加载所有网络
final all = manager.loadNetworks();

// 只加载 EVM 网络
final evm = manager.loadNetworks('EVM');

// 加载 Solana 网络
final solana = manager.loadNetworks('SOLANA');
```

---

### getNetwork(chainId, chainType?)

根据 chainId 获取网络详情。

**参数：**
- `chainId`: 链 ID（整数）
- `chainType` (可选): 链类型，用于优化查询

**返回值：** `Network?` (找不到返回 `null`)

**示例：**
```dart
// 查询 Ethereum (chainId: 1)
final eth = manager.getNetwork(1);

// 指定链类型优化查询
final base = manager.getNetwork(8453, 'EVM');

// 未找到时
final unknown = manager.getNetwork(999999);  // null
```

---

### getNetworkByName(name)

根据网络名称查询。

**参数：**
- `name`: 网络名称（如 `'BITCOIN'`, `'ETH'` 等）
  - 不区分大小写

**返回值：** `Network?`

**示例：**
```dart
final btc = manager.getNetworkByName('BITCOIN');
final eth = manager.getNetworkByName('eth');  // 自动转大写
```

---

### getSupportedChainTypes()

获取所有支持的链类型列表。

**返回值：** `List<String>` - 排序后的链类型列表

**示例：**
```dart
final types = manager.getSupportedChainTypes();
// ['BTC', 'DOGE', 'EVM', 'SOLANA', 'SUI', 'TON', 'TRON']
```

---

### getTestnetNetworks()

获取所有测试网列表。

**返回值：** `List<Network>`

**示例：**
```dart
final testnets = manager.getTestnetNetworks();
for (var net in testnets) {
  print('${net.chainName} (测试网)');
}
```

---

### getMainnetNetworks()

获取所有主网列表。

**返回值：** `List<Network>`

**示例：**
```dart
final mainnets = manager.getMainnetNetworks();
print('共 ${mainnets.length} 个主网');
```

---

## 📋 Network 模型

```dart
class Network {
  final int chainId;                  // 链 ID
  final int chainIndex;               // 链索引
  final String name;                  // 网络名称（如 'ETH'）
  final String chainName;             // 完整链名（如 'Ethereum'）
  final String nativeCurrencyName;    // 原生货币名称
  final String nativeCurrencySymbol;  // 原生货币符号（如 'ETH'）
  final int nativeCurrencyDecimals;   // 原生货币精度
  final String platformType;          // 平台类型（'EVM', 'SOLANA' 等）
  final String icon;                  // 图标 URL
  final bool supportSwap;             // 是否支持交换
  final bool supportGift;             // 是否支持赠送
  final bool supportHistory;          // 是否支持历史记录
  final List<String>? rpcUrls;        // RPC 地址列表（可选）
  final String? blockExplorerUrl;     // 区块浏览器 URL（可选）
  final bool? isTestnet;              // 是否测试网（可选）
}
```

### 序列化

```dart
// 转 JSON
final json = network.toJson();

// 从 JSON 创建
final network = Network.fromJson(json);
```

---

## 🌐 支持的网络

当前支持 **11 个主要网络**：

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

### 链类型分类

- **BTC**: Bitcoin
- **DOGE**: Dogecoin
- **EVM**: Ethereum, BSC, Base, Arbitrum, Polygon
- **SOLANA**: Solana
- **TON**: TON Network
- **SUI**: SUI Network
- **TRON**: Tron

---

## 💡 实战示例

### 示例 1：构建网络选择器

```dart
Widget buildNetworkSelector() {
  final manager = NetworkManager.getInstance();
  final networks = manager.loadNetworks('EVM');
  
  return DropdownButton<int>(
    items: networks.map((network) {
      return DropdownMenuItem(
        value: network.chainId,
        child: Row(
          children: [
            Image.network(network.icon, width: 24, height: 24),
            SizedBox(width: 8),
            Text(network.chainName),
          ],
        ),
      );
    }).toList(),
    onChanged: (chainId) {
      if (chainId != null) {
        final selected = manager.getNetwork(chainId);
        print('选择了: ${selected?.chainName}');
      }
    },
  );
}
```

### 示例 2：验证 chainId

```dart
bool isValidChainId(int chainId, String chainType) {
  final manager = NetworkManager.getInstance();
  final network = manager.getNetwork(chainId, chainType);
  return network != null;
}

// 使用
if (isValidChainId(1, 'EVM')) {
  print('有效的 EVM chainId');
}
```

### 示例 3：获取 RPC URL

```dart
String? getRpcUrl(int chainId) {
  final manager = NetworkManager.getInstance();
  final network = manager.getNetwork(chainId);
  
  if (network?.rpcUrls != null && network!.rpcUrls!.isNotEmpty) {
    return network.rpcUrls!.first;
  }
  
  return null;
}

// 使用
final ethRpc = getRpcUrl(1);
print('Ethereum RPC: $ethRpc');
```

### 示例 4：按功能筛选

```dart
List<Network> getSwapSupportedNetworks() {
  final manager = NetworkManager.getInstance();
  final all = manager.loadNetworks();
  
  return all.where((network) => network.supportSwap).toList();
}

// 使用
final swappable = getSwapSupportedNetworks();
print('支持交换的网络: ${swappable.length} 个');
```

---

## 🧪 测试

运行单元测试：

```bash
cd packages/network_manage
dart test
```

运行示例：

```bash
dart run example/example.dart
```

---

## 🔨 构建 Node.js 包

```bash
cd packages/network_manage
./build.sh
```

输出文件：
- `dist/network_manage.js` - JavaScript 代码
- `dist/network_manage.d.ts` - TypeScript 类型定义

---

## ❓ 常见问题

### Q: 如何添加新网络？

A: 编辑 `lib/src/data/network_data.dart`，在 `getNetworkData` 函数的数组中添加新网络配置。

### Q: walletDomain 是什么？

A: 某些 EVM 网络的 RPC URL 包含 walletDomain 变量（如 `${walletDomain}/rpc/v1/eth`），初始化时会自动替换。

### Q: 支持添加自定义网络吗？

A: 当前版本使用静态数据，如需动态添加，可以扩展 NetworkManager 类。

### Q: Node.js 包如何发布到 npm？

A: 执行 `./build.sh` 后，在项目根目录运行 `npm publish`（需要配置 npm registry）。

---

## 📞 联系方式

- 文档：`README.md`, `SUMMARY.md`
- 示例：`example/example.dart`
- 测试：`test/network_manage_test.dart`

---

**版本**: 1.0.0  
**最后更新**: 2025-12-19

