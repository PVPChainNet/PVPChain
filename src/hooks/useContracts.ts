import {ethers} from 'ethers';
import {useProvider} from 'wagmi';
import {Provider} from '@wagmi/core';

import {getConfigValue} from '@/typescript/types/DappdConfigT';
import {DEFAULT_CHAIN} from '@/typescript/types/ContractT';
import {Game} from '@/typescript/contracts';

type Contract = {
  address: string;
  abi: string;
  defaultChain: number;
};

type UseContractsPropsT = {
  disableEthers?: boolean;
};

export function useContracts(
  {disableEthers = getConfigValue('contracts.disableEthers', false)}: UseContractsPropsT = {disableEthers: false}
): Contract {
  const defaultChain = DEFAULT_CHAIN;
  const provider = useProvider({chainId: defaultChain});
  const contracts: Contract = {address: '', abi: '', defaultChain: 56};

  // We're through here, return UseContractReturnT
  return {
    address: Game.address,
    abi: '',
    defaultChain: Game.chainId,
  };
}
