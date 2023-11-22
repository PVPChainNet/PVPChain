import {ReactNode, useContext, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';
import PageContext from '../contexts/PageContext';
import {MusicProvider, useMusic} from '../contexts/MusicContext';
import {SidebarProvider} from '../contexts/SidebarContext';
import {getConfigValue, getThemeValue} from '../typescript/types/DappdConfigT';
import Nav from './nav';
import Router from 'next/router';

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

  //WORKING ON THIS

  //const { isMusicPlaying, currentSongIndex, currentSongString, currentSongPosition, playPauseToggle, skipSong, setCurrentSongPosition } = useMusic();
  // Add event listeners for page changes
  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     // Save music state to localStorage or a state management solution
  //     // so that it can be restored later
  //     localStorage.setItem('musicState', JSON.stringify({ isMusicPlaying, currentSongIndex, currentSongString, currentSongPosition }));
  //   };

  //   const handleRouteChange = () => {
  //     // Pause music when changing pages
  //     playPauseToggle();
  //   };

  //   Router.events.on('beforeHistoryChange', handleRouteChange);
  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   return () => {
  //     Router.events.off('beforeHistoryChange', handleRouteChange);
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, [isMusicPlaying, currentSongIndex, currentSongPosition]);

  // // Restore music state on component mount
  // useEffect(() => {
  //   const storedMusicState = localStorage.getItem('musicState');
  //   if (storedMusicState) {
  //     const { isMusicPlaying: storedIsMusicPlaying, currentSong: storedCurrentSong, currentSongPosition: storedCurrentSongPosition } = JSON.parse(storedMusicState);
  //     setCurrentSongPosition(storedCurrentSongPosition);
  //     if (storedIsMusicPlaying) {
  //       playPauseToggle();
  //     }
  //     skipSong(storedCurrentSong);
  //   }
  // }, []);

  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalURL} />
      </Head>
      <div>
        <MusicProvider>
          <SidebarProvider>
            <Nav />
            <main>{children}</main>
            {/* <Nav onToggle={toggleSidebar} isOpen={isOpen} /> */}
            {/* <main className={`transition-all duration-300 ${isOpen ? 'sidebarActive' : ''}`}>{children}</main> */}
          </SidebarProvider>
        </MusicProvider>
      </div>
    </>
  );
}
