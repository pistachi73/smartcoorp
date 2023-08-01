import * as Tooltip from '@radix-ui/react-tooltip';
import type { Target, Transition } from 'framer-motion';
export type TooltipProps = {
  /** The open state of the tooltip when it is initially rendered. Use when you do not need to control its open state. */
  defaultOpen?: boolean;
  /** The controlled open state of the tooltip. Must be used in conjunction with onOpenChange. */
  open?: boolean;
  /** Event handler called when the open state of the tooltip changes. */
  onOpenChange?: (open: boolean) => void;
  /** Tooltip content component */
  content: React.ReactNode;
  /** Tooltip trigger component */
  trigger: React.ReactNode;
  /** The preferred side of the trigger to render against when open. Will be reversed when collisions occur and avoidCollisions is enabled. */
  side?: React.ComponentProps<typeof Tooltip.Content>['side'];
  /** The distance in pixels from the trigger. */
  sideOffset?: number;
  /** The preferred alignment against the trigger. May change when collisions occur. */
  align?: React.ComponentProps<typeof Tooltip.Content>['align'];

  /** As child prop for trigger */
  triggerAsChild?: boolean;
};

export type TooltipTransitionProps = {
  initial: Target;
  animate: Target;
  exit: Target;
  transition: Transition;
};
