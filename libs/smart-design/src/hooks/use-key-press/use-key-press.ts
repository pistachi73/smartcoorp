import { useEffect, useRef } from 'react';

type KeyCode = 'Backspace' | 'Tab' | 'Enter' | 'Escape';

export const useKeyPress = (key: KeyCode, cb: Function): void => {
  const callbackRef = useRef(cb);

  useEffect(() => {
    callbackRef.current = cb;
  });

  useEffect(() => {
    const handle = (event: KeyboardEvent) => {
      if (event.code === key) {
        callbackRef.current(event);
      }
    };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [key]);
};
