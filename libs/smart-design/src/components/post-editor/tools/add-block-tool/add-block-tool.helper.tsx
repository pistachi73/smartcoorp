import { buildHeaderBlock, waitForElement } from '../../helpers';
import {
  buildColumnsBlock,
  buildImageBlock,
  buildLinkBlock,
  buildListBlock,
  buildParagraphBlock,
} from '../../helpers/block-builders';
import { Block, BlockType } from '../../post-editor.types';

export type DropdownItemTypes =
  | Exclude<BlockType, 'columns'>
  | 'two-column'
  | 'three-column';

export const dropdownItems: {
  groupName: string;
  items: Partial<Record<DropdownItemTypes, { label: string; snippet: string }>>;
}[] = [
  {
    groupName: 'Basic Blocks',
    items: {
      paragraph: {
        label: 'Paragraph',
        snippet: 'hello this is a test text',
      },

      header: {
        label: 'Header',
        snippet: 'hello this is a test text',
      },
      list: {
        label: 'List',
        snippet: 'hello this is a test text',
      },
      image: {
        label: 'Image',
        snippet: 'hello this is a test text',
      },
      link: {
        label: 'Link',
        snippet: 'hello this is a test text',
      },
    },
  },
  {
    groupName: 'Advanced Blocks',
    items: {
      'two-column': {
        label: '2 columns',
        snippet: 'hello this is a test text',
      },
      'three-column': {
        label: '3 columns',
        snippet: 'hello this is a test text',
      },
    },
  },
];

export const buildBlocksMapping: Record<
  DropdownItemTypes,
  (chainId: string) => Block | Block[]
> = {
  header: buildHeaderBlock,
  list: buildListBlock,
  image: buildImageBlock,
  paragraph: buildParagraphBlock,
  link: buildLinkBlock,
  'two-column': (chainId: string) => {
    const colBlock = buildColumnsBlock(chainId, 2);
    const newParagraphBlocks = colBlock.data.chains.map((chainId) =>
      buildParagraphBlock(chainId)
    );

    return [colBlock, ...newParagraphBlocks];
  },

  'three-column': (chainId: string) => {
    const colBlock = buildColumnsBlock(chainId, 3);
    const newParagraphBlocks = colBlock.data.chains.map((chainId) =>
      buildParagraphBlock(chainId)
    );

    return [colBlock, ...newParagraphBlocks];
  },
};

const fieldAction = async (fieldId: string) =>
  (await waitForElement(fieldId))?.focus();

export const buildBlocksActionMapping: Record<
  DropdownItemTypes,
  (fieldId: string) => Promise<void>
> = {
  header: fieldAction,
  list: fieldAction,
  paragraph: fieldAction,
  link: fieldAction,

  image: (fieldId: string) =>
    waitForElement(fieldId).then((elm) => {
      elm?.click();
    }),
  'two-column': fieldAction,
  'three-column': fieldAction,
};
