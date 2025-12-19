import 'package:flutter/material.dart';
import 'package:webf/webf.dart';
import 'package:network_manage/network_manage.dart';

void main() async {
  // ✅ 确保 Flutter 绑定初始化
  WidgetsFlutterBinding.ensureInitialized();

  print('🚀 应用启动');

  // ✅ 测试 network_manage package
  _testNetworkManage();

  // ✅ 初始化 WebFControllerManager（新架构要求）
  WebFControllerManager.instance.initialize(WebFControllerManagerConfig(
    maxAliveInstances: 3,
    maxAttachedInstances: 2,
    enableDevTools: true,  // 开启 DevTools 调试
    devToolsPort: 9222,
    onControllerDisposed: (String name, WebFController controller) {
      print('📦 Controller disposed: $name');
    },
    onControllerDetached: (String name, WebFController controller) {
      print('🔌 Controller detached: $name');
    },
  ));

  // ✅ 使用新的 API 添加预加载的 Controller
  WebFControllerManager.instance.addWithPreload(
    name: 'wlfi-home',  // Controller 名称
    createController: () => WebFController(
      // 🎨 设置黑色背景
      background: Colors.black,
      // ✅ 监听 LCP（最大内容绘制）事件 - 这是页面加载完成的真实指标
      onLCP: (time, isEvaluated) {
        print('✅ 页面加载完成！LCP: ${time}ms, evaluated: $isEvaluated');
      },
      // ✅ 监听 Controller 初始化
      onControllerInit: (controller) async {
        print('🎮 Controller 已初始化');
        
        // ✅ 监听最终的 LCP 事件（页面真正渲染完成）
        controller.loadingState.onFinalLargestContentfulPaint((event) {
          print('🎨 页面渲染完成！Final LCP: $event');
          
          // 可选：输出加载状态详情（用于调试）
          final dump = controller.dumpLoadingState(
            options: LoadingStateDumpOptions.html |
                LoadingStateDumpOptions.api |
                LoadingStateDumpOptions.scripts,
          );
          print('📊 加载状态：\n${dump.toStringFiltered()}');
        });
      },
    ),
    // ✅ 加载本地开发服务器
    bundle: WebFBundle.fromUrl('http://localhost:5173'),
    // ✅ 可选：Controller 创建后的额外设置
    setup: (controller) {
      print('⚙️ Controller setup 完成');
    },
  );

  runApp(const MyApp());
}

/// 测试 network_manage package
void _testNetworkManage() {
  print('\n========== 🌐 Network Manage 测试 ==========');

  // 1. 获取实例
  final manager = NetworkManager.getInstance();

  // 2. 加载所有网络
  final allNetworks = manager.loadNetworks();
  print('✅ 加载所有网络: ${allNetworks.length} 个');

  // 3. 加载 EVM 网络
  final evmNetworks = manager.loadNetworks('EVM');
  print('✅ EVM 网络: ${evmNetworks.length} 个');
  for (var network in evmNetworks.take(3)) {
    print('   - ${network.chainName} (chainId: ${network.chainId})');
  }

  // 4. 获取 Ethereum 详情
  final ethereum = manager.getNetwork(1);
  if (ethereum != null) {
    print('✅ Ethereum 详情:');
    print('   名称: ${ethereum.chainName}');
    print('   符号: ${ethereum.nativeCurrencySymbol}');
    print('   精度: ${ethereum.nativeCurrencyDecimals}');
  }

  // 5. 获取 Bitcoin
  final bitcoin = manager.getNetworkByName('BITCOIN');
  if (bitcoin != null) {
    print('✅ Bitcoin: ${bitcoin.chainName} (${bitcoin.platformType})');
  }

  // 6. 获取支持的链类型
  final chainTypes = manager.getSupportedChainTypes();
  print('✅ 支持的链类型: ${chainTypes.join(", ")}');

  print('========================================\n');
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Tomo WebF',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      home: const WebFPage(),
    );
  }
}

class WebFPage extends StatelessWidget {
  const WebFPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Tomo WebF'),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        actions: [
          // ✅ 重新加载按钮
          IconButton(
            icon: const Icon(Icons.refresh),
            tooltip: '重新加载',
            onPressed: () async {
              final controller = await WebFControllerManager.instance.getController('wlfi-home');
              if (controller != null) {
                print('🔄 重新加载页面');
                await controller.reload();
              }
            },
          ),
        ],
      ),
      // ✅ 使用新的 fromControllerName API
      body: WebF.fromControllerName(
        controllerName: 'wlfi-home',
        // ✅ 加载时显示的 Widget（黑色背景）
        loadingWidget: Container(
          color: Colors.black,
          child: const Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                CircularProgressIndicator(color: Colors.white),
                SizedBox(height: 16),
                Text(
                  '正在加载 WebF 页面...',
                  style: TextStyle(fontSize: 16, color: Colors.white),
                ),
                SizedBox(height: 8),
                Text(
                  'URL: http://localhost:5173',
                  style: TextStyle(fontSize: 12, color: Colors.grey),
                ),
              ],
            ),
          ),
        ),
        // ✅ 加载失败时显示的 Widget
        errorBuilder: (context, error) {
          return Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.error_outline, size: 64, color: Colors.red),
                const SizedBox(height: 16),
                const Text(
                  '加载失败',
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 8),
                Text(
                  '错误: $error',
                  textAlign: TextAlign.center,
                  style: const TextStyle(color: Colors.grey),
                ),
                const SizedBox(height: 24),
                ElevatedButton(
                  onPressed: () async {
                    // 重新加载
                    final controller = await WebFControllerManager.instance.getController('wlfi-home');
                    if (controller != null) {
                      await controller.reload();
                    }
                  },
                  child: const Text('重试'),
                ),
              ],
            ),
          );
        },
        // ✅ Controller 创建成功的回调
        onControllerCreated: (controller) {
          print('🎯 WebF Controller 已创建并挂载到 Widget');
        },
        // ✅ 构建成功的回调
        onBuildSuccess: () {
          print('🏗️ WebF Widget 构建成功');
        },
      ),
    );
  }
}
