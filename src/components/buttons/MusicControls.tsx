'use client';

import Image from 'next/image';
import Sound from 'react-sound';
//const Sound = require('react-sound');
import {useMusic} from '@/contexts/MusicContext';
import {useState, useEffect, SetStateAction} from 'react';
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

  const [playStatus, setPlayStatus] = useState(Sound.status.STOPPED);
  const [position, setPosition] = useState<number>(0); // in milliseconds

  const handleSkipInteraction: React.MouseEventHandler<HTMLButtonElement> = () => {
    console.log('skip song button pressed');
    handleSongFinishedPlaying();
  };
  const handleMuteInteraction: React.MouseEventHandler<HTMLButtonElement> = () => {
    console.log('mute song button pressed');
    //playPauseToggle();
    if (playStatus === Sound.status.PLAYING) {
      setPlayStatus(Sound.status.PAUSED);
    } else {
      setPlayStatus(Sound.status.PLAYING);
    }
  };
  const handleSongLoading = () => {
    // console.log('handleSongLoading');
  };
  const handleSongPlaying = () => {
    // console.log('handleSongPlaying');
  };

  // arg: newPosition from Sound object
  const onPause = (newPosition: number) => {
    setPosition(newPosition);
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
          playStatus={playStatus}
          position={position} // in milliseconds
          // onLoading={handleSongLoading}
          onPlaying={handleSongPlaying}
          onFinishedPlaying={handleSongFinishedPlaying}
          onPause={onPause}
          volume={20} // 0-100
          // onResume={handleSongResume}
        />
      </div>
      <MusicPlayerDev
        showDev={false}
        isMusicPlaying={playStatus}
        currentSongString={currentSongString}
        currentSongPosition={position}
      />
    </>
  );
}
