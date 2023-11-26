import {motion, useInView, useAnimation} from 'framer-motion';
import React from 'react';
import {useRef, useEffect} from 'react';

interface RevealProps {
  children: JSX.Element;
  width?: 'fit-content' | '100%';
  delay?: number;
}

const Reveal = ({children, width = 'fit-content', delay}: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {once: true});

  const mainControls = useAnimation();

  useEffect(() => {
    console.log('isInView: ', isInView);
    if (isInView) {
      mainControls.start('visible');
    }
  }, [isInView]);

  return (
    <div ref={ref} style={{position: 'relative', width: width, overflow: 'hidden'}}>
      <motion.div
        variants={{
          hidden: {opacity: 0, y: 75},
          visible: {opacity: 1, y: 0},
        }}
        initial="hidden"
        animate={mainControls}
        transition={{duration: 1, delay: delay || 0.5}}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Reveal;
