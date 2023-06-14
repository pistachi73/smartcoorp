import { Body } from '@smartcoorp/ui/body';
import { Headline } from '@smartcoorp/ui/headline';

import { BlockFieldKeys } from '../../post-editor.types';

export type TextFieldVariant = 'paragraph' | 'header';

type CommonProps<T extends TextFieldVariant> = {
  blockId: string;
  chainId?: string;
  text: string;
  variant: T;
  blockIndex: number;
  fieldIndex: number;
  field: BlockFieldKeys<T>;
  size?: React.ComponentProps<typeof Headline>['size'];
  onInputChange: (e: React.ChangeEvent) => void;
};

type HeaderTextFieldProps<T extends TextFieldVariant> = React.ComponentProps<
  typeof Headline
> &
  CommonProps<T>;

type ParagraphTextFieldProps<T extends TextFieldVariant> = React.ComponentProps<
  typeof Body
> &
  CommonProps<T>;

export type TextFieldProps<T extends TextFieldVariant> =
  | HeaderTextFieldProps<T>
  | ParagraphTextFieldProps<T>;
