import { useRef } from 'react';

export const usePreviousPersistentWithMatcher = <T>(
  value: T,
  isEqualFunc?: (prev: T, next: T) => boolean
) => {
  const ref = useRef<{ value: T; prev: T | null }>({
    value: value,
    prev: null,
  });

  const current = ref.current.value;
  if (isEqualFunc ? !isEqualFunc(current, value) : value !== current) {
    ref.current = {
      value: value,
      prev: current,
    };
  }

  return ref.current.prev;
};
