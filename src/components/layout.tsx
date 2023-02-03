import {ReactNode, useContext, useEffect} from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';

import PageContext from '../contexts/PageContext';
import {getConfigValue, getThemeValue} from '../typescript/types/DappdConfigT';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({children}: LayoutProps) {
  const router = useRouter();
  const {setBgClass, setTextClass} = useContext(PageContext);

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
      {children}
    </>
  );
}
