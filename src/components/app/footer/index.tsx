import classNames from 'classnames';
import React from 'react';
import {getConfigValue} from '@/typescript/types/DappdConfigT';

export default function AppFooter() {
  const year = new Date().getFullYear();
  const company = getConfigValue('general.companyName', 'Company, Llc');

  return (
    <footer className={classNames('app-footer-padding flex flex-col')}>
      {/*  Add global footer content here */}
      <p>
        Copyright © {year} | {company} | All Rights Reserved
      </p>
    </footer>
  );
}
