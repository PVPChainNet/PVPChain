import React, {ReactNode} from 'react';
import classNames from 'classnames';

import Divider from '@mui/material/Divider';

type PageHeaderPropsT = {
  children?: ReactNode;
  separator?: boolean;
  className?: string;
  constrain?: boolean;
  constrainRelative?: boolean;
  bgImage?: string;
  bgPosition?: 'center' | 'top' | 'bottom';
  bgSize?: 'cover' | 'contain';
  bgRepeat?: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y';
  bgOverlay?: boolean;
  bgOverlayColor?: string;
  bgOverlayOpacity?: string;
  bgConstrain?: boolean;
  sticky?: boolean;
  stickyOnMobile?: boolean;
};

export default function PageHeader({
  children,
  separator = false,
  className,
  constrain = true,
  constrainRelative = false,
  bgImage,
  bgPosition = 'center',
  bgSize = 'cover',
  bgRepeat = 'no-repeat',
  bgOverlay = true,
  bgOverlayColor = 'bg-black',
  bgOverlayOpacity = 'bg-opacity-50',
  bgConstrain = true,
  sticky = false,
  stickyOnMobile = false,
}: PageHeaderPropsT) {
  let bgStyle = {};

  if (bgImage) {
    bgStyle = {
      backgroundImage: 'url(' + bgImage + ')',
      backgroundSize: bgSize,
      backgroundPosition: bgPosition,
      backgroundRepeat: bgRepeat,
    };
  }
  return (
    <header
      className={classNames('app-header-padding', className, {
        'pt-4': separator,
        relative: constrainRelative,
        'relative md:sticky md:top-0': sticky && !stickyOnMobile,
        'sticky top-0 z-50': sticky && stickyOnMobile,
      })}
    >
      <div
        className={classNames({
          'app-constrain': constrain,
        })}
      >
        {children}
      </div>
      {separator ? <Divider className="!border-gray-500 !border-opacity-20" /> : null}
      {bgOverlay && bgImage && (
        <div
          className={classNames('absolute inset-0 -z-10', bgOverlayColor, bgOverlayOpacity, {
            'app-constrain': bgConstrain,
          })}
        ></div>
      )}
      {bgStyle && <div style={bgStyle} className="absolute inset-0 -z-20"></div>}
    </header>
  );
}
