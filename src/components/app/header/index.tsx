import React, {useContext} from 'react';
import classNames from 'classnames';
import Link from 'next/link';

import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import {ChevronLeftIcon} from '@heroicons/react/24/solid';

import PageContext from '@/contexts/PageContext';
import MenuContext from '@/contexts/MenuContext';

import ConnectButton from '@/components/utility/ConnectButton';
import CompanyLogo from '@/components/utility/CompanyLogo';

import {getThemeValue} from '@/typescript/types/DappdConfigT';

export type AppHeaderPropsT = {
  bgColor?: string;
  sticky?: boolean;
  stickyOnMobile?: boolean;
  showBackButton?: boolean;
  backButtonLink?: string;
  constrain?: boolean;
};

export default function AppHeader({
  bgColor = getThemeValue('appHeader.bgColor', 'bg-black'),
  sticky = getThemeValue('appHeader.sticky', false),
  stickyOnMobile = getThemeValue('appHeader.stickyOnMobile', true),
  showBackButton = getThemeValue('appHeader.showBackButton', false),
  backButtonLink = getThemeValue('appHeader.backButtonLink', '/'),
  constrain = getThemeValue('appHeader.constrain', false),
}: AppHeaderPropsT) {
  const {isOpen, setIsOpen} = useContext(MenuContext);
  const {name, showConnectButton, showNav} = useContext(PageContext);

  return (
    <header
      className={classNames(
        'shrink lg:flex lg:items-center lg:flex-row-reverse py-4 z-20 app-header-padding',
        bgColor,
        {
          'relative md:sticky md:top-0': sticky && !stickyOnMobile,
          'sticky top-0': sticky && stickyOnMobile,
        }
      )}
    >
      <div
        className={classNames('grow', {
          'app-constrain': constrain,
        })}
      >
        <div className="flex flex-row items-center justify-items-stretch">
          <div className="grow">
            <div>
              <Link href="/">
                <span className="xs:hidden">
                  <CompanyLogo width={40} height={50} layout="fixed" markOnly={true} />
                </span>
                <span className="hidden xs:block">
                  <CompanyLogo width={125} height={50} layout="intrinsic" />
                </span>
              </Link>
            </div>
          </div>
          <div className="flex justify-end">
            {showConnectButton ? <ConnectButton showChain={true} /> : null}
            {showNav && (
              <div onClick={() => setIsOpen(!isOpen)} className="app-nav-menu-icon">
                {isOpen ? <MenuOpenIcon /> : <MenuIcon />}
              </div>
            )}
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold lg:grow mt-4 md:mt-8 lg:mt-0 flex items-center">
          {showBackButton && (
            <Link href={backButtonLink}>
              <ChevronLeftIcon className="h-8 w-8 mr-1" />
            </Link>
          )}
          {name}
        </h1>
      </div>
    </header>
  );
}
