import React from 'react';

import {CodeBracketIcon} from '@heroicons/react/24/outline';

import MetaMaskSvg from '../../../public/images/icons/metamask.svg';
import WalletConnectSvg from '../../../public/images/icons/walletconnect.svg';
import CoinbaseSvg from '../../../public/images/icons/coinbase.svg';

type ConnectorLogosPropsT = {
  connectorId: string;
};

export default function ConnectorLogos({connectorId}: ConnectorLogosPropsT) {
  switch (connectorId) {
    case 'MetaMask':
      return (
        <div className="flex items-center">
          <MetaMaskSvg className="h-8 w-8 md:h-16 md:w-16" />
        </div>
      );
    case 'WalletConnect':
      return (
        <div className="flex items-center">
          <WalletConnectSvg className="h-8 w-8 md:h-16 md:w-16" />
        </div>
      );
    case 'Injected':
      return (
        <div className="flex items-center">
          <CodeBracketIcon className="h-8 w-8 md:h-16 md:w-16 text-gray-500" />
        </div>
      );
    case 'Coinbase Wallet':
      return (
        <div className="flex items-center">
          <CoinbaseSvg className="h-8 w-8 md:h-16 md:w-16" />
        </div>
      );
    default:
      return <></>;
  }
}
