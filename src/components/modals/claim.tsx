import React, {useEffect, useState} from 'react';
import Sound from 'react-sound';
import Backdrop from '../backdrop';
import Image from 'next/image';
import Slider from '../slider';

interface ClaimModalProps {
  onClose: () => void;
  onAction: (amount: number, isBNB: boolean) => Promise<boolean>;
  totalRemainingToClaim: number;
  isAmountInBNB: boolean;
}

const Claim: React.FC<ClaimModalProps> = ({onClose, onAction, totalRemainingToClaim, isAmountInBNB}) => {
  const [doesUserWantToClaimInBNB, setDoesUserWantToClaimInBNB] = useState<boolean>(false);
  const [amountToClaim, setAmountToClaim] = useState<number>(0);
  const [didClaimSucceed, setDidClaimSucceed] = useState<boolean | null>(null);
  const [playSound, setPlaySound] = useState(false);

  const handleAction = async () => {
    // Play sound effect
    setPlaySound(true);

    const claimSuccess = await onAction(amountToClaim, doesUserWantToClaimInBNB);
    setDidClaimSucceed(claimSuccess);
  };

  const handleSliderChange = (value: number, applyFee: boolean) => {
    setAmountToClaim(value);
  };

  //TODO: replace the alert message with a success or fail modal
  useEffect(() => {
    if (didClaimSucceed) {
      alert('claim success');
    } else if (didClaimSucceed === false) {
      alert('claim failed');
    }
  }, [didClaimSucceed]);

  return (
    // <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black-main bg-opacity-70">
    <Backdrop onClick={onClose}>
      <div
        onClick={e => e.stopPropagation()}
        className="bg-slate-main p-4 rounded-[48px] shadow-md w-4/5 max-w-[660px] px-16"
      >
        <div className="mt-9 mb-10 flex justify-between items-start">
          <h2>Claim</h2>
          <Image
            className="cursor-pointer"
            onClick={onClose}
            src={'/images/icons/close.svg'}
            width={20}
            height={20}
            alt="close claim modal"
          />
        </div>
        <p className="text-white-darker mb-4">
          Select the amount of tokens to claim. By clicking the &apos;Claim&apos; button, you are signing the
          transaction and allowing funds to be purchased from the market and enter your connected wallet.{' '}
        </p>

        {/* check if user is claiming BNB. If not, ask if they want to claim in BNB */}
        {!isAmountInBNB && (
          <>
            <div className="mt-24 mb-7 flex justify-between">
              <p className="text-[20px] font-light">Do You Want to Claim in BNB?</p>
              <div className="flex justify-center items-center">
                <button
                  onClick={() => setDoesUserWantToClaimInBNB(false)}
                  className={`w-20 h-8 rounded-l-lg ${
                    !doesUserWantToClaimInBNB
                      ? 'text-white-main bg-brand-blue-hover'
                      : ' text-black-main bg-grey-light hover:bg-grey-main'
                  }`}
                >
                  <p className="m-auto">No</p>
                </button>
                <button
                  onClick={() => setDoesUserWantToClaimInBNB(true)}
                  className={`w-20 h-8 rounded-r-lg ${
                    doesUserWantToClaimInBNB
                      ? 'text-white-main bg-brand-blue-hover'
                      : 'text-black-main bg-grey-light hover:bg-grey-main'
                  }`}
                >
                  <p className="m-auto">Yes</p>
                </button>
              </div>
            </div>
            {doesUserWantToClaimInBNB && (
              <p className="mt-8 text-white-darker">
                note: there is a 10% fee for claiming BNB when you entered the game with a different token selected.
                This 10% fee goes to buying the project token, assuring that tokens don&apos;t lose their bets
                altogether.{' '}
              </p>
            )}
          </>
        )}

        <p className="mt-20 mb-4 text-[20px] font-light">Remaining Tokens to Claim:</p>

        {/* select amount component amd claim button */}
        <div className="w-full flex justify-between items-start gap-6">
          <div className="w-full">
            <Slider totalAmount={100} isFeeApplied={doesUserWantToClaimInBNB} onChange={handleSliderChange} />
          </div>
          <button
            onClick={handleAction}
            className="h-14 w-[160px] max-w-[240px] px-2 text-black-dark rounded-xl border-2 border-black-main bg-gradient-to-r from-brand-green to-brand-green-hover hover:scale-105 transition-all duration-300"
          >
            Claim {amountToClaim} BNB
          </button>
        </div>

        {/* {confirmationMessage ? (
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
        )} */}

        {/* {confirmationMessage ? (
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
        )}         */}
      </div>
    </Backdrop>
    // </div>
  );
};

export default Claim;
