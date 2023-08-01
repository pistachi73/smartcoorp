import { useCallback, useEffect, useState } from 'react';
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineStrikethrough,
  AiOutlineUnderline,
} from 'react-icons/ai';
import { GrBlog } from 'react-icons/gr';
import { MdFormatClear, MdLink } from 'react-icons/md';

import { Body } from '@smartcoorp/ui/body';
import { primary100, primary200, primary500_RGBA } from '@smartcoorp/ui/tokens';
import { Tooltip } from '@smartcoorp/ui/tooltip';

import { useBlocksDBConsumerContext } from '../../contexts/blocks-context';
import { waitForElement } from '../../helpers';

import {
  Container,
  IconButton,
  IconsContainer,
  LinkInput,
  LinkInputContainer,
  LinkInputSaveButton,
  LinkToolContainer,
  Separator,
  TooltipCaption,
} from './toolbar.styles';
import { useToolbar } from './use-toolbar';

export const Toolbar = () => {
  const [linkTool, setLinkTool] = useState({ isOpen: false, value: '' });
  const [selectionFormat, setSelectionFormat] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikeThrough: false,
    link: {
      enabled: true,
      formatted: false,
    },
  });

  const {
    removeWrapper,
    prevRange,
    setPrevRange,
    onBold,
    onItalic,
    onLink,
    onStrikeThrough,
    onUnderline,
    removeFormat,
  } = useToolbar();

  const blocksDB = useBlocksDBConsumerContext();

  useEffect(() => {
    const isLinkEnabled = (): boolean | void => {
      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;

      let listItemsFound = 0;
      selection
        .getRangeAt(0)
        .cloneContents()
        .querySelectorAll('*')
        .forEach((e) => {
          if (e.tagName === 'LI') listItemsFound += 1;
        });

      return listItemsFound > 0 ? false : true;
    };
    const onTextSelectionChange = () => {
      setSelectionFormat({
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
        strikeThrough: document.queryCommandState('strikeThrough'),
        link: {
          formatted: document.queryCommandState('createLink'),
          enabled: isLinkEnabled() ?? false,
        },
      });
    };

    document.addEventListener('selectionchange', onTextSelectionChange);

    return () => {
      document.removeEventListener('selectionchange', onTextSelectionChange);
    };
  }, []);

  const removeLinkWraper = useCallback(() => {
    setLinkTool({ isOpen: false, value: '' });
    if (prevRange) {
      removeWrapper(prevRange);
      setPrevRange(null);
    }
  }, [prevRange, removeWrapper, setPrevRange]);

  const saveLink = useCallback(async () => {
    const sel = window.getSelection() as Selection;

    const range = prevRange;
    if (!range) return;

    await setPrevRange(null);

    sel.removeAllRanges();
    sel.addRange(range);
    removeWrapper(range);

    onLink(linkTool.value);

    sel.removeAllRanges();
    setLinkTool({ isOpen: false, value: '' });
  }, [linkTool.value, onLink, prevRange, removeWrapper, setPrevRange]);

  const handleAddLinkClick = async () => {
    if (linkTool.isOpen || !selectionFormat.link.enabled) return;

    const sel = document.getSelection();
    if (!sel || sel.isCollapsed) return;

    const range = sel.getRangeAt(0).cloneRange();

    sel.removeAllRanges();
    sel.addRange(range);
    const span = document.createElement('span');
    span.style.backgroundColor = `rgba(${primary500_RGBA}, 0.15)`;
    span.appendChild(range.extractContents());
    range.insertNode(span);

    setPrevRange(range);
    setLinkTool((tool) => ({ ...tool, isOpen: true }));
    (await waitForElement('link-input'))?.focus();
  };

  const handleLinkKeydown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      removeLinkWraper();
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      saveLink();
    }
  };

  const handleBlur = useCallback(
    (e: React.FocusEvent) => {
      const target = e.currentTarget as HTMLElement;

      requestAnimationFrame(() => {
        if (!target.contains(document.activeElement)) {
          removeLinkWraper();
        }
      });
    },
    [removeLinkWraper]
  );

  return (
    <Container>
      <IconsContainer>
        <Tooltip
          sideOffset={0}
          triggerAsChild
          trigger={
            <IconButton
              variant="text"
              onClick={onBold}
              icon={AiOutlineBold}
              iconSize={16}
              $formatted={selectionFormat.bold}
            />
          }
          content={
            <Body size="xsmall" noMargin>
              Bold
              <TooltipCaption noMargin as={'span'}>
                &#8984;B
              </TooltipCaption>
            </Body>
          }
        />
        <Tooltip
          sideOffset={0}
          triggerAsChild
          trigger={
            <IconButton
              variant="text"
              onClick={onItalic}
              icon={AiOutlineItalic}
              iconSize={16}
              $formatted={selectionFormat.italic}
            />
          }
          content={
            <Body size="xsmall" noMargin>
              Italic
              <TooltipCaption noMargin as={'span'}>
                &#8984;I
              </TooltipCaption>
            </Body>
          }
        />
        <Tooltip
          sideOffset={0}
          triggerAsChild
          trigger={
            <IconButton
              variant="text"
              onClick={onUnderline}
              icon={AiOutlineUnderline}
              iconSize={16}
              $formatted={selectionFormat.underline}
            />
          }
          content={
            <Body size="xsmall" noMargin>
              Underline
              <TooltipCaption noMargin as={'span'}>
                &#8984;U
              </TooltipCaption>
            </Body>
          }
        />
        <Tooltip
          sideOffset={0}
          triggerAsChild
          trigger={
            <IconButton
              variant="text"
              onClick={onStrikeThrough}
              icon={AiOutlineStrikethrough}
              iconSize={16}
              $formatted={selectionFormat.strikeThrough}
            />
          }
          content={
            <Body size="xsmall" noMargin>
              Strike Trough
            </Body>
          }
        />
        <Separator />

        <Tooltip
          sideOffset={0}
          triggerAsChild
          trigger={
            <IconButton
              variant="text"
              onClick={removeFormat}
              icon={MdFormatClear}
              iconSize={16}
            />
          }
          content={
            <Body size="xsmall" noMargin>
              Remove format
            </Body>
          }
        />
        <Separator />
        <LinkToolContainer>
          <IconButton
            variant="text"
            onClick={handleAddLinkClick}
            icon={MdLink}
            iconSize={16}
            disabled={!selectionFormat.link.enabled}
            $formatted={selectionFormat.link.formatted}
            size="small"
          >
            Add link
          </IconButton>

          {linkTool.isOpen && (
            <LinkInputContainer onBlur={handleBlur}>
              <LinkInput
                id="link-input"
                placeholder="Add or paste a link..."
                value={linkTool.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLinkTool({ ...linkTool, value: e.target.value })
                }
                onKeyDown={handleLinkKeydown}
              />
              <LinkInputSaveButton onClick={saveLink}>Save</LinkInputSaveButton>
            </LinkInputContainer>
          )}
        </LinkToolContainer>
        <Separator />
      </IconsContainer>
      <IconsContainer>
        <Separator />
        <Tooltip
          sideOffset={0}
          triggerAsChild
          trigger={
            <IconButton
              variant="text"
              onClick={() => console.log(blocksDB)}
              icon={GrBlog}
              iconSize={14}
            />
          }
          content={
            <Body size="xsmall" noMargin>
              Log blocks data
            </Body>
          }
        />
      </IconsContainer>
    </Container>
  );
};
