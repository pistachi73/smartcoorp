import { BlocksDB } from '../../post-editor/src/contexts/blocks-context/blocks-context.types';

export type PostProps = {
  title: string;
  content: BlocksDB;
};
