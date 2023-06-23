import { Block, ColumnBlock } from '../post-editor.types';

export const isColumnBlock = (block: Block): block is ColumnBlock =>
  block?.type === 'columns';
