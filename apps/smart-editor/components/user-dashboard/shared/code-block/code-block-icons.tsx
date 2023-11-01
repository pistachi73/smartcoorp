'use client';

import { useState } from 'react';
import { BsClipboard } from 'react-icons/bs';

import { Button } from '@smartcoorp/ui/button';

import { CodeBlockIconsContainer } from './code-block.styles';

export const CodeBlockIcons = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);
  const onCopyToClipboard = () => {
    setCopied(true);
    navigator.clipboard.writeText(
      code
        .replace(/~~~js/g, '')
        .replace(/~~~tsx/g, '')
        .replace(/~~~/g, '')
    );

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  return (
    <CodeBlockIconsContainer>
      <Button
        variant="secondary"
        icon={BsClipboard}
        iconSize={14}
        size="small"
        onClick={onCopyToClipboard}
      >
        {copied ? 'Copied!' : 'Copy'}
      </Button>
    </CodeBlockIconsContainer>
  );
};
