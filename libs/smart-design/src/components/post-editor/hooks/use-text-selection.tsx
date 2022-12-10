import { read } from 'fs';

import { useCallback, useLayoutEffect, useState } from 'react';

type ClientRect = {
  top: number;
  left: number;
};

function roundValues(_rect: ClientRect) {
  const rect = {
    ..._rect,
  };
  for (const key of Object.keys(rect)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    rect[key] = Math.round(rect[key]);
  }
  return rect;
}

function shallowDiff(prev: any, next: any) {
  if (prev != null && next != null) {
    for (const key of Object.keys(next)) {
      if (prev[key] != next[key]) {
        return true;
      }
    }
  } else if (prev != next) {
    return true;
  }
  return false;
}

type TextSelectionState = {
  clientRect?: ClientRect;
  isCollapsed?: boolean;
  textContent?: string;
};

const defaultState: TextSelectionState = {};

/**
 * useTextSelection(ref)
 *
 * @description
 * hook to get information about the current text selection
 *
 */
export function useTextSelection(target?: HTMLElement) {
  const [{ clientRect, isCollapsed, textContent }, setState] =
    useState<TextSelectionState>(defaultState);

  const handler = useCallback(async () => {
    let newRect: ClientRect;
    const selection = window.getSelection();
    const newState: TextSelectionState = {};

    if (selection == null || !selection.rangeCount) {
      setState(newState);
      return;
    }

    const range = selection.getRangeAt(0);

    if (target != null && !target.contains(range.commonAncestorContainer)) {
      setState(newState);
      return;
    }

    if (range == null) {
      setState(newState);
      return;
    }

    const contents = range.cloneContents();

    if (contents.textContent != null) {
      newState.textContent = contents.textContent;
    }

    const rects = range.getClientRects();
    if (rects.length === 0 && range.commonAncestorContainer != null) {
      const el = range.commonAncestorContainer as HTMLElement;
      newRect = roundValues(el.getBoundingClientRect().toJSON());
    } else {
      if (rects.length < 1) return;
      let auxRect = rects[0];
      let auxMaxLeft = auxRect.left;
      newRect = {
        top: auxRect.top - (target?.getBoundingClientRect().top || 0) + 26,
        left: auxRect.left - (target?.getBoundingClientRect().left || 0),
      };
      for (const key of Object.keys(rects)) {
        const index: number = key as unknown as number;
        const rect: DOMRect = rects[index];

        if (auxRect.top !== rect.top) {
          newRect.top += rect.top - auxRect.top;
        }

        if (
          auxMaxLeft < rect.left ||
          (index == 0 && auxRect.width === rect.width)
        ) {
          newRect.left += rect.width / 2;
          auxMaxLeft = rect.left;
        }

        auxRect = rect;
      }

      newRect = roundValues(newRect);
    }
    if (shallowDiff(clientRect, newRect)) {
      newState.clientRect = newRect;
    }
    newState.isCollapsed = range.collapsed;

    setState(newState);
  }, [target]);

  useLayoutEffect(() => {
    document.addEventListener('selectionchange', handler);
    document.addEventListener('keydown', handler);
    document.addEventListener('keyup', handler);
    window.addEventListener('resize', handler);

    return () => {
      document.removeEventListener('selectionchange', handler);
      document.removeEventListener('keydown', handler);
      document.removeEventListener('keyup', handler);
      window.removeEventListener('resize', handler);
    };
  }, [target]);

  return {
    clientRect,
    isCollapsed,
    textContent,
  };
}
