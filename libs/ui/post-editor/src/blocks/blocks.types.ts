import {
  BlockType,
  HeaderBlockProps,
  ImageBlockProps,
  LinkBlockProps,
  ListBlockProps,
  ParagraphBlockProps,
} from '../post-editor.types';

export type BlockContainerProps = {
  blockIndex: number;
  chainBlockIndex: number;
  blockType: BlockType;
  blockId: string;
  chainId: string;
  chainLength: number;
  children: React.ReactNode;
};

export type SharedBlockContainerProps = {
  blockIndex: number;
  chainBlockIndex: number;
  chainId: string;
  chainLength: number;
};

export type HeaderBlockContainerProps = SharedBlockContainerProps & {
  block: HeaderBlockProps;
};

export type ParagraphBlockContainerProps = SharedBlockContainerProps & {
  block: ParagraphBlockProps;
};

export type ListBlockContainerProps = SharedBlockContainerProps & {
  block: ListBlockProps;
};

export type ImageBlockContainerProps = SharedBlockContainerProps & {
  block: ImageBlockProps;
};

export type LinkBlockContainerProps = SharedBlockContainerProps & {
  block: LinkBlockProps;
  getMetaData: any;
};

export type ColumnBlockProps = {
  columns: 2 | 3;
  blockId: string;
  distribution?: number[];
  children: React.ReactNode;
};

type SharedBlockContentProps = {
  blockIndex: number;
  chainBlockIndex: number;
  chainId: string;
};

export type HeaderBlockContentProps = SharedBlockContentProps & {
  block: HeaderBlockProps;
};

export type ParagraphBlockContentProps = SharedBlockContentProps & {
  block: ParagraphBlockProps;
};

export type ListBlockContentProps = SharedBlockContentProps & {
  block: ListBlockProps;
};

export type LinkBlockContentProps = SharedBlockContentProps & {
  block: LinkBlockProps;
  getMetaData?: any;
};

export type ImageBlockContentProps = SharedBlockContentProps & {
  block: ImageBlockProps;
};
