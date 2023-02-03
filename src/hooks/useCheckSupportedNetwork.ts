import {useNetwork} from 'wagmi';

import {DEFAULT_CHAIN} from '@/typescript/types/ContractT';
import {getConfigValue} from '@/typescript/types/DappdConfigT';

export const useCheckSupportedNetwork = (): boolean => {
  const {chain} = useNetwork();
  const supportedNetworks = getConfigValue('wagmi.supportedChains', null);
  const chainsFromEnv: number[] = supportedNetworks ? supportedNetworks : [DEFAULT_CHAIN];
  return (chain && chainsFromEnv.filter(envChain => envChain === chain.id).length > 0) || false;
};
