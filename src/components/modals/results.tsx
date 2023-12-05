import React, {useEffect, useState} from 'react';
import Sound from 'react-sound';
import Backdrop from '../backdrop';
import {motion} from 'framer-motion';
import {set} from 'lodash';

interface ResultsModalProps {
  onClose: () => void;
  onAction: () => void;
}

const Results: React.FC<ResultsModalProps> = ({onClose, onAction}) => {
  //   const [playSound, setPlaySound] = useState(false);

  //   0 = announce game starting
  //   1 = starting in 3
  //   2 = starting in 2
  //   3 = starting in 1
  //   4 = results ready
  const [resultStateIndex, setResultStateIndex] = useState(0);
  const resultStateData = [
    {
      message: 'Game Starting!',
    },
    {
      message: 'Game starting in 3',
    },
    {
      message: 'Game starting in 2',
    },
    {
      message: 'Game starting in 1',
    },
    {
      message: 'Results!',
    },
  ];

  const dropIn = {
    hidden: {opacity: 0, y: '-100vh'},
    visible: {opacity: 1, y: 0},
    exit: {opacity: 0, y: '100vh'},
  };

  const handleAction = () => {
    setResultStateIndex(resultStateIndex + 1);
    onAction(); // action state from parent component
  };

  useEffect(() => {
    // if result state is 1 or 2 or 3, increment the result state index after 1 second
    if (resultStateIndex > 0 && resultStateIndex < 4) {
      setTimeout(() => {
        setResultStateIndex(resultStateIndex + 1);
      }, 1000);

      // if result state is 3, call onAction() to check game results
      if (resultStateIndex === 3) {
        onAction(); // TODO: modify parent function to return game results
      }
    }
  }, [resultStateIndex]);

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
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{resultStateData[resultStateIndex]?.message}</h2>
          {resultStateIndex < 4 && <button onClick={handleAction}>Next Result State</button>}
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default Results;
