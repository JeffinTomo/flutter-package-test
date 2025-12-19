# WebF 内容目录

这个目录用于存放在 Flutter 应用中通过 WebF 加载的 web 内容。

## 📁 文件说明

- `index.html` - 示例 WebF 页面

## 🚀 启动开发服务器

您可以使用任何 HTTP 服务器在 5173 端口运行这个目录：

### 方法 1：使用 Python

```bash
cd /Users/shuise/flutter-dev/webf

# Python 3
python3 -m http.server 5173

# Python 2
python -m SimpleHTTPServer 5173
```

### 方法 2：使用 Node.js (http-server)

```bash
# 安装 http-server
npm install -g http-server

# 启动服务器
cd /Users/shuise/flutter-dev/webf
http-server -p 5173
```

### 方法 3：使用 Vite（推荐）

```bash
# 安装 vite
npm install -g vite

# 启动服务器
cd /Users/shuise/flutter-dev/webf
vite --port 5173
```

### 方法 4：使用 serve

```bash
# 安装 serve
npm install -g serve

# 启动服务器
cd /Users/shuise/flutter-dev/webf
serve -p 5173
```

## 🧪 测试

启动服务器后：

1. 在浏览器中访问 `http://localhost:5173` 确认页面可以访问
2. 运行 Flutter 应用，应该能看到这个页面加载到应用中
3. 测试页面上的交互按钮

## 🎨 自定义

您可以：
- 修改 `index.html` 来自定义页面内容
- 添加更多 HTML、CSS、JavaScript 文件
- 使用任何前端框架（React、Vue、Svelte 等）

只需确保服务器在端口 5173 上运行即可。

