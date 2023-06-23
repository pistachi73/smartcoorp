import { useEffect, useState } from 'react';

type Breakpoints = {
  isTiny: boolean;
  isSmall: boolean;
  isConfined: boolean;
  isWide: boolean;
  isXWide: boolean;
};

export const useBreakpoint = () => {
  const [breakpoint, setBreakPoint] = useState<Breakpoints>({
    isTiny: false,
    isSmall: false,
    isConfined: false,
    isWide: false,
    isXWide: false,
  });
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    setBreakPoint({
      isTiny: 0 < window.innerWidth && window.innerWidth < 539,
      isSmall: 539 <= window.innerWidth,
      isConfined: 740 <= window.innerWidth,
      isWide: 1113 <= window.innerWidth,
      isXWide: 1310 <= window.innerWidth,
    });

    return () => window.removeEventListener('resize', handleResize);
  }, [windowSize.width]);
  return breakpoint;
};

export default useBreakpoint;
