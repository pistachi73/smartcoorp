import * as PopoverPrimitive from '@radix-ui/react-popover';
import React from 'react';

export type PopoverProps = {
  /** The content to render inside the popover. */
  children?: React.ReactNode;
  open?: boolean;
  /**The open state of the popover when it is initially rendered. Use when you do not need to control its open state. */
  defaultOpen?: boolean;
  /**The controlled open state of the popover. Must be used in conjunction with onOpenChange. */
  onOpenChange?: (open: boolean) => void;
  /**The modality of the popover. When set to true, interaction with outside elements will be disabled and only popover content will be visible to screen readers. */
  modal?: boolean;
};

// PopoverPrimitive.PopoverContentProps;

type ContentProps = PopoverPrimitive.PopoverContentProps;

export type PopoverContentProps = {
  /** The content to render inside the popover. */
  children?: React.ReactNode;
  /**The preferred alignment against the anchor. May change when collisions occur. */
  align?: ContentProps['align'];
  /**An offset in pixels from the "start" or "end" alignment options. */
  alignOffset?: ContentProps['alignOffset'];
  /**The preferred side of the anchor to render against when open. Will be reversed when collisions occur and avoidCollisions is enabled. */
  side?: ContentProps['side'];
  /**The distance in pixels from the anchor. */
  sideOffset?: ContentProps['sideOffset'];
};
