/// 网络信息模型
class Network {
  final int chainId;
  final int chainIndex;
  final String name;
  final String chainName;
  final String nativeCurrencyName;
  final String nativeCurrencySymbol;
  final int nativeCurrencyDecimals;
  final String platformType;
  final String icon;
  final bool supportSwap;
  final bool supportGift;
  final bool supportHistory;
  final List<String>? rpcUrls;
  final String? blockExplorerUrl;
  final bool? isTestnet;

  const Network({
    required this.chainId,
    required this.chainIndex,
    required this.name,
    required this.chainName,
    required this.nativeCurrencyName,
    required this.nativeCurrencySymbol,
    required this.nativeCurrencyDecimals,
    required this.platformType,
    required this.icon,
    required this.supportSwap,
    required this.supportGift,
    required this.supportHistory,
    this.rpcUrls,
    this.blockExplorerUrl,
    this.isTestnet,
  });

  factory Network.fromJson(Map<String, dynamic> json) {
    return Network(
      chainId: json['chainId'] as int,
      chainIndex: json['chainIndex'] as int,
      name: json['name'] as String,
      chainName: json['chainName'] as String,
      nativeCurrencyName: json['nativeCurrencyName'] as String,
      nativeCurrencySymbol: json['nativeCurrencySymbol'] as String,
      nativeCurrencyDecimals: json['nativeCurrencyDecimals'] as int,
      platformType: json['platformType'] as String,
      icon: json['icon'] as String,
      supportSwap: json['supportSwap'] as bool,
      supportGift: json['supportGift'] as bool,
      supportHistory: json['supportHistory'] as bool,
      rpcUrls: (json['rpcUrls'] as List<dynamic>?)?.cast<String>(),
      blockExplorerUrl: json['blockExplorerUrl'] as String?,
      isTestnet: json['isTestnet'] as bool?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'chainId': chainId,
      'chainIndex': chainIndex,
      'name': name,
      'chainName': chainName,
      'nativeCurrencyName': nativeCurrencyName,
      'nativeCurrencySymbol': nativeCurrencySymbol,
      'nativeCurrencyDecimals': nativeCurrencyDecimals,
      'platformType': platformType,
      'icon': icon,
      'supportSwap': supportSwap,
      'supportGift': supportGift,
      'supportHistory': supportHistory,
      if (rpcUrls != null) 'rpcUrls': rpcUrls,
      if (blockExplorerUrl != null) 'blockExplorerUrl': blockExplorerUrl,
      if (isTestnet != null) 'isTestnet': isTestnet,
    };
  }

  @override
  String toString() {
    return 'Network(name: $name, chainId: $chainId, platformType: $platformType)';
  }
}

