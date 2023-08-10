import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import React from 'react';
import { BiChevronRight } from 'react-icons/bi';

import { Styled as S } from './dropdown-menu.styles';
export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuPrimitive.MenuContentProps
>(({ children, ...props }, forwardedRef) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <S.Content {...props} ref={forwardedRef}>
        {children}
        {/* <DropdownMenuPrimitive.Arrow /> */}
      </S.Content>
    </DropdownMenuPrimitive.Portal>
  );
});
export const DropdownMenuLabel = S.Label;
export const DropdownMenuItem = S.Item;

export const DropdownMenuSeparator = S.Separator;
export const DropdownMenuGroup = React.forwardRef<
  any,
  DropdownMenuPrimitive.DropdownMenuGroupProps & { includeSeparators?: boolean }
>(({ children, includeSeparators = true, ...props }, forwardedRef) => {
  return (
    <>
      {includeSeparators && <DropdownMenuSeparator />}
      <S.Group {...props} ref={forwardedRef}>
        {children}
      </S.Group>
      {includeSeparators && <DropdownMenuSeparator />}
    </>
  );
});

export const DropdownMenuSub = DropdownMenuPrimitive.DropdownMenuSub;
export const DropdownMenuSubTrigger = React.forwardRef<
  any,
  DropdownMenuPrimitive.DropdownMenuSubTriggerProps
>(({ children, ...props }, forwardedRef) => {
  return (
    <S.SubTrigger {...props} ref={forwardedRef}>
      <div>{children}</div>
      <S.SubTriggerIconContainer>
        <BiChevronRight size={18} />
      </S.SubTriggerIconContainer>
    </S.SubTrigger>
  );
});

export const DropdownMenuSubContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuPrimitive.MenuSubContentProps
>(({ children, ...props }, forwardedRef) => {
  return (
    <DropdownMenuPrimitive.DropdownMenuPortal>
      <S.SubContent
        {...props}
        collisionPadding={6}
        sideOffset={-4}
        ref={forwardedRef}
      >
        {children}
        {/* <DropdownMenuPrimitive.Arrow /> */}
      </S.SubContent>
    </DropdownMenuPrimitive.DropdownMenuPortal>
  );
});
