/// Node.js entry point for network_manage package
/// This file provides a main() function required by dart2js
library network_manage_node;

import 'network_manage.dart';
export 'network_manage.dart';

// Dart2js requires a main() function
void main() {
  // This function is not called in Node.js environment
  // It's only here to satisfy dart compile js requirements
  print('network_manage package loaded');
}

// Export NetworkManager and Network for Node.js interop
dynamic getNetworkManager([String? walletDomain]) {
  return NetworkManager.getInstance(
    walletDomain: walletDomain ?? 'https://api.tomo.inc',
  );
}

