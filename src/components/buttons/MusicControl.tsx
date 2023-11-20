import Image from 'next/image';
import Sound from 'react-sound';
//const Sound = require('react-sound');
import {useMusic} from '@/contexts/MusicContext';

interface MusicControlProps {
  controlFunction: string;
}

export default function MusicControl({controlFunction}: MusicControlProps) {
  const {
    isMusicPlaying,
    currentSongIndex,
    currentSongString,
    currentSongPosition,
    playPauseToggle,
    skipSong,
    setCurrentSongPosition,
  } = useMusic();

  const handleInteraction = () => {
    if (controlFunction === 'skip') {
      console.log('skip song');
      handleSongFinishedPlaying();
    }
    if (controlFunction === 'mute') {
      console.log('mute song');
      playPauseToggle();
    }
  };
  const handleSongLoading = () => {
    console.log('handleSongLoading');
  };
  const handleSongPlaying = () => {
    console.log('handleSongPlaying');
  };
  const handleSongPause = () => {
    //update the current song position
    setCurrentSongPosition(currentSongPosition);
  };
  const handleSongResume = () => {
    //play from the current song position
    console.log('handleSongResume');
  };
  const handleSongFinishedPlaying = () => {
    // cycle through our 3 songs
    if (currentSongIndex === 2) {
      skipSong(0);
    } else {
      skipSong(currentSongIndex + 1);
    }
  };

  return (
    <>
      <button onClick={handleInteraction} title={controlFunction + ' song'} className="hover:scale-110 transition-all">
        <Image
          src={`/images/icons/${controlFunction === 'skip' ? 'skip' : 'mute'}.png`}
          width={24}
          height={24}
          alt={`${controlFunction} song button`}
          className="my-auto"
        />
        <div className="absolute pointer-events-none">
          <Sound
            url={currentSongString}
            playStatus={isMusicPlaying ? Sound.status.PLAYING : Sound.status.PAUSED}
            playFromPosition={currentSongPosition} // in milliseconds
            onLoading={handleSongLoading}
            onPlaying={handleSongPlaying}
            onPause={handleSongPause}
            onResume={handleSongResume}
            onFinishedPlaying={handleSongFinishedPlaying}
          />
        </div>
      </button>
      {/* Display current song information */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: '20rem',
          backgroundColor: 'orange',
          color: '#000',
          padding: '10px',
        }}
      >
        <p>
          <span className="font-bold">Music:</span> {isMusicPlaying ? 'playing' : 'paused'}
        </p>
        <p>
          <span className="font-bold">Now Playing:</span> {currentSongString}
        </p>
        <p>
          <span className="font-bold">Current Position:</span> {currentSongPosition}
        </p>
      </div>
    </>
  );
}
