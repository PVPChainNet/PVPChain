import React, {useEffect, useState} from 'react';
import Sound from 'react-sound';
import Backdrop from '../backdrop';
import {motion} from 'framer-motion';

interface ResultsModalProps {
  onClose: () => void;
  onAction: () => void;
  resultStateToDisplay: number;
}

const Results: React.FC<ResultsModalProps> = ({onClose, onAction, resultStateToDisplay}) => {
  //   const [playSound, setPlaySound] = useState(false);

  //   0 = waiting to start
  //   1 = announce game starting
  //   2 = starting in 3
  //   3 = starting in 2
  //   4 = starting in 1
  //   5 = results ready
  const [resultStateIndex, setResultStateIndex] = useState(0);

  const dropIn = {
    hidden: {opacity: 0, y: '-100vh'},
    visible: {opacity: 1, y: 0},
    exit: {opacity: 0, y: '100vh'},
  };

  const handleAction = () => {
    onAction();
  };

  //   useEffect(() => {}, [resultStateIndex]);

  return (
    <Backdrop onClick={onClose}>
      <motion.div
        onClick={e => e.stopPropagation()}
        className="z-10 bg-slate-accent p-4 rounded-lg shadow-md w-4/5 max-w-[450px] h-[360px]"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <button onClick={handleAction}>Next Result State</button>
      </motion.div>
    </Backdrop>
  );
};

export default Results;
