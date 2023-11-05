import { useCallback, useEffect, useState } from 'react';
import {
  BsArrowClockwise,
  BsArrowCounterclockwise,
  BsBoundingBox,
  BsLink,
  BsTerminal,
  BsTypeBold,
  BsTypeItalic,
  BsTypeStrikethrough,
  BsTypeUnderline,
} from 'react-icons/bs';
import { MdFormatClear } from 'react-icons/md';

import { Body } from '@smartcoorp/ui/body';
import { primary500_RGBA } from '@smartcoorp/ui/tokens';
import { Tooltip } from '@smartcoorp/ui/tooltip';

import {
  useBlocksDBConsumerContext,
  useBlocksDBUpdaterContext,
} from '../../contexts/blocks-context';
import {
  useUtilContext,
  useUtilsUpdaterContext,
} from '../../contexts/util-context/util-context';
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
  UtilityToolsContainer,
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
  const { undo, redo } = useBlocksDBUpdaterContext();
  const { canUndo, canRedo } = useBlocksDBConsumerContext();
  const { setViewBlocks } = useUtilsUpdaterContext();
  const { viewBlocks } = useUtilContext();

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
              icon={BsTypeBold}
              iconSize={18}
              $formatted={selectionFormat.bold}
              aria-label="Bold"
            />
          }
          content={
            <Body size="xsmall" noMargin>
              Bold
              <TooltipCaption noMargin as={'span'}>
                &#8984;+B
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
              icon={BsTypeItalic}
              iconSize={18}
              $formatted={selectionFormat.italic}
              aria-label="Italic"
            />
          }
          content={
            <Body size="xsmall" noMargin>
              Italic
              <TooltipCaption noMargin as={'span'}>
                &#8984;+I
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
              icon={BsTypeUnderline}
              iconSize={18}
              $formatted={selectionFormat.underline}
              aria-label="Underline"
            />
          }
          content={
            <Body size="xsmall" noMargin>
              Underline
              <TooltipCaption noMargin as={'span'}>
                &#8984;+U
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
              icon={BsTypeStrikethrough}
              iconSize={18}
              $formatted={selectionFormat.strikeThrough}
              aria-label="Strike Trough"
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
              iconSize={18}
              aria-label="Remove format"
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
            icon={BsLink}
            iconSize={18}
            disabled={!selectionFormat.link.enabled}
            $formatted={selectionFormat.link.formatted}
            size="small"
            aria-label="Add link"
          />

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
        <Tooltip
          sideOffset={0}
          triggerAsChild
          trigger={
            <IconButton
              variant="text"
              disabled={!canUndo}
              onClick={() => undo()}
              icon={BsArrowCounterclockwise}
              iconSize={14}
              aria-label="Undo"
            />
          }
          content={
            <Body size="xsmall" noMargin>
              Undo
              <TooltipCaption noMargin as={'span'}>
                &#8984;+Z
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
              disabled={!canRedo}
              onClick={() => redo()}
              icon={BsArrowClockwise}
              iconSize={14}
              aria-label="Redo"
            />
          }
          content={
            <Body size="xsmall" noMargin>
              Redo
              <TooltipCaption noMargin as={'span'}>
                &#8984;+Shift+Z
              </TooltipCaption>
            </Body>
          }
        />
        <UtilityToolsContainer>
          <Separator />
          <Tooltip
            sideOffset={0}
            triggerAsChild
            trigger={
              <IconButton
                variant="text"
                onClick={() => console.log(blocksDB)}
                icon={BsTerminal}
                iconSize={14}
                aria-label="Log blocks data"
              />
            }
            content={
              <Body size="xsmall" noMargin>
                Log blocks data
              </Body>
            }
          />
          <Tooltip
            sideOffset={0}
            triggerAsChild
            trigger={
              <IconButton
                variant="text"
                onClick={() => setViewBlocks((viewBlocks) => !viewBlocks)}
                icon={BsBoundingBox}
                iconSize={14}
                $formatted={viewBlocks}
                aria-label="View Blocks"
              />
            }
            content={
              <Body size="xsmall" noMargin>
                View Blocks
              </Body>
            }
          />
        </UtilityToolsContainer>
      </IconsContainer>
    </Container>
  );
};
