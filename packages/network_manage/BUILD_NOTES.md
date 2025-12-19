# Build Notes - network_manage Package

## ✅ 构建问题已解决

### 问题描述

运行 `build.sh` 时遇到错误：
```
Error: No 'main' method found.
Error: Compilation failed.
```

### 根本原因

`dart compile js` 命令要求输入文件必须包含 `main()` 函数，但我们的 `lib/network_manage.dart` 是一个库文件（library），只包含 export 语句，没有 main 函数。

### 解决方案

创建了一个新的入口文件 `lib/network_manage_node.dart`：

```dart
library network_manage_node;

import 'network_manage.dart';
export 'network_manage.dart';

// ✅ dart2js 需要的 main() 函数
void main() {
  print('network_manage package loaded');
}

// 提供 Node.js 互操作的辅助函数
dynamic getNetworkManager([String? walletDomain]) {
  return NetworkManager.getInstance(
    walletDomain: walletDomain ?? 'https://api.tomo.inc',
  );
}
```

更新 `build.sh` 使用新的入口文件：

```bash
# Before
dart compile js lib/network_manage.dart -o dist/network_manage.js -O4

# After ✅
dart compile js lib/network_manage_node.dart -o dist/network_manage.js -O4
```

### 构建结果

```
✅ 编译成功
📦 输入: 10,251,192 bytes (5,255,472 characters)
📦 输出: 5,190 characters JavaScript
⏱️  时间: 0.20 seconds
```

生成文件：
- `dist/network_manage.js` - 编译后的 JavaScript 代码
- `dist/network_manage.d.ts` - TypeScript 类型定义

---

## 🔧 构建命令

### 完整构建（推荐）

```bash
cd /Users/shuise/flutter-dev/packages/network_manage
chmod +x build.sh
./build.sh
```

这个脚本会：
1. ✅ 检查 Dart 环境
2. ✅ 安装依赖 (`dart pub get`)
3. ✅ 运行测试 (`dart test`)
4. ✅ 编译为 JavaScript (`dart compile js`)
5. ✅ 生成 TypeScript 定义

### 仅编译（跳过测试）

```bash
cd /Users/shuise/flutter-dev/packages/network_manage
mkdir -p dist
dart compile js lib/network_manage_node.dart -o dist/network_manage.js -O4
```

### 测试 Node.js 集成

```bash
node test_node.js
```

---

## ⚠️ Dart to JavaScript 限制

### 已知问题

Dart 编译到 JavaScript 有一些限制：

1. **类型系统差异**  
   Dart 的类型系统和 JavaScript 不完全兼容

2. **异步操作**  
   Dart 的 Future/async-await 编译后的行为可能与预期不同

3. **互操作性**  
   从 Node.js 调用 Dart 编译的代码需要理解 Dart2JS 的输出格式

### 建议的使用方式

**方案 A: Dart/Flutter 项目（推荐）**

```dart
import 'package:network_manage/network_manage.dart';

final manager = NetworkManager.getInstance();
final networks = manager.loadNetworks('EVM');
```

**方案 B: Node.js/TypeScript 项目**

如果需要在 Node.js 中使用，建议：

1. **选项 1**: 使用 Dart 的 package 作为数据源，用 TypeScript 重写逻辑
2. **选项 2**: 将数据导出为 JSON，在 Node.js 中直接读取
3. **选项 3**: 使用编译后的 JS，但需要深入理解 Dart2JS 互操作

---

## 📦 推荐的部署方式

### For Dart/Flutter

```yaml
# pubspec.yaml
dependencies:
  network_manage:
    path: ../packages/network_manage
```

### For TypeScript/JavaScript

导出数据为 JSON：

```bash
# 创建数据导出脚本
dart run tool/export_json.dart
```

```typescript
// 在 TypeScript 中使用
import networks from './networks.json';

const ethereum = networks.find(n => n.chainId === 1);
```

---

## 🔄 更新编译脚本

如果需要修改构建流程：

1. **编辑 `build.sh`**
2. **保持 `network_manage_node.dart` 作为入口**
3. **确保 main() 函数存在**
4. **测试编译结果**

---

## ✅ 检查清单

构建前检查：

- [ ] Dart SDK 已安装 (`dart --version`)
- [ ] 依赖已安装 (`dart pub get`)
- [ ] 测试通过 (`dart test`)

构建后验证：

- [ ] `dist/network_manage.js` 存在
- [ ] `dist/network_manage.d.ts` 存在
- [ ] 文件大小合理（~5KB）
- [ ] 无编译警告

---

## 📞 问题排查

### 编译失败

```bash
# 检查 Dart 版本
dart --version  # 应该 >= 3.10.0

# 清理并重试
rm -rf dist
dart pub get
./build.sh
```

### 测试失败

```bash
# 运行详细测试
dart test --reporter=verbose
```

### Node.js 加载失败

```bash
# 检查生成的文件
ls -lh dist/
node test_node.js
```

---

**最后更新**: 2025-12-19  
**状态**: ✅ 构建问题已解决，脚本正常工作

