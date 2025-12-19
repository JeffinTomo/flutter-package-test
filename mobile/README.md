# Flutter WebF Demo

这是一个集成了 WebF 的 Flutter 应用，用于加载和显示 localhost:5173 的 web 页面。

## 功能特性

- ✅ 加载 localhost:5173 的 WebF 页面
- ✅ URL 地址栏可以修改和跳转
- ✅ 刷新按钮重新加载页面
- ✅ 错误提示

## 运行步骤

### 1. 安装依赖

```bash
cd /Users/shuise/flutter-dev/mobile
flutter pub get
```

### 2. 启动 WebF 服务器

确保您的 WebF 服务器在 localhost:5173 上运行。

### 3. 运行应用

```bash
# 查看可用设备
flutter devices

# 在 iOS 模拟器上运行
flutter run -d <device-id>

# 或者直接运行（会提示选择设备）
flutter run
```

## 使用说明

1. 应用启动后会自动加载 `http://localhost:5173`
2. 可以在顶部地址栏修改 URL 并点击 "Go" 按钮跳转
3. 点击右上角刷新按钮重新加载页面

## 开发模式

```bash
# 热重载开发
flutter run

# 按 r 键热重载
# 按 R 键热重启
# 按 q 键退出
```

## 注意事项

- 确保 WebF 服务器正在运行
- iOS 模拟器可以直接访问 localhost
- 真机需要使用电脑的 IP 地址（如 http://192.168.1.100:5173）

## 参考资料

- [OpenWebF 官方文档](https://openwebf.com/en/docs/add-webf-to-flutter/overview)
- [Flutter 官方文档](https://docs.flutter.dev/)

