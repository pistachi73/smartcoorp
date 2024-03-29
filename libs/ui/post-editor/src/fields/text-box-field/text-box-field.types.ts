import { TextBoxField } from './text-box-field.styles';

export type TextBoxFieldProps = React.ComponentProps<typeof TextBoxField> & {
  blockId: string;
  text?: string;
  blockIndex: number;
  fieldIndex: number;
  placeholder: string;
  loading?: boolean;
  error?: boolean;
};
