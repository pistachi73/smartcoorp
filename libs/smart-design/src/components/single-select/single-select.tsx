import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons';
import * as SelectPrimitive from '@radix-ui/react-select';
import { AnimatePresence, motion } from 'framer-motion';
import React, { JSXElementConstructor, ReactNode } from 'react';

import { Styled } from './single-select.styles';
import type {
  SingleSelectItemGroupProps,
  SingleSelectItemProps,
  SingleSlectProps,
} from './single-select.types';

export const SingleSelect = React.forwardRef<
  HTMLButtonElement,
  SingleSlectProps
>(
  (
    {
      children,
      placeholder,
      ariaLabel,
      value,
      onValueChange,
      label,
      defaultValue,
      helperText,
      error = false,
      disabled = false,
      size = 'medium',
      sizeConfined,
      sizeWide,
      ...props
    },
    forwardedRef: React.Ref<HTMLButtonElement>
  ) => {
    const [open, setOpen] = React.useState(false);
    const childrenWithProps = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          size,
          sizeConfined,
          sizeWide,
        });
      }
      return child;
    });

    console.log(value);
    return (
      <SelectPrimitive.Root
        open={open}
        onOpenChange={setOpen}
        {...props}
        disabled={disabled}
        value={value}
        onValueChange={onValueChange}
        defaultValue={defaultValue}
      >
        {label && (
          <Styled.SingleSelectLabel $disabled={disabled}>
            {label}
          </Styled.SingleSelectLabel>
        )}
        <Styled.SingleSelectTrigger
          ref={forwardedRef}
          aria-label={ariaLabel}
          $size={size}
          $sizeConfined={sizeConfined}
          $sizeWide={sizeWide}
          $disabled={disabled}
          $error={error}
        >
          <SelectPrimitive.Value ref={forwardedRef} placeholder={placeholder} />

          <SelectPrimitive.Icon>
            <ChevronDownIcon />
          </SelectPrimitive.Icon>
        </Styled.SingleSelectTrigger>
        {helperText && (
          <Styled.HelperText $error={error}>{helperText}</Styled.HelperText>
        )}
        <SelectPrimitive.Portal>
          <Styled.SingleSelectContent position="popper" sideOffset={5}>
            <Styled.SingleSelectViewport>
              {childrenWithProps}
            </Styled.SingleSelectViewport>
          </Styled.SingleSelectContent>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    );
  }
);

export const SingleSelectItem = React.forwardRef<
  HTMLDivElement,
  SingleSelectItemProps
>(
  (
    { value, children, size = 'medium', sizeConfined, sizeWide, ...props },
    forwardedRef
  ) => {
    return (
      <Styled.SingleSelectItem
        value={value}
        ref={forwardedRef}
        $size={size}
        $sizeConfined={sizeConfined}
        $sizeWide={sizeWide}
        {...props}
      >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        <SelectPrimitive.ItemIndicator>
          <CheckIcon />
        </SelectPrimitive.ItemIndicator>
      </Styled.SingleSelectItem>
    );
  }
);

export const SingleSlectItemGroup = React.forwardRef<
  HTMLDivElement,
  SingleSelectItemGroupProps
>(
  (
    { label, size = 'medium', sizeConfined, sizeWide, children },
    forwardedRef
  ) => {
    const childrenWithProps = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          size,
          sizeConfined,
          sizeWide,
        });
      }
      return child;
    });
    return (
      <Styled.SingleSlectItemGroup
        $size={size}
        $sizeConfined={sizeConfined}
        $sizeWide={sizeWide}
        ref={forwardedRef}
      >
        <Styled.GroupLabel
          $size={size}
          $sizeConfined={sizeConfined}
          $sizeWide={sizeWide}
        >
          {label}
        </Styled.GroupLabel>
        {childrenWithProps}
      </Styled.SingleSlectItemGroup>
    );
  }
);
