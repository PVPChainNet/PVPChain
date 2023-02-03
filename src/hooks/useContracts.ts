import {ethers} from 'ethers';
import {useProvider} from 'wagmi';
import {Provider} from '@wagmi/core';

import {getConfigValue} from '@/typescript/types/DappdConfigT';
import {AllContractsT, ContractsT, ContractT, DEFAULT_CHAIN} from '@/typescript/types/ContractT';
import {CONTRACTS} from '@/typescript/contracts';

type UseContractReturnT = {
  contracts: ContractsT;
  defaultChain: number;
  provider: Provider;
};

type UseContractsPropsT = {
  disableEthers?: boolean;
};

export function useContracts(
  {disableEthers = getConfigValue('contracts.disableEthers', false)}: UseContractsPropsT = {disableEthers: false}
): UseContractReturnT {
  const defaultChain = DEFAULT_CHAIN;
  const provider = useProvider({chainId: defaultChain});
  const contracts: {[key in AllContractsT]: ContractT} = {} as ContractsT;

  /*
   * Create contracts
   */
  // Loop through all contracts defined in the contracts file and create them
  CONTRACTS.forEach((contract: ContractT) => {
    // Add an ethers instance to the contract if not disabled
    if (!disableEthers && (contract.address || contract.abi)) {
      const contractInstance = new ethers.Contract(contract.address, contract.abi, provider);
      contract.ethers = contractInstance;
    } else {
      contract.ethers = false;
    }

    // TODO: Add a WAGMI useContract instance to the contract?

    // Add the contract to the final contracts object
    contracts[contract.name as AllContractsT] = contract;
  });

  // We're through here, return UseContractReturnT
  return {contracts, defaultChain, provider};
}
