'use client';

import Image from 'next/image';
import Sound from 'react-sound';
//const Sound = require('react-sound');
import {useMusic} from '@/contexts/MusicContext';
import {useEffect} from 'react';
import MusicPlayerDev from '../utility/MusicPlayerDev';

export default function MusicControl(this: any) {
  const {
    isMusicPlaying,
    currentSongIndex,
    currentSongString,
    currentSongPosition,
    playPauseToggle,
    skipSong,
    setCurrentSongPosition,
  } = useMusic();

  const handleSkipInteraction: React.MouseEventHandler<HTMLButtonElement> = () => {
    console.log('skip song button pressed');
    handleSongFinishedPlaying();
  };
  const handleMuteInteraction: React.MouseEventHandler<HTMLButtonElement> = () => {
    console.log('mute song button pressed');
    playPauseToggle();
  };
  const handleSongLoading = () => {
    // console.log('handleSongLoading');
  };
  const handleSongPlaying = () => {
    // console.log('handleSongPlaying');
  };

  // arg: songPositionAtPause from Sound object
  const handleSongPause = (songPositionAtPause: number) => {
    //this.setState({ elapsed: songPositionAtPause.position})
    //set song position for music context
    console.log('song position at pause: ', songPositionAtPause);
    setCurrentSongPosition(songPositionAtPause);
  };

  const handleSongResume = () => {
    //play from the current song position
    // console.log('handleSongResume');
  };
  const handleSongFinishedPlaying = () => {
    // cycle through our 3 songs
    if (currentSongIndex === 2) {
      skipSong(0);
    } else {
      skipSong(currentSongIndex + 1);
    }
  };

  useEffect(() => {
    console.log('MusicControl component mounted');
  }, []);

  return (
    <>
      <div className="z-10 absolute top-8 -right-36 w-24 h-11 bg-slate-light rounded-lg flex justify-evenly">
        <button onClick={handleSkipInteraction} title="skip song" className="hover:scale-110 transition-all">
          <Image src={'/images/icons/skip.png'} width={24} height={24} alt={'skip song button'} className="my-auto" />
        </button>
        <button
          onClick={handleMuteInteraction}
          title={`${!isMusicPlaying ? 'unmute song' : 'mute song'}`}
          className="hover:scale-110 transition-all"
        >
          <Image
            src={`/images/icons/${isMusicPlaying ? 'mute' : 'play'}.png`}
            width={24}
            height={24}
            alt={`${isMusicPlaying ? 'mute' : 'unmute'} song button`}
            className="my-auto"
          />
        </button>
      </div>
      <div className="absolute pointer-events-none">
        <Sound
          url={currentSongString}
          playStatus={isMusicPlaying ? Sound.status.PLAYING : Sound.status.PAUSED}
          playFromPosition={currentSongPosition} // in milliseconds
          onLoading={handleSongLoading}
          onPlaying={handleSongPlaying}
          onPause={handleSongPause(this)}
          onResume={handleSongResume}
          onFinishedPlaying={handleSongFinishedPlaying}
        />
      </div>
      <MusicPlayerDev
        showDev={true}
        isMusicPlaying={isMusicPlaying}
        currentSongString={currentSongString}
        currentSongPosition={currentSongPosition}
      />
    </>
  );
}
