import {useState} from 'react';

import {useContracts, useUserWallet} from '@/hooks';

export const useIsAdmin = () => {
  const {address} = useUserWallet();
  const {contracts} = useContracts();

  // State
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  /*
   * Checks if the currently connected wallet is the owner of the contract
   */
  const checkIsAdmin = () => {
    setIsCheckingAdmin(true);
    const doCheck = async () => {
      try {
        if (address && contracts.defaultContract.ethers) {
          const owner: string = await contracts.defaultContract.ethers.getOwner();
          setIsAdmin(owner === address);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Error Checking Admin', error);
        setIsAdmin(false);
      } finally {
        setIsCheckingAdmin(false);
      }
    };

    doCheck();
  };

  return {isAdmin, isCheckingAdmin, checkIsAdmin};
};
