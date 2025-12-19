import 'models/network.dart';
import 'data/network_data.dart';

/// 网络管理器
class NetworkManager {
  static NetworkManager? _instance;
  final String walletDomain;
  late final List<Network> _networks;

  NetworkManager._({required this.walletDomain}) {
    _networks = getNetworkData(walletDomain)
        .map((json) => Network.fromJson(json))
        .toList();
  }

  /// 获取单例实例
  factory NetworkManager.getInstance({String walletDomain = 'https://api.tomo.inc'}) {
    _instance ??= NetworkManager._(walletDomain: walletDomain);
    return _instance!;
  }

  /// 加载网络列表
  /// 
  /// [chainType] - 链类型过滤（如 'EVM', 'SOLANA', 'BTC' 等）
  /// 为空时返回所有网络
  /// 
  /// 返回值：符合条件的网络列表
  List<Network> loadNetworks([String? chainType]) {
    if (chainType == null || chainType.isEmpty) {
      return List.unmodifiable(_networks);
    }
    return _networks
        .where((network) => network.platformType == chainType.toUpperCase())
        .toList();
  }

  /// 获取指定网络详情
  /// 
  /// [chainType] - 链类型（可选，用于优化查询）
  /// [chainId] - 链 ID
  /// 
  /// 返回值：找到的网络，未找到返回 null
  Network? getNetwork(int chainId, [String? chainType]) {
    if (chainType != null && chainType.isNotEmpty) {
      return _networks.firstWhere(
        (network) =>
            network.chainId == chainId &&
            network.platformType == chainType.toUpperCase(),
        orElse: () => throw Exception('Network not found for chainId: $chainId, chainType: $chainType'),
      );
    }
    
    try {
      return _networks.firstWhere(
        (network) => network.chainId == chainId,
      );
    } catch (e) {
      return null;
    }
  }

  /// 根据网络名称获取网络
  Network? getNetworkByName(String name) {
    try {
      return _networks.firstWhere(
        (network) => network.name == name.toUpperCase(),
      );
    } catch (e) {
      return null;
    }
  }

  /// 获取所有支持的链类型
  List<String> getSupportedChainTypes() {
    return _networks.map((n) => n.platformType).toSet().toList()..sort();
  }

  /// 获取测试网列表
  List<Network> getTestnetNetworks() {
    return _networks.where((n) => n.isTestnet == true).toList();
  }

  /// 获取主网列表
  List<Network> getMainnetNetworks() {
    return _networks.where((n) => n.isTestnet != true).toList();
  }
}

