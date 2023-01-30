import { AnimatePresence } from 'framer-motion';
import { FC, useEffect, useRef, useState } from 'react';
import * as React from 'react';
import {
  MdFormatBold,
  MdFormatClear,
  MdFormatItalic,
  MdFormatUnderlined,
  MdLink,
} from 'react-icons/md';

import { primary200 } from '../../../../tokens/color';
import { waitForElement } from '../../helpers/wait-for-element';
import { useTextSelection } from '../../hooks/use-text-selection';

import { getEditRanges } from './inline-tools.helpers';
import * as S from './inline-tools.styles';
import { useInlineTools } from './use-inline-tools';
type InlineToolsProps = {
  postEditorRef: React.RefObject<HTMLDivElement>;
};

export const InlineTools: FC<InlineToolsProps> = ({ postEditorRef }) => {
  const inlineToolContainerRef = useRef(null);

  const [selectionFormat, setSelectionFormat] = useState({
    bold: false,
    italic: false,
    underline: false,
    link: false,
  });

  const linkInputRef = useRef(null);
  const [linkTool, setLinkTool] = useState({ isOpen: false, value: '' });
  const [inlineToolPosition, setInlineToolPosition] = useState<{
    visible: boolean;
    top?: number;
    left?: number;
  }>({
    visible: false,
    top: 0,
    left: 0,
  });
  const {
    removeWrapper,
    prevRanges,
    setPrevRanges,
    onBold,
    onItalic,
    onLink,
    onUnderline,
    removeFormat,
  } = useInlineTools();

  const { clientRect, isCollapsed } = useTextSelection(postEditorRef.current as HTMLElement);

  useEffect(() => {
    if (linkTool.isOpen) return;

    if (prevRanges.length) {
      for (const range of prevRanges) {
        removeWrapper(range);
      }
      setPrevRanges([]);
    }

    if (isCollapsed || isCollapsed === undefined) {
      setInlineToolPosition({ visible: false, top: 0, left: 0 });
    } else {
      setInlineToolPosition({
        visible: true,
        top: clientRect?.top,
        left: clientRect?.left,
      });
    }
  }, [
    removeWrapper,
    linkTool.isOpen,
    clientRect,
    isCollapsed,
    inlineToolPosition.left,
    prevRanges,
    setPrevRanges,
  ]);

  const handleOnLink = async () => {
    if (!linkTool.isOpen) {
      const sel = document.getSelection();
      if (!sel) return;

      const ranges = getEditRanges();
      if (!ranges) return;

      for (const range of ranges) {
        sel.removeAllRanges();
        sel.addRange(range);
        const span = document.createElement('span');
        span.style.backgroundColor = primary200;
        span.appendChild(range.extractContents());
        range.insertNode(span);
      }

      setPrevRanges(ranges);
      setLinkTool((tool) => ({ ...tool, isOpen: true }));
      (await waitForElement('link-input'))?.focus();
    }
  };

  const handleLinkSave = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const link = (linkInputRef.current as any).textContent as string;
      const sel = window.getSelection() as Selection;

      const ranges = prevRanges;
      setPrevRanges([]);
      for (const range of ranges) {
        console.log(range);
        sel.removeAllRanges();
        sel.addRange(range);
        removeWrapper(range);
        onLink(link);
      }

      setLinkTool({ isOpen: false, value: '' });
      setInlineToolPosition({ visible: false, top: 0, left: 0 });
      sel.removeAllRanges();
    }
  };

  const handleBlur = React.useCallback((e: React.FocusEvent) => {
    const target = e.currentTarget as HTMLElement;
    requestAnimationFrame(() => {
      if (!target.contains(document.activeElement)) {
        setInlineToolPosition({ visible: false, top: 0, left: 0 });
        setLinkTool({ isOpen: false, value: '' });
      }
    });
  }, []);

  return (
    <AnimatePresence>
      {inlineToolPosition.visible && (
        <S.InlineToolsContainer
          ref={inlineToolContainerRef}
          role="menu"
          aria-label={'Inline tools'}
          aria-hidden={!clientRect}
          initial={{ scale: 0.95, opacity: 0.85 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.24, ease: [0, 0, 0.2, 1] }}
          style={{
            top: inlineToolPosition?.top,
            left: (inlineToolPosition?.left as number) - 40,
          }}
          onBlur={handleBlur}
        >
          <S.FlexRow $isLinkToolOpen={linkTool.isOpen}>
            <S.InlineTool onClick={onBold}>
              <MdFormatBold size={20} />
            </S.InlineTool>

            <S.InlineTool onClick={onItalic}>
              <MdFormatItalic size={20} />
            </S.InlineTool>
            <S.InlineTool onClick={handleOnLink}>
              <MdLink size={20} />
            </S.InlineTool>
            <S.InlineTool onClick={onUnderline}>
              <MdFormatUnderlined size={20} />
            </S.InlineTool>
            <S.InlineTool onClick={removeFormat}>
              <MdFormatClear size={20} />
            </S.InlineTool>
          </S.FlexRow>

          {linkTool.isOpen && (
            <S.LinkInput
              id="link-input"
              ref={linkInputRef}
              contentEditable
              data-ph="Add link"
              onKeyDown={handleLinkSave}
            />
          )}
        </S.InlineToolsContainer>
      )}
    </AnimatePresence>
  );
};
