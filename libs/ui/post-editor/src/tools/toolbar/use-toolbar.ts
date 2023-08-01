import { Dispatch, SetStateAction, useCallback, useState } from 'react';

type UseToolbarResult = {
  onBold: () => void;
  onItalic: () => void;
  onUnderline: () => void;
  onStrikeThrough: () => void;
  onLink: (url: string) => void;
  removeFormat: () => void;
  removeWrapper: (range: Range) => void;
  prevRange: Range | null;
  setPrevRange: Dispatch<SetStateAction<Range | null>>;
};
export const useToolbar = (): UseToolbarResult => {
  const [prevRange, setPrevRange] = useState<Range | null>(null);

  const removeWrapper = useCallback((range: Range) => {
    const rangeContents = range.extractContents();
    const frag = document.createDocumentFragment();
    const elem = document.createElement('div');
    elem.innerHTML = rangeContents.children[0].innerHTML;

    while (elem.childNodes[0]) {
      frag.appendChild(elem.childNodes[0]);
    }
    range.insertNode(frag);
  }, []);

  const onBold = useCallback(() => document.execCommand('bold'), []);
  const onItalic = useCallback(
    () => document.execCommand('italic', false, ''),
    []
  );
  const onUnderline = useCallback(
    () => document.execCommand('underline', false, ''),
    []
  );

  const onLink = useCallback(
    (url: string) => document.execCommand('createLink', false, url),
    []
  );

  const onStrikeThrough = useCallback(
    () => document.execCommand('strikeThrough', false, ''),
    []
  );

  const removeFormat = useCallback(() => {
    document.execCommand('removeFormat');
    document.execCommand('unlink');
  }, []);

  return {
    onBold,
    onItalic,
    onUnderline,
    onLink,
    onStrikeThrough,
    removeFormat,
    removeWrapper,
    prevRange,
    setPrevRange,
  };
};
