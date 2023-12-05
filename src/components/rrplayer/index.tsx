import Image from 'next/image';

interface RRPlayerProps {
  hasJoined?: boolean;
  isLoggedinUser?: boolean;
  player: string;
  positionInGrid: string; // TODO: MAKE THIS REQUIRED
}

const RRPlayer = ({hasJoined, isLoggedinUser, player, positionInGrid}: RRPlayerProps) => {
  // set the position of the player in the grid
  let gridPositionStyling = '';
  if (positionInGrid === 'top') {
    gridPositionStyling = 'absolute -top-1/2';
  } else if (positionInGrid === 'left') {
    gridPositionStyling = 'absolute -left-1/2 -bottom-full';
  } else if (positionInGrid === 'right') {
    gridPositionStyling = 'absolute -right-1/2 -bottom-full';
  } else if (positionInGrid === 'bottom') {
    gridPositionStyling = 'absolute -bottom-1/2';
  } else if (positionInGrid === 'left-top') {
    gridPositionStyling = 'absolute -left-1/2 -top-1/2';
  } else if (positionInGrid === 'left-bottom') {
    gridPositionStyling = 'absolute -left-1/2 -bottom-1/2';
  } else if (positionInGrid === 'right-top') {
    gridPositionStyling = 'absolute -right-1/2 -top-1/2';
  } else if (positionInGrid === 'right-bottom') {
    gridPositionStyling = 'absolute -right-1/2 -bottom-1/2';
  }

  if (isLoggedinUser) {
    return (
      <div className={gridPositionStyling}>
        <div className="mx-auto flex justify-center items-center w-20 h-20 rounded-full bg-grey-main border-4 border-brand-green">
          <Image src={'/images/icons/profile-64.png'} width={72} height={72} alt={'profile icon'} />
        </div>
        <p className="text-brand-green mt-4 mx-auto">{player}</p>
      </div>
    );
  }

  return (
    <div className={gridPositionStyling}>
      <div className="mx-auto flex justify-center items-center w-16 h-16 rounded-full bg-grey-main">
        <Image src={'/images/icons/profile-64.png'} width={54} height={54} alt={'profile icon'} />
      </div>
      <p className="mt-4 mx-auto">{hasJoined ? player : 'Waiting for Player ...'}</p>
    </div>
  );
};

export default RRPlayer;
