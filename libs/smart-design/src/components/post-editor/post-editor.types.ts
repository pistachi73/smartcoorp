type SharedBlockProps = {
  id: string;
};

export type BlockType = 'image' | 'paragraph' | 'link' | 'header' | 'list';

export type HeaderBlockProps = SharedBlockProps & {
  type: 'header';
  data: {
    text: string;
    level: 1 | 2 | 3 | 4 | 5 | 6;
  };
};

export type ParagraphBlockProps = SharedBlockProps & {
  type: 'paragraph';
  data: {
    text?: string;
  };
};

export type ListBlockProps = SharedBlockProps & {
  type: 'list';
  data: {
    style: 'unordered' | 'ordered';
    items: string[];
  };
};

export type ImageBlockProps = SharedBlockProps & {
  type: 'image';
  data: {
    file?: File;
    url?: string;
    caption?: string;
    alt?: string;
  };
};

export type LinkBlockProps = SharedBlockProps & {
  type: 'link';
  data: {
    link?: string;
    meta?: {
      url: string;
      domain: string;
      title: string;
      description: string;
      image: {
        url: string;
      };
    };
  };
};

export type BlockProps = {
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
};

export type Block =
  | HeaderBlockProps
  | ParagraphBlockProps
  | LinkBlockProps
  | ListBlockProps
  | ImageBlockProps;

export type PostEditorProps = {
  /** Blog post blocks (content) */
  blocks: Block[] | [];
  /** Function to set blog post content */
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
  /** Enable get link metadata */
  getMetaData?: Promise<Function> | any;
};
