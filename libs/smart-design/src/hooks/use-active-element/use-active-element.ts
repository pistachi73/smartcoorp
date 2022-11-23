import React, { useEffect } from 'react';

type UseActiveElementResult = Element | null;

export const useActiveElement = (): UseActiveElementResult => {
  const [active, setActive] = React.useState<Element | null>(null);

  const handleFocusIn = (): void => {
    setActive(document.activeElement);
  };

  useEffect(() => {
    document.addEventListener('focusin', handleFocusIn);
    return () => {
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, []);

  return active;
};
