import React, {useContext, useEffect} from 'react';
import classnames from 'classnames';
import Image from 'next/image';
import classNames from 'classnames';

import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import MenuContext from '../../contexts/MenuContext';
import PageContext from '@/contexts/PageContext';

import {getThemeValue} from '../../typescript/types/DappdConfigT';

import AppFooter from '@/components/app/footer';
import AppHeader from '@/components/app/header';
import Nav from '@/root/src/components/nav';
import NavMobile from '@/root/src/components/nav';
import ConnectButton from '@/components/utility/ConnectButton';
import Protected from '@/components/utility/Protected';

export type PagePropsT = {
  children: React.ReactNode;
  showNav?: boolean;
  mobileNavOnly?: boolean;
  showAppHeader?: boolean;
  showAppContent?: boolean;
  constrainAppHeader?: boolean;
  showAppFooter?: boolean;
  fixedAppFooter?: boolean;
  showConnectButton?: boolean;
  blank?: boolean;
  redirect?: boolean | string;
  protect?: boolean;
  admin?: boolean;
  className?: string;
  bgImage?: string;
  bgColor?: string;
  header?: string;
  scrollContent?: boolean;
  showBackButton?: boolean;
  backButtonLink?: string;
  stickyHeader?: boolean;
};

export default function Page({
  children,
  showNav = getThemeValue('page.showNav', true),
  mobileNavOnly = getThemeValue('page.mobileNavOnly', false),
  showAppHeader = getThemeValue('page.showAppHeader', false),
  showAppContent = getThemeValue('page.showAppContent', true),
  constrainAppHeader = getThemeValue('page.constrainAppHeader', false),
  fixedAppFooter = getThemeValue('page.fixedAppFooter', false),
  showAppFooter = getThemeValue('page.showAppFooter', false),
  showConnectButton = getThemeValue('page.showConnectButton', true),
  blank = getThemeValue('page.blank', false),
  protect = getThemeValue('page.protect', false),
  admin = getThemeValue('page.admin', false),
  redirect = getThemeValue('page.redirect', false),
  className = getThemeValue('page.className', undefined),
  bgImage = getThemeValue('page.bgImage', undefined),
  bgColor = getThemeValue('page.bgColor', undefined),
  header = getThemeValue('page.header', undefined),
  scrollContent = getThemeValue('page.scrollContent', false),
  showBackButton = getThemeValue('page.showBackButton', false),
  backButtonLink = getThemeValue('page.backButtonLink', './'),
  stickyHeader = getThemeValue('page.stickyHeader', false),
}: PagePropsT) {
  const {isOpen, setIsOpen} = useContext(MenuContext);
  // Get globally set contexts
  const {bgClass, textClass} = useContext(PageContext);

  // Set the page contexts, theses are used in AppHeader.tsx
  const {setShowConnectButton, setShowNav} = useContext(PageContext);
  useEffect(() => setShowConnectButton(showConnectButton), [setShowConnectButton, showConnectButton]);
  useEffect(() => setShowNav(showNav), [setShowNav, showNav]);

  // Set the page Header via context, this is used in AppHeader.tsx
  const {setName} = useContext(PageContext);
  useEffect(() => setName(header), [header, setName]);

  const mainPageBody = (
    <div className={classnames('app-page relative flex-1', className, bgColor, bgClass, textClass)}>
      {bgImage && (
        <div className="absolute inset-0 z-10">
          <Image
            src={bgImage}
            alt="Background Image"
            title="Background"
            layout="fill"
            objectFit="cover"
            objectPosition={'top'}
            quality={80}
            priority={true}
          />
        </div>
      )}
      <div
        className={classNames('z-20  items-stretch relative min-h-screen', {
          'max-h-screen': scrollContent,
          'flex-1': !showNav && !blank,
          flex: (showNav && !blank) || blank,
        })}
      >
        {showNav && !blank ? (
          <>
            {!mobileNavOnly && (
              <Nav
                onToggle={function (): void {
                  throw new Error('Function not implemented.');
                }}
                isOpen={false}
              />
            )}
            <NavMobile
              onToggle={function (): void {
                throw new Error('Function not implemented.');
              }}
              isOpen={false}
            />
          </>
        ) : null}
        <div className="flex flex-col grow relative min-h-screen">
          {showAppHeader && !blank ? (
            <AppHeader
              showBackButton={showBackButton}
              backButtonLink={backButtonLink}
              sticky={stickyHeader}
              constrain={constrainAppHeader}
            />
          ) : (
            !blank && (
              <div className="absolute top-3.5 right-0 z-30 app-page-padding lg:flex lg:items-center lg:flex-row-reverse">
                <div className="flex flex-row items-center justify-items-stretch">
                  <div className="grow">
                    <div className="md:hidden"></div>
                  </div>
                  <div className="flex justify-end">
                    {showConnectButton && <ConnectButton showChain={true} />}
                    {showNav && (
                      <div onClick={() => setIsOpen(!isOpen)} className="app-nav-menu-icon">
                        {isOpen ? <MenuOpenIcon /> : <MenuIcon />}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          )}
          {showAppContent ? (
            <div
              className={classNames('grow flex flex-col z-0', {
                'overflow-y-scroll': scrollContent,
              })}
            >
              {children}
            </div>
          ) : null}
          {showAppFooter && !fixedAppFooter && !blank ? <AppFooter /> : null}
        </div>
      </div>
      {showAppFooter && fixedAppFooter && !blank ? (
        <div className="fixed bottom-0 z-20 left-0 right-0 bg-brand-1">
          <AppFooter />
        </div>
      ) : null}
    </div>
  );

  return (protect || admin) && Protected ? (
    <Protected admin={admin} redirect={redirect}>
      {mainPageBody}
    </Protected>
  ) : (
    mainPageBody
  );
}
