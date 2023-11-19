import { SavingStatus } from '@smart-editor/components/user-dashboard/posts/post-writer/post-writer';
import { Dispatch } from 'react';

import {
  type BlocksDB,
  type BlocksDBAction,
  type BlocksDBReducerState,
} from '@smartcoorp/ui/post-editor';

export type ImageWithFile = {
  blockId: string;
  image: File;
};

export type ImageWithUrl = {
  blockId: string;
  imageUrl: string;
};

export type ImagesToHandle = {
  toUpload: ImageWithFile[];
  toDelete: ImageWithUrl[];
};

export type GetImagesFromBlocksInput = {
  blocks: BlocksDB['blocks'];
  currentUploadedImages: ImageWithUrl[];
};

export type GetInitialUploadedImagesInput = {
  blocks: BlocksDB['blocks'];
};

export type UsePostEditorInput = {
  postId: string;
  userId: string;
  initialBlocksDb?: any;
  saving: SavingStatus;
  setSaving: (saving: SavingStatus) => void;
};

export type UsePostEditorOutput = {
  blocksDB: BlocksDBReducerState;
  dispatchBlocksDB: Dispatch<BlocksDBAction>;
  onSave: () => Promise<void>;
};
