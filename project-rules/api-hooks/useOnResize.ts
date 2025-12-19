/* eslint-disable */

import { useState, useEffect } from 'react';

interface windowSize {
  innerWidth: number;
  innerHeight: number;
  availHeight: number;
  availWidth: number;
  isMobile: boolean;
}

const getWindowSize = (win: Window) => {
  let { innerWidth = 0, innerHeight = 0 } = win;
  let { availWidth = 0, availHeight = 0 } = win.screen || {};
  return {
    innerWidth,
    innerHeight,
    availHeight,
    availWidth,
    isMobile: innerWidth <= 750,
  } as windowSize;
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize(window));

  useEffect(() => {
    const handler = () => {
      setWindowSize(getWindowSize(window));
    };

    window.addEventListener('resize', handler);

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  return windowSize;
};

export default useWindowSize;
