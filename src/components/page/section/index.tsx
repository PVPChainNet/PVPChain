import classNames from 'classnames';
import React, {ReactNode} from 'react';

import {getThemeValue} from '@/typescript/types/DappdConfigT';

export type PageSectionPropsT = {
  id?: string;
  children: ReactNode;
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
};

function PageSection({
  children,
  id = getThemeValue('section.id', undefined),
  className = getThemeValue('section.className', ''),
  constrain = getThemeValue('section.constrain', true),
  constrainRelative = getThemeValue('section.constrainRelative', false),
  bgImage = getThemeValue('section.bgImage', undefined),
  bgPosition = getThemeValue('section.bgPosition', 'center'),
  bgSize = getThemeValue('section.bgSize', 'cover'),
  bgRepeat = getThemeValue('section.bgRepeat', 'no-repeat'),
  bgOverlay = getThemeValue('section.bgOverlay', true),
  bgOverlayColor = getThemeValue('section.bgOverlayColor', 'bg-black'),
  bgOverlayOpacity = getThemeValue('section.bgOverlayOpacity', 'bg-opacity-50'),
}: PageSectionPropsT) {
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
    <section id={id} className={classNames('relative', className)}>
      <div
        className={classNames('relative z-30', {
          'app-constrain': constrain,
          relative: constrainRelative,
        })}
      >
        <>{children}</>
      </div>
      {bgOverlay && bgImage && (
        <div className={classNames('absolute inset-0 z-10', bgOverlayColor, bgOverlayOpacity)}></div>
      )}
      <div style={bgStyle} className="absolute inset-0 z-20"></div>
    </section>
  );
}

export default PageSection;
