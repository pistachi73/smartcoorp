import { Body } from '../../../body';
import { Headline } from '../../../headline';
import { BlockFieldKeys } from '../../post-editor.types';

export type TextFieldVariant = 'paragraph' | 'header';

type CommonProps<T extends TextFieldVariant> = {
  blockId: string;
  text: string;
  variant: T;
  blockIndex: number;
  focusIndex: number;
  field: BlockFieldKeys<T>;
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
