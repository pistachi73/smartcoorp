import type { FocusableElement } from '../refs-context';

export type SelectedBlock = {
  blockId: string;
  chainId: string;
  blockIndex: number;
  ref?: FocusableElement;
};
