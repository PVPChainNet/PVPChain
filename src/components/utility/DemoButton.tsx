import React from 'react';
import classNames from 'classnames';

import {BellIcon} from '@heroicons/react/24/solid';

type DemoButtonPropsT = {
  stateChanger: () => void;
  state: boolean;
  stateText?: string;
  text?: string;
  position?: 'fixed' | 'inline';
};

function DemoButton({
  stateChanger,
  state,
  stateText = 'State is currently',
  text = 'Demo: Click to Toggle State',
  position = 'fixed',
}: DemoButtonPropsT) {
  if (position === 'inline') {
    return (
      <div className="flex items-center justify-center m-4">
        <div
          className={classNames(
            'flex flex-col bg-yellow-400 text-sm text-black font-bold p-3 rounded-tr-lg relative ring-2 ring-blue-900',
            {
              'rounded-lg': position === 'inline',
            }
          )}
        >
          <button onClick={stateChanger} className="flex items-center pb-1 drop-shadow-lg">
            <BellIcon className="h-4 w-4 mr-1 text-blue-900" />
            <span className="font-black mr-1 text-blue-900">DEMO:</span>
            <span className="underline cursor-pointer">{text}</span>
            <span className="animate-ping absolute -top-4 -right-4 h-3 w-3 rounded-full bg-blue-900"></span>
          </button>
          <div className="flex items-center text-xs border-t border-t-gray-900/20 pt-1">
            <span>{stateText}:</span>
            <span className="font-extrabold ml-1 underline text-blue-900">{state ? 'true' : 'false'}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 z-50 flex flex-col bg-yellow-400 text-sm text-black font-bold p-3 rounded-tr-lg ring-2 ring-blue-900 drop-shadow-lg">
      <button onClick={stateChanger} className="flex items-center pb-1">
        <BellIcon className="h-4 w-4 mr-1 text-blue-900" />
        <span className="font-black mr-1 text-blue-900">DEMO:</span>
        <span className="underline cursor-pointer">{text}</span>
        <span className="animate-ping absolute -top-1 -right-1 h-3 w-3 rounded-full bg-blue-900"></span>
      </button>
      <div className="flex items-center text-xs border-t border-t-gray-900/20 pt-1">
        <span>{stateText}:</span>
        <span className="font-extrabold ml-1 underline text-blue-900">{state ? 'true' : 'false'}</span>
      </div>
    </div>
  );
}

export default DemoButton;
