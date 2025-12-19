import { useState } from 'react';
import { NetworkManager, Network } from '@tomo/network-manage';

/**
 * Network Manage 测试页面
 * 用于测试 network_manage 包的功能
 */
export default function NetworkManagePage() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // 获取 NetworkManager 实例
  const manager = NetworkManager.getInstance();

  /**
   * 查询所有网络
   */
  const handleLoadAllNetworks = () => {
    try {
      setLoading(true);
      const networks = manager.loadNetworks();
      const resultText = `查询成功！\n\n共找到 ${networks.length} 个网络:\n\n${networks
        .map(
          (n: Network) =>
            `• ${n.name} (Chain ID: ${n.chainId})\n  类型: ${n.platformType}, 符号: ${n.nativeCurrencySymbol}`
        )
        .join('\n\n')}`;
      setResult(resultText);
    } catch (error) {
      setResult(`查询失败: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 查询所有 EVM 网络
   */
  const handleLoadEvmNetworks = () => {
    try {
      setLoading(true);
      const networks = manager.loadNetworks('EVM');
      const resultText = `查询成功！\n\n共找到 ${networks.length} 个 EVM 网络:\n\n${networks
        .map(
          (n: Network) =>
            `• ${n.name} (Chain ID: ${n.chainId})\n  符号: ${n.nativeCurrencySymbol}, RPC: ${n.rpcUrls?.[0] || 'N/A'}`
        )
        .join('\n\n')}`;
      setResult(resultText);
    } catch (error) {
      setResult(`查询失败: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 查询 id=3 的网络
   */
  const handleLoadNetworkById3 = () => {
    try {
      setLoading(true);
      const network = manager.getNetwork(3);
      if (network) {
        const resultText = `查询成功！\n\n找到网络:\n\n• 名称: ${network.name}\n• Chain ID: ${network.chainId}\n• 链名: ${network.chainName}\n• 类型: ${network.platformType}\n• 符号: ${network.nativeCurrencySymbol}\n• 小数位: ${network.nativeCurrencyDecimals}\n• 图标: ${network.icon}\n• 支持交换: ${network.supportSwap ? '是' : '否'}\n• 测试网: ${network.isTestnet ? '是' : '否'}\n• 区块浏览器: ${network.blockExplorerUrl || 'N/A'}`;
        setResult(resultText);
      } else {
        setResult('查询失败: 未找到 Chain ID 为 3 的网络');
      }
    } catch (error) {
      setResult(`查询失败: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-4xl">
        {/* 标题 */}
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-2">
          Network Manage 测试
        </h1>
        <p className="text-gray-600 text-center mb-8">
          测试 network_manage 包的基本功能
        </p>

        {/* 按钮区域 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex flex-col gap-4">
            {/* 按钮 1: 查询所有网络 */}
            <button
              onClick={handleLoadAllNetworks}
              disabled={loading}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '查询中...' : '📡 查询所有网络 (allNetworks)'}
            </button>

            {/* 按钮 2: 查询 EVM 网络 */}
            <button
              onClick={handleLoadEvmNetworks}
              disabled={loading}
              className="w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '查询中...' : '⚡ 查询 EVM 网络 (evmNetworks)'}
            </button>

            {/* 按钮 3: 查询 id=3 的网络 */}
            <button
              onClick={handleLoadNetworkById3}
              disabled={loading}
              className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '查询中...' : '🔍 查询 Chain ID = 3 的网络'}
            </button>
          </div>
        </div>

        {/* 结果显示区域 */}
        {result && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">查询结果</h2>
              <button
                onClick={() => setResult('')}
                className="text-gray-500 hover:text-gray-700 font-medium"
              >
                清除
              </button>
            </div>
            <pre className="bg-gray-50 p-6 rounded-xl overflow-auto max-h-96 text-sm text-gray-700 whitespace-pre-wrap font-mono border border-gray-200">
              {result}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

