# 📚 Network Manage Package - 文档导航

## 🚀 快速开始

| 文档 | 用途 | 推荐 |
|------|------|------|
| [README.md](./README.md) | 项目介绍、功能概述 | ⭐⭐⭐⭐⭐ |
| [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) | 快速参考卡片 | ⭐⭐⭐⭐⭐ |
| [example/example.dart](./example/example.dart) | 代码示例 | ⭐⭐⭐⭐⭐ |

---

## 📖 详细文档

### 使用指南

| 文档 | 内容 | 适合人群 |
|------|------|----------|
| [USAGE.md](./USAGE.md) | 详细使用指南、API 文档、实战示例 | 所有开发者 |
| [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) | 快速查阅表、常用命令 | 日常开发 |

### 构建相关

| 文档 | 内容 | 适合人群 |
|------|------|----------|
| [BUILD_NOTES.md](./BUILD_NOTES.md) | 构建问题详细说明 | 维护者、CI/CD 配置 |
| [BUILD_REPORT.md](./BUILD_REPORT.md) | 构建问题修复完整报告 | 问题排查 |
| [REVIEW_SUMMARY.md](./REVIEW_SUMMARY.md) | Code Review 总结 | Code Reviewer |

### 版本历史

| 文档 | 内容 | 适合人群 |
|------|------|----------|
| [CHANGELOG.md](./CHANGELOG.md) | 版本更新日志 | 所有开发者 |
| [SUMMARY.md](./SUMMARY.md) | 项目执行总结 | 项目管理 |

---

## 🎯 根据角色选择文档

### 👨‍💻 如果你是第一次使用

1. ✅ [README.md](./README.md) - 了解项目是什么
2. ✅ [example/example.dart](./example/example.dart) - 查看代码示例
3. ✅ [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - 快速上手

### 🔧 如果你想深入学习

1. ✅ [USAGE.md](./USAGE.md) - 完整 API 文档
2. ✅ [test/network_manage_test.dart](./test/network_manage_test.dart) - 测试用例
3. ✅ [lib/src/](./lib/src/) - 源码实现

### 🏗️ 如果你想构建/部署

1. ✅ [build.sh](./build.sh) - 自动化构建脚本
2. ✅ [BUILD_NOTES.md](./BUILD_NOTES.md) - 构建说明
3. ✅ [package.json](./package.json) - npm scripts

### 🐛 如果你遇到问题

1. ✅ [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - 故障排查章节
2. ✅ [BUILD_REPORT.md](./BUILD_REPORT.md) - 已知问题和解决方案
3. ✅ [BUILD_NOTES.md](./BUILD_NOTES.md) - 详细的问题分析

### 📝 如果你要做 Code Review

1. ✅ [REVIEW_SUMMARY.md](./REVIEW_SUMMARY.md) - Review 总结
2. ✅ [BUILD_REPORT.md](./BUILD_REPORT.md) - 修复报告
3. ✅ [CHANGELOG.md](./CHANGELOG.md) - 变更历史

---

## 📁 文件结构

```
network_manage/
│
├── 📚 核心文档
│   ├── README.md                   ⭐ 项目介绍
│   ├── QUICK_REFERENCE.md          ⭐ 快速参考
│   ├── USAGE.md                    📖 详细使用指南
│   └── INDEX.md                    📑 本导航文档
│
├── 🔨 构建相关
│   ├── BUILD_NOTES.md              构建说明
│   ├── BUILD_REPORT.md             修复报告
│   ├── REVIEW_SUMMARY.md           Review 总结
│   ├── build.sh                    构建脚本
│   └── test_node.js                Node.js 测试
│
├── 📦 配置文件
│   ├── pubspec.yaml                Dart 依赖
│   └── package.json                Node.js 配置
│
├── 💻 源代码
│   ├── lib/
│   │   ├── network_manage.dart          Dart 入口
│   │   ├── network_manage_node.dart     Node 入口
│   │   └── src/
│   │       ├── models/network.dart      数据模型
│   │       ├── data/network_data.dart   网络数据
│   │       └── network_manager.dart     管理器
│   │
│   ├── test/
│   │   └── network_manage_test.dart     单元测试
│   │
│   └── example/
│       └── example.dart                 使用示例
│
├── 📝 版本历史
│   ├── CHANGELOG.md                版本日志
│   └── SUMMARY.md                  执行总结
│
└── 🏗️ 构建输出
    └── dist/
        ├── network_manage.js       JS 代码
        └── network_manage.d.ts     TS 定义
```

---

## 🔗 快速跳转

### 常用命令

```bash
# 安装依赖
dart pub get

# 运行测试
dart test

# 构建
./build.sh

# 运行示例
dart run example/example.dart

# Node.js 测试
node test_node.js
```

### 常用代码片段

```dart
// 获取实例
final manager = NetworkManager.getInstance();

// 获取所有 EVM 网络
final evmNetworks = manager.loadNetworks(chainType: 'EVM');

// 获取以太坊网络
final ethNetwork = manager.getNetwork(chainId: 1);
```

---

## 📊 文档统计

| 类型 | 数量 | 文件 |
|------|------|------|
| 📖 使用文档 | 3 | README, USAGE, QUICK_REFERENCE |
| 🔨 构建文档 | 3 | BUILD_NOTES, BUILD_REPORT, REVIEW_SUMMARY |
| 📝 历史记录 | 2 | CHANGELOG, SUMMARY |
| 💻 代码文件 | 5 | lib/ + test/ + example/ |
| 🔧 配置文件 | 3 | pubspec.yaml, package.json, build.sh |
| **总计** | **16** | - |

---

## 🎓 学习路径

### 初级（30 分钟）

1. 阅读 README.md（5 分钟）
2. 运行 example.dart（5 分钟）
3. 浏览 QUICK_REFERENCE.md（10 分钟）
4. 尝试基本 API（10 分钟）

### 中级（2 小时）

1. 阅读 USAGE.md（30 分钟）
2. 阅读源码 lib/src/（30 分钟）
3. 阅读测试用例（30 分钟）
4. 编写自己的示例（30 分钟）

### 高级（半天）

1. 研究 BUILD_NOTES.md（1 小时）
2. 尝试修改源码（1 小时）
3. 运行完整构建（30 分钟）
4. 阅读 Code Review 文档（30 分钟）

---

## 💡 文档更新

**最后更新**: 2025-12-19  
**版本**: 1.0.0  
**维护者**: Tomo Team

### 更新日志

- 2025-12-19: 创建完整文档体系
- 2025-12-19: 修复 build.sh 编译问题
- 2025-12-19: 添加导航文档（本文档）

---

## 📧 获取帮助

如果文档无法解决你的问题：

1. 🔍 搜索相关文档关键词
2. 📖 查看 [BUILD_REPORT.md](./BUILD_REPORT.md) 的故障排查章节
3. 🧪 运行测试用例寻找灵感
4. 💬 联系项目维护者

---

**提示**: 建议将 `QUICK_REFERENCE.md` 收藏以便日常使用！

🎉 **Happy Coding!**

