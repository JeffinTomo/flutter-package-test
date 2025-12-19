## 目标
开发测试 - ✅ 已完成！

Flutter 已升级到 3.38.5，
现在可以安装 WebF 0.23.0 了：

## 项目结构

```
flutter-dev/
├── mobile/               # Flutter 应用（集成 WebF）
├── webf/                 # WebF 页面内容
├── start.sh              # 一键启动脚本
├── QUICKSTART.md         # 快速开始指南
└── README.md             # 本文件
```


## 启动模拟器
```
open /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app 2>&1 || echo "Simulator not found at default location"
```

## 🚀 快速启动（推荐）

**一键启动 WebF 服务器 + Flutter 应用：**

```bash
cd /Users/shuise/flutter-dev/mobile
flutter run
```

## 混合应用
原生 App 内部嵌入一个复杂的、由 Web 技术栈驱动的活动页面.


## 最佳实践
1. 组件化思维：将可复用的 UI 块（包含 Flutter 和 Web 组件）封装成独立的组件.
2. 启用 WebAssembly：确保在构建和运行中启用 WebAssembly，获得最佳性能.
3. 优化原生通信（JS Bridge）：减少 Flutter 和 JavaScript 之间的频繁通信，批量传递数据.
4. 原生插件：使用 Flutter 插件（如访问相机、地理位置），同时通过 WebF 与 JS 交互.
5. JS 桥接：编写 JavaScript 调用 Flutter 方法，或 Flutter 调用 JS 逻辑，实现跨技术栈互操作.

## 开发与调试
1. 热重载与热重启：善用 Flutter 的热重载（Hot Reload）和热重启（Hot Restart）进行快速迭代.
2. 浏览器开发者工具：使用浏览器调试 Web 部分，配合 Flutter DevTools 调试原生部分.



