import {Contract} from 'ethers';

import {CONTRACTS} from '@/typescript/contracts';
import {getConfigValue} from '@/typescript/types/DappdConfigT';

export const DEFAULT_CHAIN = Number(getConfigValue('wagmi.defaultChain', 1)); // Ensure it is a number

export type AllContractsT = typeof CONTRACTS[number]['name'];

export type ContractT = {
  name: string;
  address: string;
  abi: string;
  chainId: number;
  ethers: Contract | false;
};

export type ContractsT = {
  [key in AllContractsT]: ContractT;
};
