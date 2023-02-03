import React, {useMemo} from 'react';
import {useField} from 'formik';

import {ArrowUpIcon} from '@heroicons/react/24/solid';

import {WhitelistAddressI} from '@/typescript/interfaces/WhitelistAddressI';

function BulkAddressesPreview() {
  const [whitelistBulkAddressesField] = useField<WhitelistAddressI[]>('whitelistBulkAddresses');

  const [validAddresses, duplicateAddresses, invalidAddress] = useMemo(() => {
    const valid = whitelistBulkAddressesField.value.filter(address => address.valid);
    const duplicate = whitelistBulkAddressesField.value.filter(address => address.duplicate);
    const invalid = whitelistBulkAddressesField.value.filter(address => !address.valid && !address.duplicate);
    return [valid, duplicate, invalid];
  }, [whitelistBulkAddressesField]);

  return !whitelistBulkAddressesField.value.length ? (
    <div className="my-4 text-xl font-semibold flex items-center">
      <ArrowUpIcon className="h-4 w-4 mr-1" />
      Load Some Addresses
    </div>
  ) : (
    <>
      <div className="my-4 text-2xl font-semibold">Addresses Read:</div>
      {duplicateAddresses.length > 0 && (
        <div className="p-4 rounded bg-orange-300 border border-orange-900 text-orange-900 text-sm">
          <div className="list-none font-bold uppercase flex items-center text-sm max-h-32 sm:max-h-56 overflow-y-scroll">
            <span className="mr-1">Duplicate addresses</span>
            <span className="h-5 w-5 rounded-full bg-orange-600 p-1 flex items-center justify-center text-orange-50">
              {duplicateAddresses.length}
            </span>
          </div>
          <ul className="list-disc list-inside mt-2">
            {duplicateAddresses.map((address, index) => (
              <li key={index} className="text-ellipsis overflow-hidden whitespace-nowrap">
                {address.address}
              </li>
            ))}
          </ul>
        </div>
      )}
      {invalidAddress.length > 0 && (
        <div className="p-4 rounded bg-red-300 border border-red-900 text-red-900 text-sm mt-4 max-h-32 sm:max-h-56 overflow-y-scroll">
          <div className="list-none font-bold uppercase flex items-center">
            <span className="mr-1">Invalid Addresses</span>
            <span className="h-5 w-5 rounded-full bg-red-600 p-1 flex items-center justify-center text-red-50">
              {invalidAddress.length}
            </span>
          </div>
          <ul className="list-disc list-inside mt-2">
            {invalidAddress.map((address, index) => (
              <li className="text-ellipsis overflow-hidden whitespace-nowrap" key={index}>
                {address.address}
              </li>
            ))}
          </ul>
        </div>
      )}
      {validAddresses.length > 0 && (
        <div className="p-4 rounded bg-green-300 border border-green-900 text-green-900 text-sm mt-4 max-h-32 sm:max-h-56 overflow-y-scroll">
          <div className="list-none font-bold uppercase flex items-center">
            <span className="mr-1">Valid Addresses</span>
            <span className="h-5 w-5 rounded-full bg-green-600 p-1 flex items-center justify-center text-red-50">
              {validAddresses.length}
            </span>
          </div>
          <ul className="list-disc list-inside mt-2">
            {validAddresses.map((address, index) => (
              <li key={index} className="text-ellipsis overflow-hidden whitespace-nowrap">
                {address.address}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default BulkAddressesPreview;
