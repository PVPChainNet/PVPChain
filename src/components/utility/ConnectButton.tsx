import React, {useEffect, useState} from 'react';
import {Connector, useAccount, useConnect, useDisconnect} from 'wagmi';
import {toast} from 'react-toastify';
import classNames from 'classnames';
import {Modal} from 'react-daisyui';
import {useRouter} from 'next/router';

import ExitToAppSharp from '@mui/icons-material/ExitToAppSharp';
import AccountBalanceWallet from '@mui/icons-material/AccountBalanceWallet';

import handleAddress from '@/typescript/utils/handleAddress';

import LoadingWidget from '@/components/utility/LoadingWidget';
import ConnectorLogos from '@/components/utility/ConnectorLogos';
import {Chain} from '@/components/utility/Chain';

type ConnectButtonPropsT = {
  align?: string;
  secondaryClass?: boolean;
  showConnectorName?: boolean;
  showChain?: boolean;
  className?: string;
  buttonClassName?: string;
  showConnectIcon?: boolean;
  showDisconnectIcon?: boolean;
  redirect?: string;
};

export default function ConnectButton({
  align = 'left',
  secondaryClass = false,
  showConnectorName = false,
  showChain = false,
  className = '',
  buttonClassName = '',
  showConnectIcon = true,
  showDisconnectIcon = true,
  redirect,
}: ConnectButtonPropsT) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [connectors, setConnectors] = useState<Connector<unknown, unknown>[]>([]);
  const {address, isConnected, connector: activeConnector} = useAccount();

  const {
    connect,
    reset,
    connectors: _connectors,
    isLoading,
    pendingConnector,
  } = useConnect({
    onSuccess() {
      if (redirect) {
        router.push(redirect).then(() => {
          toast('Wallet Connected', {type: 'success'});
          setShowModal(false);
        });
      } else {
        toast('Wallet Connected', {type: 'success'});
        setShowModal(false);
      }
    },
    onError(connectError: Error) {
      toast(`Error: ${connectError.message}`, {type: 'error'});
    },
  });

  const {disconnect} = useDisconnect({
    onSuccess() {
      toast('Wallet Disconnected', {type: 'warning'});
    },
    onError(error: Error) {
      toast('Error Disconnecting Wallet', {type: 'error'});
      console.error(error.message);
    },
  });

  // Modal visibility control
  const toggleVisible = () => {
    setShowModal(!showModal);
    reset();
  };

  // Setting an "is connected" state value, only when the user is actually connected via wagmi, to prevent NextJS hydration errors when using the
  // hook's value to conditionally render elements in the DOM.
  // More info here: https://nextjs.org/docs/messages/react-hydration-error
  // ------------------------------------------------------------------------
  // We need to do this because at the time of render on the server the connected state is unknown, so the "non-connected" version of any
  // conditional DOM manipulation will get rendered. If the the client ends up having an active wallet connected, the app will load and
  // render the "connected" version for initial state, and you will get a hydration error. Using state to control the "is connected" value
  // being used, and waiting until the client is connected, addresses this.
  // ------------------------------------------------------------------------
  const [isConnectedLocal, setIsConnectedLocal] = useState(false);
  useEffect(() => setIsConnectedLocal(isConnected), [isConnected]);

  // Aww sh*t, here we go again.....
  // ------------------------------------------------------------------------
  // Setting the connectors only when connected to prevent server mismatch error (Warning: Prop `src` did not match. Server '...' client '...')
  // ------------------------------------------------------------------------
  // We need to do this because at the time of render on the server the connectors to be used are unknown, so all get rendered. If the
  // client's connectors differ, you will get a server mismatch error because only a subset of the connectors has been rendered. Using state to
  // control the connectors being used, and waiting until the client is connected, addresses this.
  // ------------------------------------------------------------------------
  useEffect(() => setConnectors(_connectors), [_connectors]);

  return (
    <div
      className={classNames('flex items-center ', className, {
        'justify-start': align === 'left',
        'justify-center': align === 'center',
        'justify-end': align === 'right',
      })}
    >
      {isConnectedLocal ? (
        <>
          {/* Connected */}
          {showChain && <Chain />}
          <button
            type="button"
            className={classNames('app-btn app-btn--primary', buttonClassName, {
              '!rounded-l-none': showChain,
            })}
            onClick={() => disconnect()}
          >
            {address ? (
              <div className="flex flex-col">
                <div className="flex items-center">
                  {handleAddress(address)}
                  {showDisconnectIcon && <ExitToAppSharp className="ml-2 h-5 w-5" />}
                </div>

                {showConnectorName && (
                  <div className="text-xs font-bold self-end">
                    <span className="font-medium">via</span> {activeConnector?.name}
                  </div>
                )}
              </div>
            ) : (
              <LoadingWidget
                inline={true}
                message="Disconnect"
                textClasses="text-md text-black"
                ringClasses="processing-ring--brand"
              />
            )}
          </button>
        </>
      ) : (
        <>
          {/* Not Connected */}
          <Modal
            open={showModal}
            onClickBackdrop={toggleVisible}
            className="w-fit m-8 p-0 drop-shadow-lg ring ring-brand-5"
          >
            <Modal.Header className="m-0">
              <p className="p-2 text-center bg-brand-5 text-black rounded-ml flex items-center justify-center font-semibold">
                {showConnectIcon && <AccountBalanceWallet className="w-5 h-5 mr-1" />}
                Connect Wallet
              </p>
            </Modal.Header>
            <Modal.Body className="p-4 pb-6 md:p-8 md:pb-10">
              <div className="grid grid-cols-2 place-content-center gap-6 md:gap-8">
                {connectors
                  .filter(connector => connector.ready)
                  .map((connector: Connector) => (
                    <button
                      disabled={!connector.ready}
                      type="button"
                      key={connector.id}
                      className="flex flex-col justify-center items-center"
                      onClick={() => connect({connector})}
                    >
                      {isLoading && pendingConnector?.id === connector.id ? (
                        <div className="flex items-center justify-center">
                          <LoadingWidget message="Connecting" textClasses="text-md text-brand-5" />
                        </div>
                      ) : (
                        <>
                          <div className="grow flex items-center justify-center h-auto w-24 p-2">
                            <ConnectorLogos connectorId={connector.name} />
                          </div>
                          <div className="text-md font-bold leading-4 text-gray-400 capitalize">
                            {connector.name.split(' ')[0]}
                          </div>
                        </>
                      )}
                    </button>
                  ))}
              </div>
            </Modal.Body>
          </Modal>
          <div
            className={classNames('cursor-pointer', {
              relative: align === 'left',
            })}
          >
            <button
              className={classNames('app-btn app-btn--primary', buttonClassName, {
                'app-btn--secondary': secondaryClass,
              })}
              onClick={toggleVisible}
            >
              {isLoading ? (
                <LoadingWidget
                  inline={true}
                  message="Connecting"
                  textClasses="text-md text-black"
                  ringClasses="processing-ring--brand"
                />
              ) : (
                <>
                  {showConnectIcon && <AccountBalanceWallet className="w-4 h-4 mr-1" />}
                  <span>Connect </span>
                  <span className="hidden lg:inline-block mx-1">Wallet</span>
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
