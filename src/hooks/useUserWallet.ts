import {useEffect, useState} from 'react';
import {useAccount} from 'wagmi';
import {GetAccountResult, Provider} from '@wagmi/core';

import handleAddress from '@/typescript/utils/handleAddress';

type UserWalletT = {
  address: string | undefined;
  shortAddress: string | undefined;
  isConnected: boolean;
  isConnectedLocal: boolean;
  wagmi: GetAccountResult<Provider>;
};

export function useUserWallet(): UserWalletT {
  const useAccountHook = useAccount();

  // Setting an "is connected" state value (isConnectedLocal), only when the user is actually connected via wagmi. This is used to prevent
  // NextJS hydration errors when using the hook's value to conditionally render elements in the DOM.
  // More info here: https://nextjs.org/docs/messages/react-hydration-error
  // ------------------------------------------------------------------------
  // We need to do this because at the time of render on the server the connected state is unknown, so the "non-connected" version of any
  // conditional DOM manipulation will get rendered. If the the client ends up having an active wallet connected, the app will load and
  // render the "connected" version for initial state, and you will get a hydration error. Using state to control the "is connected" value
  // being used, and waiting until the client is connected, addresses this.
  // ------------------------------------------------------------------------
  const [isConnectedLocal, setIsConnectedLocal] = useState(false);
  useEffect(() => setIsConnectedLocal(useAccountHook.isConnected), [useAccountHook.isConnected]);

  return {
    address: useAccountHook.address,
    shortAddress: useAccountHook.address && handleAddress(useAccountHook.address),
    isConnected: useAccountHook.isConnected,
    isConnectedLocal,
    wagmi: useAccountHook,
  };
}
