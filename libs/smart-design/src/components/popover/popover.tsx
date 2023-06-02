// your-popover.jsx
import * as PopoverPrimitive from '@radix-ui/react-popover';
import React, { FC, forwardRef } from 'react';

import { Styled as S } from './popover.styles';
import { PopoverContentProps, PopoverProps } from './popover.types';

export const Popover: FC<PopoverProps> = ({
  modal = false,
  children,
  ...rest
}) => (
  <PopoverPrimitive.Root modal={modal} {...rest}>
    {children}
  </PopoverPrimitive.Root>
);

export const PopoverTrigger = PopoverPrimitive.Trigger;

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  (
    { children, sideOffset = 5, ...props },
    forwardedRef: React.Ref<HTMLDivElement>
  ) => (
    <PopoverPrimitive.Portal>
      <S.Content sideOffset={sideOffset} {...props} ref={forwardedRef}>
        {children}
      </S.Content>
    </PopoverPrimitive.Portal>
  )
);
