import { EveryBlockFieldKeys, ListBlockProps } from '../../post-editor.types';

import { OrderedList, UnorderedList } from './list-field.styles';
type CommonProps = {
  blockId: string;
  blockIndex: number;
  fieldIndex: number;
  items: string[];
  style: ListBlockProps['data']['style'];
  field: EveryBlockFieldKeys;
};

type OLListFieldProps = React.ComponentProps<typeof OrderedList> & CommonProps;
type ULListFieldProps = React.ComponentProps<typeof UnorderedList> &
  CommonProps;

export type ListFieldProps = OLListFieldProps | ULListFieldProps;
