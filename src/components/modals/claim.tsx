import React, {useState} from 'react';
import Sound from 'react-sound';
import Backdrop from '../backdrop';

interface ClaimModalProps {
  onClose: () => void;
  onAction: () => void;
}

const Claim: React.FC<ClaimModalProps> = ({onClose, onAction}) => {
  const [confirmationMessage, setConfirmationMessage] = useState(false);
  const [playSound, setPlaySound] = useState(false);

  const handleAction = () => {
    // Play sound effect
    setPlaySound(true);

    onAction();
    setConfirmationMessage(true);
  };

  return (
    // <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black-main bg-opacity-70">
    <Backdrop onClick={onClose}>
      <div
        onClick={e => e.stopPropagation()}
        className="bg-slate-accent p-4 rounded-lg shadow-md w-4/5 max-w-[450px] h-[360px]"
      >
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500">
            Close
          </button>
        </div>
        <div className="h-full flex flex-col justify-around">
          <div>
            <h2 className="text-xl font-semibold mb-2">Claim WBNB</h2>
            <p className="text-gray-600 mb-4">Description paragraph here.</p>
          </div>
          {confirmationMessage ? (
            <p className="text-brand-green-hover mt-2">Action performed successfully!</p>
          ) : (
            <p className="mt-2"></p>
          )}
          {playSound && (
            <Sound
              url={'/sounds/claimed.mp3'}
              playStatus={Sound.status.PLAYING}
              onFinishedPlaying={() => setPlaySound(false)}
            />
          )}
          {confirmationMessage ? (
            <div className="flex justify-center items-center h-11 w-full max-w-[240px] text-black-dark rounded-3xl border-2 border-white-main bg-gradient-to-r from-brand-purple to-[#CCBED3] bg-opacity-50">
              <p className="">Claimed</p>
            </div>
          ) : (
            <button
              onClick={handleAction}
              className="h-11 w-full max-w-[240px] text-black-dark rounded-3xl border-2 border-white-main bg-gradient-to-r from-brand-purple to-[#CCBED3]"
            >
              Claim WBNB
            </button>
          )}
        </div>
      </div>
    </Backdrop>
    // </div>
  );
};

export default Claim;
