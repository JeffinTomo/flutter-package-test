# WebF Router - 路由兼容层

基于 [OpenWebF 官方示例](https://github.com/openwebf/webf/blob/main/use_cases/src/router.tsx) 实现的路由兼容层，支持在 WebF 环境和浏览器环境中使用统一的路由 API。

## 特性

- 🔄 **自动环境检测** - 运行时自动检测 WebF 或浏览器环境
- 🎯 **统一 API** - 在两种环境下使用相同的代码
- 🚀 **零配置切换** - 无需修改代码即可在不同环境运行
- 📦 **类型安全** - 完整的 TypeScript 类型支持

## 环境支持

| 环境 | 路由库 | 说明 |
|------|--------|------|
| WebF | `@openwebf/react-router` | 使用 Flutter 原生路由 |
| Browser | `react-router-dom` | 使用 Web 标准路由 |

## 使用方法

### 1. RouterProvider

在应用根组件使用 `RouterProvider` 包裹：

```tsx
import { RouterProvider, AppRoutes } from './router';

function App() {
  return (
    <RouterProvider>
      <AppRoutes />
    </RouterProvider>
  );
}
```

### 2. 定义路由

使用兼容的 `Routes` 和 `Route` 组件：

```tsx
import { Routes, Route } from './router/webf-router';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}
```

### 3. 编程式导航

使用 `WebFRouter` API 进行导航：

```tsx
import { WebFRouter } from './router';

// 返回上一页
WebFRouter.back();

// 推入新路由
WebFRouter.push('/about');

// 替换当前路由
WebFRouter.replace('/login');

// 带状态导航
WebFRouter.push('/profile', { userId: 123 });
```

### 4. 使用 Hooks

```tsx
import { useLocation, useParams } from './router';

function MyComponent() {
  const location = useLocation();
  const params = useParams();
  
  console.log('Current path:', location.pathname);
  console.log('Route params:', params);
}
```

### 5. 使用 Link 组件

```tsx
import { WebFRouterLink } from './router';

function Navigation() {
  return (
    <WebFRouterLink 
      path="/about" 
      title="About Page"
      onScreen={() => console.log('Link visible')}
    >
      Go to About
    </WebFRouterLink>
  );
}
```

## WebFRouter API

### 导航方法

| 方法 | 参数 | 说明 |
|------|------|------|
| `push(path, state?)` | path: string, state?: any | 推入新路由 |
| `replace(path, state?)` | path: string, state?: any | 替换当前路由 |
| `back()` | - | 返回上一页 |
| `pushState(state, path)` | state: any, path: string | 推入带状态的路由 |
| `replaceState(state, path)` | state: any, path: string | 替换带状态的路由 |
| `popAndPushNamed(path, state?)` | path: string, state?: any | 弹出并推入新路由 |
| `canPop()` | - | 检查是否可以返回 |
| `maybePop(opts?)` | opts?: { cancelled?: boolean } | 尝试返回 |
| `restorablePopAndPushNamed(path, state?)` | path: string, state?: any | 可恢复的弹出并推入 |

### 环境检测

```tsx
import { isWebFEnvironment } from './router';

if (isWebFEnvironment) {
  console.log('Running in WebF environment');
} else {
  console.log('Running in browser environment');
}
```

## 迁移指南

### 从 react-router-dom 迁移

**之前：**
```tsx
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/about');
  };
}
```

**之后：**
```tsx
import { WebFRouter } from './router';

function MyComponent() {
  const handleClick = () => {
    WebFRouter.push('/about');
  };
}
```

### 路由配置迁移

**之前（createBrowserRouter）：**
```tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
]);

function App() {
  return <RouterProvider router={router} />;
}
```

**之后（WebF Router）：**
```tsx
import { RouterProvider, Routes, Route } from './router';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

function App() {
  return (
    <RouterProvider>
      <AppRoutes />
    </RouterProvider>
  );
}
```

## 最佳实践

1. **统一使用 WebFRouter API** - 避免直接使用 `useNavigate`，使用 `WebFRouter` 获得更好的兼容性
2. **导入统一入口** - 从 `./router` 导入所有路由相关功能
3. **避免环境特定代码** - 不要编写只在某个环境工作的代码
4. **使用声明式路由** - 优先使用 `<Route>` 组件而非编程式导航

## 参考资源

- [OpenWebF 官方 Router 示例](https://github.com/openwebf/webf/blob/main/use_cases/src/router.tsx)
- [OpenWebF 文档](https://openwebf.com)
- [React Router 文档](https://reactrouter.com)

