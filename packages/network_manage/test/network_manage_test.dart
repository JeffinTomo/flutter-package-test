import 'package:test/test.dart';
import 'package:network_manage/network_manage.dart';

void main() {
  late NetworkManager manager;

  setUp(() {
    manager = NetworkManager.getInstance();
  });

  group('NetworkManager', () {
    test('loadNetworks() 返回所有网络', () {
      final networks = manager.loadNetworks();
      expect(networks, isNotEmpty);
      expect(networks.length, greaterThan(10));
    });

    test('loadNetworks(chainType) 按链类型过滤', () {
      final evmNetworks = manager.loadNetworks('EVM');
      expect(evmNetworks, isNotEmpty);
      
      for (var network in evmNetworks) {
        expect(network.platformType, equals('EVM'));
      }
    });

    test('getNetwork() 返回正确的网络', () {
      final ethereum = manager.getNetwork(1);
      expect(ethereum, isNotNull);
      expect(ethereum!.name, equals('ETH'));
      expect(ethereum.chainName, equals('Ethereum'));
      expect(ethereum.platformType, equals('EVM'));
    });

    test('getNetwork() 未找到时返回 null', () {
      final network = manager.getNetwork(999999);
      expect(network, isNull);
    });

    test('getNetworkByName() 返回正确的网络', () {
      final bitcoin = manager.getNetworkByName('BITCOIN');
      expect(bitcoin, isNotNull);
      expect(bitcoin!.chainId, equals(0));
      expect(bitcoin.nativeCurrencySymbol, equals('BTC'));
    });

    test('getSupportedChainTypes() 返回链类型列表', () {
      final types = manager.getSupportedChainTypes();
      expect(types, contains('EVM'));
      expect(types, contains('BTC'));
      expect(types, contains('SOLANA'));
    });

    test('getTestnetNetworks() 返回测试网', () {
      final testnets = manager.getTestnetNetworks();
      for (var network in testnets) {
        expect(network.isTestnet, isTrue);
      }
    });

    test('getMainnetNetworks() 返回主网', () {
      final mainnets = manager.getMainnetNetworks();
      for (var network in mainnets) {
        expect(network.isTestnet, anyOf(isFalse, isNull));
      }
    });
  });

  group('Network Model', () {
    test('toJson() 和 fromJson() 互转', () {
      final ethereum = manager.getNetwork(1)!;
      final json = ethereum.toJson();
      final restored = Network.fromJson(json);
      
      expect(restored.chainId, equals(ethereum.chainId));
      expect(restored.name, equals(ethereum.name));
      expect(restored.platformType, equals(ethereum.platformType));
    });
  });
}

