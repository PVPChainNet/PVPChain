import {motion} from 'framer-motion';

interface BackdropProps {
  children: JSX.Element;
  onClick: () => void;
}

const Backdrop = ({children, onClick}: BackdropProps) => {
  return (
    <motion.div
      onClick={onClick}
      className="backdrop"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
