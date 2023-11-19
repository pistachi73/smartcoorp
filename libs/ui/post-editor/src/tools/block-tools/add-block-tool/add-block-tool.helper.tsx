import { buildHeaderBlock, waitForElement } from '../../../helpers';
import {
  buildColumnsBlock,
  buildImageBlock,
  buildLinkBlock,
  buildListBlock,
  buildParagraphBlock,
} from '../../../helpers/block-builders';
import { Block, BlockType } from '../../../post-editor.types';

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
        snippet: 'Just start typing here...',
      },

      header: {
        label: 'Header',
        snippet: 'Section heading',
      },
      list: {
        label: 'List',
        snippet: 'Create a simple bulleted list',
      },
      image: {
        label: 'Image',
        snippet: 'Upload an image',
      },
      link: {
        label: 'Link',
        snippet: 'Link to an external website',
      },
    },
  },
  {
    groupName: 'Advanced Blocks',
    items: {
      'two-column': {
        label: '2 columns',
        snippet: 'Display the content in 2 columns',
      },
      'three-column': {
        label: '3 columns',
        snippet: 'Display the content in 3 columns',
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
