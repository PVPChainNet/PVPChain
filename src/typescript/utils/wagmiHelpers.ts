import {Chain, ChainProviderFn, defaultChains} from 'wagmi';
import {CoinbaseWalletConnector} from 'wagmi/connectors/coinbaseWallet';
import {InjectedConnector} from 'wagmi/connectors/injected';
import {MetaMaskConnector} from 'wagmi/connectors/metaMask';
import {WalletConnectConnector} from 'wagmi/connectors/walletConnect';
import {alchemyProvider} from 'wagmi/providers/alchemy';
import {infuraProvider} from 'wagmi/providers/infura';
import {publicProvider} from 'wagmi/providers/public';

import {DEFAULT_CHAIN} from '@/typescript/types/ContractT';
import {getConfigValue} from '@/typescript/types/DappdConfigT';

const chains: Chain[] = [
  ...defaultChains,
  {
    id: 56,
    name: 'BSC',
    network: 'bsc_mainnet',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: {
      default: 'https://rpc.ankr.com/bsc',
      default1: 'https://bsc-dataseed.binance.org',
      default2: 'https://bsc-dataseed1.defibit.io/',
      default3: 'https://bsc-dataseed1.ninicoin.io/',
    },
    blockExplorers: {
      etherscan: {
        name: 'BNB Smart Chain Explorer',
        url: 'https://bscscan.com',
      },
      default: {
        name: 'BNB Smart Chain Explorer',
        url: 'https://bscscan.com',
      },
    },
  },
  {
    id: 97,
    name: 'BSC',
    network: 'bsc_testnet',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: {
      default: 'https://rpc.ankr.com/bsc_testnet_chapel',
      default1: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      default2: 'https://data-seed-prebsc-2-s1.binance.org:8545/',
    },
    blockExplorers: {
      etherscan: {
        name: 'BNB Smart Chain Explorer',
        url: 'https://testnet.bscscan.com/',
      },
      default: {
        name: 'BNB Smart Chain Explorer',
        url: 'https://testnet.bscscan.com/',
      },
    },
  },
  {
    id: 1337,
    name: 'Ganache',
    network: 'ganache',
    nativeCurrency: {
      decimals: 18,
      name: 'Ethereum',
      symbol: 'ETH',
    },
    rpcUrls: {
      default: 'http://127.0.0.1:8545',
    },
    blockExplorers: {
      default: {name: 'Etherscan', url: 'https://wagmi.sh'},
    },
    testnet: true,
  },
];

const supportedChains: number[] = getConfigValue('wagmi.supportedChains', DEFAULT_CHAIN);

if (!supportedChains.includes(DEFAULT_CHAIN)) {
  throw new Error(
    `Default chain ${DEFAULT_CHAIN} is not in supported chains: ${supportedChains}. Check the dappd config file!`
  );
}

// The default connector is metamask if none are specified in the config
const supportedConnectors: string[] = getConfigValue('wagmi.supportedConnectors', ['metamask']);

export const getSupportedChains = (): Chain[] => {
  return chains.filter(chain => supportedChains.includes(chain.id));
};

export const getSupportedProviders = (): ChainProviderFn[] => {
  // If using an eth based network return the public providers and infura + alchemy
  if (supportedChains.every((chainId: number) => defaultChains.map(chain => chain.id).includes(chainId))) {
    return [
      infuraProvider({priority: 0, apiKey: process.env.INFURA_API_KEY || ''}),
      alchemyProvider({priority: 1, apiKey: process.env.ALCHEMY_API_KEY || ''}),
      publicProvider({priority: 2}),
    ];
  }

  // Otherwise only return the public provider (works for BSC)
  return [publicProvider({priority: 0})];
};

export const getSupportedConnectors = (configuredChains: Chain[]) => {
  // If no connectors are specified in the config, the default connector metamask is used
  const connectors = [];

  if (supportedConnectors.includes('metamask')) {
    // Setup individual connectors
    const metaMaskConnector = new MetaMaskConnector({
      chains: configuredChains,
      options: {
        shimDisconnect: true,
      },
    });

    connectors.push(metaMaskConnector);
  }

  if (supportedConnectors.includes('walletConnect')) {
    const walletConnectConnector = new WalletConnectConnector({
      chains: configuredChains,
      options: {
        qrcode: true,
      },
    });

    connectors.push(walletConnectConnector);
  }

  if (supportedConnectors.includes('injected')) {
    const injectedConnector = new InjectedConnector({
      chains: configuredChains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    });

    connectors.push(injectedConnector);
  }

  if (supportedConnectors.includes('coinbase')) {
    const coinbaseWalletConnector = new CoinbaseWalletConnector({
      chains: configuredChains,
      options: {
        appName: 'Dappd Seed App',
      },
    });

    connectors.push(coinbaseWalletConnector);
  }

  return connectors;
};
