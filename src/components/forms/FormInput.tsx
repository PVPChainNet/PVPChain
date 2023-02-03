/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {ChangeEvent} from 'react';
import {ErrorMessage, Field, FieldArray, useField} from 'formik';
import classNames from 'classnames';
import {ethers} from 'ethers';

import ErrorOutlineSharp from '@mui/icons-material/ErrorOutlineSharp';
import ArrowRight from '@mui/icons-material/ArrowRight';

import {WhitelistAddressI} from '@/typescript/interfaces/WhitelistAddressI';

type FormInputPropsT = {
  field: any;
  form: any;
  label: string;
  hideLabel?: boolean;
  placeholder?: string;
  type?: 'text' | 'textarea' | 'select' | 'whitelist' | 'whitelist-bulk' | 'whitelist-file';
  inputType?: 'text' | 'password' | 'email' | 'number' | 'date' | 'datetime-local';
  selectOptions?: {key: string; value: string}[];
  fullWidth?: boolean;
};

export default function FormInput({
  field: _field,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  form, // form: {errors} <-- the formik form props are injected here
  label,
  hideLabel = false,
  type,
  inputType = 'text',
  selectOptions = [],
  fullWidth = false,
  ...props
}: FormInputPropsT) {
  // The input we will return
  let input;

  // "helpers" below is there to help with the formik integration. Leaving for potential future use
  // Example: const { setValue, setTouched, setError } = helpers;
  // https://formik.org/docs/api/useField#reference
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta, helpers] = useField(_field.name);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [whitelistBulkAddressesField, whitelistBulkAddressesMeta, whitelistBulkAddressesHelpers] =
    useField('whitelistBulkAddresses');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [whitelistField, whitelistMeta, whitelistHelpers] = useField('whitelist');

  // Generate a unique ID to append to the input to ensure it is unique
  const randomNumber = Math.floor(100000 + Math.random() * 90000000000);
  const inputId = `${field.name}-${randomNumber}`;

  const handleBulkInputChange = (e: any) => {
    const whitelist: WhitelistAddressI[] = [];

    // Clear existing entries
    whitelistBulkAddressesHelpers.setValue([]);

    // Split the input's data
    const addresses = e.target.value
      .trim() // Trim whitespace
      .replace(/,\s*$/, '') // Remove any trailing commas
      .replace(/(\r\n|\n|\r)/gm, '') // Remove newlines
      .split(','); // Split on commas

    // Loop and validate each address
    addresses.forEach((address: string) => {
      const trimmedAddress = address.trim();

      if (trimmedAddress && ethers.utils.isAddress(trimmedAddress)) {
        // If there are no addresses in the whitelist, add the first, do not filter
        if (whitelistBulkAddressesField.value.length === 0) {
          whitelist.push({address: trimmedAddress, valid: true, duplicate: false});
          return;
        }

        // Check for dupes
        const foundItem = whitelist.find(({address: addr}) => addr === trimmedAddress);

        if (foundItem) {
          whitelist.push({address: trimmedAddress, valid: false, duplicate: true});
        } else {
          whitelist.push({address: trimmedAddress, valid: true, duplicate: false});
        }
      } else {
        if (trimmedAddress !== '') {
          whitelist.push({address: trimmedAddress, valid: false, duplicate: false});
        }
      }
    });

    // Update the bulk addresses field
    whitelistBulkAddressesHelpers.setValue(whitelist);
    helpers.setTouched(true);
  };

  const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file: File = event.target.files[0];

    if (!file || file.name.split('.').pop() !== 'txt') {
      // Clear selected file
      event.target.value = '';

      // Clear existing entries
      whitelistBulkAddressesHelpers.setValue([]);

      // Set the error state
      helpers.setError('Please upload a .txt file');
      helpers.setTouched(true);
      return;
    }

    const fileData = new FileReader();
    fileData.onloadend = (fileEvent: ProgressEvent<FileReader>) => {
      // If no file is selected, return
      if (!fileEvent || !fileEvent.target || !fileEvent.target.result) return;

      // Ensure we are working with a string
      const contents = fileEvent.target.result;
      if (typeof contents !== 'string') return;

      // Handle the contents and clear the selected file
      handleBulkFileInputChange(contents);
      event.target.value = '';
    };

    fileData.readAsText(file);
  };

  const handleBulkFileInputChange = (contents: string) => {
    const whitelist: WhitelistAddressI[] = [];

    // Clear existing entries
    whitelistBulkAddressesHelpers.setValue([]);

    // Split the input's data
    const addresses = contents
      .trim() // Trim whitespace
      .replace(/,\s*$/, '') // Remove any trailing commas
      .replace(/(\r\n|\n|\r)/gm, '') // Remove newlines
      .split(','); // Split on commas

    // Loop and validate each address
    addresses.forEach((address: string) => {
      const trimmedAddress = address.trim();

      if (trimmedAddress && ethers.utils.isAddress(trimmedAddress)) {
        // Check for dupes
        const foundItem = whitelist.find(({address: addr}) => addr === trimmedAddress);

        if (foundItem) {
          whitelist.push({address: trimmedAddress, valid: false, duplicate: true});
        } else {
          whitelist.push({address: trimmedAddress, valid: true, duplicate: false});
        }
      } else {
        if (trimmedAddress !== '') {
          whitelist.push({address: trimmedAddress, valid: false, duplicate: false});
        }
      }
    });

    // Update the bulk addresses field
    whitelistBulkAddressesHelpers.setValue(whitelist);
    helpers.setTouched(true);
    helpers.setValue(null);
  };

  // Render the input based on type
  switch (type) {
    default:
    case 'text':
      input = (
        <input
          id={inputId}
          type={inputType}
          className={classNames('drop-shadow placeholder:text-slate-400 text-black', {
            'rounded-r rounded-bl': !hideLabel,
            'w-full': fullWidth,
            rounded: hideLabel,
          })}
          {...field}
          {...props}
        />
      );
      break;
    case 'textarea':
      input = (
        <textarea
          id={inputId}
          className={classNames('drop-shadow placeholder:text-slate-400 text-black', {
            'rounded-r rounded-bl': !hideLabel,
            'w-full': fullWidth,
            rounded: hideLabel,
          })}
          {...field}
          {...props}
        />
      );
      break;
    case 'select':
      input = (
        <select
          id={inputId}
          className={classNames('drop-shadow placeholder:text-slate-400 text-black', {
            'rounded-r rounded-bl': !hideLabel,
            'w-full': fullWidth,
            rounded: hideLabel,
          })}
          {...field}
          {...props}
        >
          {props.placeholder && <option value="">{props.placeholder}</option>}
          {selectOptions.map((option: {key: string; value: string}, index: number) => (
            <option value={option.value} key={index}>
              {option.key}
            </option>
          ))}
        </select>
      );
      break;
    case 'whitelist-bulk':
      input = (
        <textarea
          id={inputId}
          className={classNames('drop-shadow placeholder:text-slate-400 text-black min-h-[8em]', {
            'rounded-r rounded-bl': !hideLabel,
            'w-full': fullWidth,
            rounded: hideLabel,
          })}
          {...field}
          {...props}
          onBlur={handleBulkInputChange}
        />
      );
      break;

    case 'whitelist-file':
      input = (
        <div className="flex items-center">
          <input
            id={inputId}
            accept=".txt"
            type="file"
            className={classNames(
              'drop-shadow placeholder:text-slate-400 max-w-[200px] text-black md:max-w-none border border-gray-300 rounded-lg p-2',
              {
                'rounded-r rounded-bl': !hideLabel,
                'w-full': fullWidth,
                rounded: hideLabel,
              }
            )}
            {...field}
            {...props}
            onChange={e => {
              if (e.target.value === null) return;
              handleChangeFile(e);
            }}
          />
          <button type="button" className="flex items-center justify-center bg-brand-2 p-2 rounded ml-2">
            <ArrowRight className="h-6 w-6 text-brand-5" />
          </button>
        </div>
      );
  }

  // Individual whitelist uses a different layout, so it is excluded from the switch
  if (type === 'whitelist') {
    return (
      <FieldArray name="whitelist">
        {({remove, push}) => (
          <div>
            {whitelistField.value.length > 0 &&
              whitelistField.value.map((address: WhitelistAddressI, index: number) => (
                <div className="flex items-center mt-8 relative" key={index}>
                  <label
                    htmlFor={`whitelist.${index}.address`}
                    className={classNames({
                      'mb-1 text-sm absolute -top-5 left-0 bg-gray-300 text-gray-100 px-2 rounded-t leading-5':
                        !hideLabel,
                      'absolute top-0 left-0 h-0 w-0': hideLabel,
                    })}
                  >
                    <span
                      className={classNames({
                        capitalize: !hideLabel,
                        'sr-only': hideLabel,
                      })}
                    >
                      Wallet Address
                    </span>
                  </label>
                  <div className={classNames({'w-full': fullWidth})}>
                    <div className={classNames('flex items-center', {'w-full': fullWidth})}>
                      <Field
                        name={`whitelist.${index}.address`}
                        placeholder="Wallet Address"
                        type="text"
                        className={classNames('drop-shadow placeholder:text-slate-400', {
                          'rounded-bl': !hideLabel,
                          'w-full': fullWidth,
                          rounded: hideLabel,
                        })}
                      />
                      <button
                        type="button"
                        className="p-2 bg-red-500 text-brand-5 rounded-r w-10 self-start border border-red-500"
                        onClick={() => remove(index)}
                      >
                        X
                      </button>
                    </div>
                    <ErrorMessage
                      name={`whitelist.${index}.address`}
                      component="div"
                      className="flex items-center justify-start text-red-500 bg-red-200 p-2 rounded-b -mt-2 pt-4 border border-red-500"
                    />
                  </div>
                </div>
              ))}
            <button type="button" className="app-btn app-btn--secondary my-4" onClick={() => push({address: ''})}>
              Add Wallet Address
            </button>
          </div>
        )}
      </FieldArray>
    );
  }

  // Render input, labels, and error message
  return (
    <div
      className={classNames('flex flex-col', {
        'flex flex-col relative mt-5': !hideLabel,
        'w-full': fullWidth,
      })}
    >
      <label
        htmlFor={inputId}
        className={classNames({
          'mb-1 text-sm absolute -top-5 left-0 bg-gray-300 text-gray-100 px-2 rounded-t leading-5': !hideLabel,
          'absolute top-0 left-0 h-0 w-0': hideLabel,
        })}
      >
        <span
          className={classNames({
            capitalize: !hideLabel,
            'sr-only': hideLabel,
          })}
        >
          {label}
        </span>
      </label>
      <div className="flex items-center">{input}</div>
      <ErrorMessage name={field.name}>
        {msg => (
          <div className="flex items-center justify-start text-red-500 bg-red-200 p-2 rounded-b -mt-2 pt-4 border border-red-500">
            <ErrorOutlineSharp className="mr-0.5 h-5 w-5" />
            <span className="text-sm sm:text-base font-semibold">{msg}</span>
          </div>
        )}
      </ErrorMessage>
    </div>
  );
}
