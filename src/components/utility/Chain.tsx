import React, {useState} from 'react';
import {useNetwork, useSwitchNetwork} from 'wagmi';
import classNames from 'classnames';

import {LinkIcon, ArrowsRightLeftIcon} from '@heroicons/react/24/outline';
import {ExclamationCircleIcon} from '@heroicons/react/24/solid';

import {useCheckSupportedNetwork} from '@/hooks';

import {DEFAULT_CHAIN} from '@/typescript/types/ContractT';

import Protected from '@/components/utility/Protected';
import AppModal from '@/components/utility/AppModal';

export function Chain() {
  const {switchNetwork} = useSwitchNetwork();
  const [isOpen, setIsOpen] = useState(false);
  const {chain} = useNetwork();
  const supported = useCheckSupportedNetwork();

  return (
    <Protected showWarning={false}>
      <div
        onClick={() => !supported && setIsOpen(true)}
        className={classNames('app-btn !rounded-r-none', {
          'app-btn--primary': supported,
          'app-btn--error animate-pulse relative cursor-pointer': !supported,
        })}
      >
        {!supported && (
          <>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <ExclamationCircleIcon
              className="h-4 w-4 mr-1"
              onClick={() => {
                setIsOpen(true);
              }}
            />
          </>
        )}
        {supported && <LinkIcon className="h-4 w-4 mr-1" />}
        <div className="font-bold">{chain ? `${chain.name}` : 'Unknown'}</div>
      </div>
      <AppModal isOpen={isOpen} showClose={false} setIsOpen={setIsOpen} allowClickOut={true} title="Unsupported Chain!">
        <p>You are on an unsupported blockchain! Please use the button below to switch to the correct chain.</p>
        <button
          className="app-btn app-btn--error app-btn--full mt-4"
          onClick={() => {
            switchNetwork?.(DEFAULT_CHAIN);
            setIsOpen(false);
          }}
        >
          <ArrowsRightLeftIcon className="h-4 w-4 mr-1" />
          Switch chain
        </button>
      </AppModal>
    </Protected>
  );
}
