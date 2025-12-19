declare module '@tomo/network-manage' {
  export interface Network {
    chainId: number;
    chainIndex: number;
    name: string;
    chainName: string;
    nativeCurrencyName: string;
    nativeCurrencySymbol: string;
    nativeCurrencyDecimals: number;
    platformType: string;
    icon: string;
    supportSwap: boolean;
    supportGift: boolean;
    supportHistory: boolean;
    rpcUrls?: string[];
    blockExplorerUrl?: string;
    isTestnet?: boolean;
  }

  export class NetworkManager {
    static getInstance(options?: { walletDomain?: string }): NetworkManager;
    loadNetworks(chainType?: string): Network[];
    getNetwork(chainId: number, chainType?: string): Network | null;
    getNetworkByName(name: string): Network | null;
    getSupportedChainTypes(): string[];
    getTestnetNetworks(): Network[];
    getMainnetNetworks(): Network[];
  }
}
