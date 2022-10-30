import { ReactNode } from 'react';

import { SelectSizes } from '../../select.types';

import { ValueContainer } from './select-value.styles';

export type SelectValueProps = React.ComponentProps<typeof ValueContainer> & {
  /** Label value */
  children?: ReactNode;
  /** Add custom css to select */
  className?: string;
  /** Id for the Select */
  id: string;
  /** Is Select opened */
  isOpen?: boolean;
  /** Is select filled */
  isFilled?: boolean;
  /** Is label disabled */
  disabled?: boolean;
  /** Set error state */
  error?: boolean;
  /** The size on mobile screens or larger */
  size?: SelectSizes;
  /** The size on tablet screens or larger */
  sizeConfined?: SelectSizes;
  /** The size on desktop screens or larger */
  sizeWide?: SelectSizes;
};
