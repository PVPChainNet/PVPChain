import React, {ReactNode} from 'react';
import dynamic from 'next/dynamic';
import classNames from 'classnames';

import {getThemeValue} from '@/typescript/types/DappdConfigT';

// Dynamically load the Protected module to prevent server side rendering.
// We prevent SSR because this content will need to be rendered on the client first, since we need to
// know if the user is connected or not.
const Protected = dynamic(() => import('../../utility/Protected'), {
  ssr: false,
});

export type PageContentPropsT = {
  children?: ReactNode;
  className?: string;
  constrain?: boolean;
  protect?: boolean;
  admin?: boolean;
  redirect?: boolean | string;
  pagePadding?: boolean;
  contentPosition?:
    | 'top'
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom'
    | 'bottom-right'
    | 'center-left'
    | 'center'
    | 'center-right'
    | 'left'
    | 'right';
};

export default function PageContent({
  children = undefined,
  protect = getThemeValue('content.protect', false),
  className = getThemeValue('content.className', ''),
  constrain = getThemeValue('content.constrain', false),
  admin = getThemeValue('content.admin', false),
  pagePadding = getThemeValue('content.pagePadding', false),
  redirect = getThemeValue('content.redirect', false),
  contentPosition = getThemeValue('content.contentPosition', undefined),
}: PageContentPropsT) {
  return (
    <main
      className={classNames(
        'grow flex flex-col',
        className,
        {'app-page-padding': pagePadding},
        {'app-constrain': constrain},
        {
          'items-center justify-start': contentPosition === 'top',
          'items-start justify-start': contentPosition === 'top-left',
          'items-end': contentPosition === 'top-right',
          'items-start justify-center': contentPosition === 'center-left',
          'items-center justify-center': contentPosition === 'center',
          'items-end justify-center': contentPosition === 'center-right',
          'items-start justify-end': contentPosition === 'bottom-left',
          'items-center justify-end': contentPosition === 'bottom',
          'items-end justify-end': contentPosition === 'bottom-right',
          'items-start justify-left': contentPosition === 'left',
          'items-end justify-right': contentPosition === 'right',
        }
      )}
    >
      {protect && Protected ? (
        <Protected admin={admin} redirect={redirect}>
          {children}
        </Protected>
      ) : (
        <>{children}</>
      )}
    </main>
  );
}
