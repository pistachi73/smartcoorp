import { AiOutlineUnorderedList } from 'react-icons/ai';
import { BiErrorCircle, BiImageAlt } from 'react-icons/bi';
import { HiLink } from 'react-icons/hi';
import { IoTextOutline } from 'react-icons/io5';
import { TbLetterH } from 'react-icons/tb';
import { v4 as uuid } from 'uuid';

import { waitForElement } from '../../helpers';
import {
  BlockType,
  HeaderBlockProps,
  ImageBlockProps,
  LinkBlockProps,
  ListBlockProps,
  ParagraphBlockProps,
} from '../../post-editor.types';

type AvailableBlocksButtonContentProps = {
  [key in BlockType | 'notFound']: {
    icon: JSX.Element;
    label: string;
  };
};

export const availableBlocksButtonContent: AvailableBlocksButtonContentProps = {
  image: {
    icon: <BiImageAlt />,
    label: 'Image',
  },
  link: {
    icon: <HiLink />,
    label: 'Link',
  },
  header: {
    icon: <TbLetterH />,
    label: 'Header',
  },
  list: {
    icon: <AiOutlineUnorderedList />,
    label: 'List',
  },
  paragraph: {
    icon: <IoTextOutline />,
    label: 'Paragraph',
  },
  notFound: {
    icon: <BiErrorCircle />,
    label: 'Not Found',
  },
};

type InsertableBlocksProps = {
  image: () => { block: ImageBlockProps; action?: () => void };
  paragraph: () => { block: ParagraphBlockProps; action?: () => void };
  link: () => { block: LinkBlockProps; action?: () => void };
  header: () => { block: HeaderBlockProps; action?: () => void };
  list: () => { block: ListBlockProps; action?: () => void };
};

export const insertableBlocks: InsertableBlocksProps = {
  image: () => {
    const id = uuid();
    return {
      block: {
        id,
        type: 'image',
        data: {},
      },
      action: () => waitForElement(id).then((elm) => elm?.click()),
    };
  },
  paragraph: () => {
    const id = uuid();
    return {
      block: {
        id,
        type: 'paragraph',
        data: {},
      },
      action: async () => (await waitForElement(id))?.focus(),
    };
  },
  header: () => {
    const id = uuid();
    return {
      block: {
        id,
        type: 'header',
        data: {
          level: 3,
          text: '',
        },
      },
      action: async () => (await waitForElement(id))?.focus(),
    };
  },
  link: () => {
    const id = uuid();
    return {
      block: { id, type: 'link', data: {} },
      action: async () => (await waitForElement(id))?.focus(),
    };
  },
  list: () => {
    const id = uuid();

    return {
      block: {
        id,
        type: 'list',
        data: {
          style: 'unordered',
          items: [''],
        },
      },
      action: async () => (await waitForElement(id))?.focus(),
    };
  },
};
