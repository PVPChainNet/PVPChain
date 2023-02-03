import classNames from 'classnames';
import React, {ReactNode} from 'react';

import {getConfigValue} from '@/typescript/types/DappdConfigT';

type PageFooterPropsT = {
  children?: ReactNode;
  showCopyright?: boolean;
  copyrightClasses?: string;
  className?: string;
  constrain?: boolean;
};

export default function PageFooter({
  children,
  showCopyright = true,
  copyrightClasses = 'text-sm text-gray-300',
  className,
  constrain = true,
}: PageFooterPropsT) {
  const year = new Date().getFullYear();

  return (
    <footer className={classNames('app-footer-padding flex flex-col', {'app-constrain': constrain}, className)}>
      <>{children}</>
      {showCopyright && (
        <p className={copyrightClasses}>
          Copyright © {year} | {getConfigValue('general.companyName', '')} | All Rights Reserved
        </p>
      )}
    </footer>
  );
}
