interface MusicContextProps {
  showDev: boolean;
  isMusicPlaying: boolean;
  currentSongString: string;
  currentSongPosition: number;
}

export default function MusicPlayerDev({
  showDev,
  isMusicPlaying,
  currentSongString,
  currentSongPosition,
}: MusicContextProps) {
  if (!showDev) {
    return null;
  }

  return (
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
  );
}
