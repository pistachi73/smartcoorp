import { Dispatch, SetStateAction, useCallback, useState } from 'react';

type UseInlineToolsResult = {
  onBold: () => void;
  onItalic: () => void;
  onUnderline: () => void;
  onLink: (url: string) => void;
  removeFormat: () => void;
  removeWrapper: (range: Range) => void;
  prevRanges: Range[];
  setPrevRanges: Dispatch<SetStateAction<Range[]>>;
};
export const useInlineTools = (): UseInlineToolsResult => {
  const [prevRanges, setPrevRanges] = useState<Range[]>([]);

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

  const removeFormat = useCallback(() => {
    document.execCommand('removeFormat');
    document.execCommand('unlink');
  }, []);

  return {
    onBold,
    onItalic,
    onUnderline,
    onLink,
    removeFormat,
    removeWrapper,
    prevRanges,
    setPrevRanges,
  };
};
