import React from 'react';

import { Theme } from '@smartcoorp/ui/global-styles';
import { PostEditor, PostEditorProps } from '@smartcoorp/ui/post-editor';
export const renderPostEditor = (props: PostEditorProps, theme?: Theme) => {
  cy.mount(<PostEditor {...props} debounceTime={100} />, { theme });
};

export const getExpectedText = (
  originalText: string,
  addedText: string,
  caretPosition: number
) =>
  originalText.slice(0, caretPosition) +
  addedText +
  originalText.slice(caretPosition);

export const getRandomCaretPosition = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
