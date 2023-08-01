import { BlockType } from '../../../post-editor.types';

export type ModifyBlockTool = {
  label: string;
  icon: JSX.Element;
  command?: string[];
};

export type ModifyBlockToolContainerProps = {
  blockId: string;
  blockIndex: number;
  blockType: Exclude<BlockType, 'columns'>;
};

export type ModifyBlockToolProps = {
  blockIndex: number;
  blockId: string;
};

export type AvailableTools = 'shared' | 'header' | 'list';
