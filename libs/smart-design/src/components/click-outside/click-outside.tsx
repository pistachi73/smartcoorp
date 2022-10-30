import React, { useEffect, useRef } from 'react';

import { ClickOutsideProps } from './click-outside.types';

function useOutsideAlerter(ref: any, callback: any) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}

export const ClickOutside: React.FC<ClickOutsideProps> = ({
  children,
  callback,
  className,
  id,
}) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, callback);

  return (
    <div
      className={className}
      id={id}
      ref={wrapperRef}
      data-testid="click-outside"
    >
      {children}
    </div>
  );
};

ClickOutside.displayName = 'ClickOutside';
