// import React, {useContext, useState} from 'react';

// const isMusicPlaying = React.createContext<boolean>(true);
// const currentSong = React.createContext<number>(0);
// const currentSongPositionMS = React.createContext<number>(0);

// const MusicUpdateContext = React.createContext<() => void>(() => {
//   console.log('MusicUpdateContext');
// });

// export function useMusicIsPlaying() {
//   return useContext(isMusicPlaying);
// }
// export function useMusicCurrentSong() {
//   return useContext(currentSong);
// }
// export function useMusicCurrentSongPositionMS() {
//   return useContext(currentSongPositionMS);
// }

// // function for when any music context is updated
// export function useMusicUpdate() {
//   return useContext(MusicUpdateContext);
// }

// export function MusicProvider({children}: {children: React.ReactNode}) {
//     const [isMusicPlayingState, setIsMusicPlayingState] = useState(true);
//     const [currentSongState, setCurrentSongState] = useState(0);
//     const [currentSongPositionMSState, setCurrentSongPositionMSState] = useState(0);

//     function updateMusicContext() {
//         // handle mute/unmute
//         setIsMusicPlayingState(!isMusicPlayingState);

//         // cycle through our 3 songs
//         if (currentSongState === 2) {
//             setCurrentSongState(0);
//         }
//         else {
//             setCurrentSongState(currentSongState + 1);
//         }
//     }

//   return (
//     <isMusicPlaying.Provider value={isMusicPlayingState}>
//         <MusicUpdateContext.Provider value={updateMusicContext}>{children}</MusicUpdateContext.Provider>
//     </isMusicPlaying.Provider>
//   );
// }

// MusicContext.tsx
import React, {createContext, useState, useContext, ReactNode} from 'react';

interface MusicContextProps {
  isMusicPlaying: boolean;
  currentSongIndex: number;
  currentSongString: string;
  currentSongPosition: number;
  playPauseToggle: () => void;
  skipSong: (newSong: number) => void;
  setCurrentSongPosition: (position: number) => void;
}

const MusicContext = createContext<MusicContextProps | undefined>(undefined);

export const MusicProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const songs = ['/music/Duggs-1.mp3', '/music/Duggs-2.mp3', '/music/Duggs-3.mp3'];

  const [isMusicPlaying, setMusicPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [currentSongString, setCurrentSongString] = useState<string>(songs[currentSongIndex]);
  const [currentSongPosition, setCurrentSongPosition] = useState(5000);

  const playPauseToggle = () => {
    if (isMusicPlaying) {
      // Pausing
      setMusicPlaying(false);
    } else {
      // set the playback position to the current song position

      //resume playing
      setMusicPlaying(true);
    }
  };

  const skipSong = (newSongIndex: number) => {
    setCurrentSongIndex(newSongIndex);
    setCurrentSongString(songs[newSongIndex]);
    setCurrentSongPosition(0);
    //setMusicPlaying(true);
  };

  return (
    <MusicContext.Provider
      value={{
        isMusicPlaying,
        currentSongIndex,
        currentSongString,
        currentSongPosition,
        playPauseToggle,
        skipSong,
        setCurrentSongPosition,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = (): MusicContextProps => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
