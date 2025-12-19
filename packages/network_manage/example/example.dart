import 'package:network_manage/network_manage.dart';

void main() {
  print('=== Network Manage 示例 ===\n');

  // 1. 获取 NetworkManager 实例
  final manager = NetworkManager.getInstance(
    walletDomain: 'https://api.tomo.inc',
  );

  // 2. 加载所有网络
  print('--- 所有网络 ---');
  final allNetworks = manager.loadNetworks();
  print('总共 ${allNetworks.length} 个网络\n');

  // 3. 按链类型过滤
  print('--- EVM 网络 ---');
  final evmNetworks = manager.loadNetworks('EVM');
  for (var network in evmNetworks.take(5)) {
    print('${network.chainName} (chainId: ${network.chainId})');
  }
  print('... 共 ${evmNetworks.length} 个 EVM 网络\n');

  // 4. 获取特定网络详情
  print('--- Ethereum 详情 ---');
  final ethereum = manager.getNetwork(1);
  if (ethereum != null) {
    print('名称: ${ethereum.chainName}');
    print('符号: ${ethereum.nativeCurrencySymbol}');
    print('精度: ${ethereum.nativeCurrencyDecimals}');
    print('区块浏览器: ${ethereum.blockExplorerUrl}');
    print('支持交换: ${ethereum.supportSwap}');
    print('支持赠送: ${ethereum.supportGift}\n');
  }

  // 5. 根据名称查询
  print('--- Bitcoin 详情 ---');
  final bitcoin = manager.getNetworkByName('BITCOIN');
  if (bitcoin != null) {
    print('名称: ${bitcoin.chainName}');
    print('符号: ${bitcoin.nativeCurrencySymbol}');
    print('类型: ${bitcoin.platformType}\n');
  }

  // 6. 获取支持的链类型
  print('--- 支持的链类型 ---');
  final chainTypes = manager.getSupportedChainTypes();
  print(chainTypes.join(', '));
  print('');

  // 7. 获取测试网
  print('--- 测试网络 ---');
  final testnets = manager.getTestnetNetworks();
  print('共 ${testnets.length} 个测试网络');

  // 8. 获取主网
  print('--- 主网络 ---');
  final mainnets = manager.getMainnetNetworks();
  print('共 ${mainnets.length} 个主网络\n');

  // 9. Solana 网络
  print('--- Solana 网络 ---');
  final solanaNetworks = manager.loadNetworks('SOLANA');
  for (var network in solanaNetworks) {
    print('${network.chainName}:');
    print('  RPC URLs: ${network.rpcUrls?.length ?? 0} 个');
    print('  浏览器: ${network.blockExplorerUrl}');
  }
}

