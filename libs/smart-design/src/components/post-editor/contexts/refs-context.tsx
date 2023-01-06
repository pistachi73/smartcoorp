import React, { useRef } from 'react';

export type FocusableElement =
  | HTMLParagraphElement
  | HTMLHeadingElement
  | HTMLOListElement
  | HTMLUListElement;

export const RefsContext = React.createContext<{
  refs: React.MutableRefObject<any>;
  blockRefs: React.MutableRefObject<HTMLDivElement[]>;
  focusableRefs: React.MutableRefObject<FocusableElement[][]>;
  flatenFocusableRefs: React.MutableRefObject<FocusableElement[]>;
  prevCaretPosition?: React.MutableRefObject<number>;
}>({
  refs: { current: [] },
  blockRefs: { current: [] },
  focusableRefs: { current: [] },
  flatenFocusableRefs: { current: [] },
  prevCaretPosition: { current: 0 },
});

export const RefsProvider = ({ children }: { children: React.ReactNode }) => {
  const refs = useRef<any>([]);
  const blockRefs = useRef<HTMLDivElement[]>([]);
  const focusableRefs = useRef<(HTMLParagraphElement | HTMLHeadingElement)[][]>(
    []
  );
  const flatenFocusableRefs = useRef<
    (HTMLParagraphElement | HTMLHeadingElement)[]
  >([]);
  const prevCaretPosition = useRef<number>(0);

  const value = React.useMemo(
    () => ({
      refs,
      blockRefs,
      focusableRefs,
      flatenFocusableRefs,
      prevCaretPosition,
    }),
    []
  );

  return <RefsContext.Provider value={value}>{children}</RefsContext.Provider>;
};
