import {ReactNode, useContext, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';
import PageContext from '../contexts/PageContext';
import {SidebarProvider} from '../contexts/SidebarContext';
import {getConfigValue, getThemeValue} from '../typescript/types/DappdConfigT';
import Nav from './nav';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({children}: LayoutProps) {
  const router = useRouter();
  const {setBgClass, setTextClass} = useContext(PageContext);

  // const [isOpen, setIsOpen] = useState(true);
  // const toggleSidebar = () => {
  //   setIsOpen(!isOpen);
  // };

  const _pathSliceLength = Math.min.apply(Math, [
    router.asPath.indexOf('?') > 0 ? router.asPath.indexOf('?') : router.asPath.length,
    router.asPath.indexOf('#') > 0 ? router.asPath.indexOf('#') : router.asPath.length,
  ]);

  const canonicalURL = getConfigValue('seo.canonical', router.pathname) + router.asPath.substring(0, _pathSliceLength);

  useEffect(() => {
    setBgClass(getThemeValue(`theme.defaultBackgroundColor`, ''));
    setTextClass(getThemeValue(`theme.defaultTextColor`, ''));
  }, [setBgClass, setTextClass]);

  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalURL} />
      </Head>
      <div>
        <SidebarProvider>
          <Nav />
          <main>{children}</main>
          {/* <Nav onToggle={toggleSidebar} isOpen={isOpen} /> */}
          {/* <main className={`transition-all duration-300 ${isOpen ? 'sidebarActive' : ''}`}>{children}</main> */}
        </SidebarProvider>
      </div>
    </>
  );
}
