import {useState, useEffect} from 'react';

export function useWindowSize() {
  type WindowSizeT = {
    width: undefined | number;
    height: undefined | number;
  };

  const [windowSize, setWindowSize] = useState<WindowSizeT>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Only execute client side
    if (typeof window === 'undefined') return;

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
