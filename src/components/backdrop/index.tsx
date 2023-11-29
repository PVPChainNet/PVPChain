import {motion} from 'framer-motion';
import {useSidebar} from '../../contexts/SidebarContext';

interface BackdropProps {
  children: JSX.Element;
  onClick: () => void;
}

const Backdrop = ({children, onClick}: BackdropProps) => {
  const sidebarStateActive = useSidebar();

  return (
    <motion.div
      onClick={onClick}
      className={`backdrop ${sidebarStateActive ? 'pl-[324px]' : 'pl-[80px]'}`}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
