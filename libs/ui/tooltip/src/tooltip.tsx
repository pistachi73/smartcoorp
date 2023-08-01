import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { useMemo } from 'react';

import { TooltipArow, TooltipContet } from './tooltip.styles';
import type { TooltipProps, TooltipTransitionProps } from './tooltip.types';
export const Tooltip: React.FC<TooltipProps> = ({
  trigger,
  content,
  onOpenChange,
  open,
  side = 'top',
  sideOffset = 5,
  align = 'center',
  defaultOpen,
  triggerAsChild = false,
  ...props
}) => {
  const contentAnimation = useMemo<TooltipTransitionProps>(() => {
    let translateValue;

    switch (side) {
      case 'top':
        translateValue = {
          initial: { y: 5 },
          animate: { y: 0 },
          exit: { y: 5 },
        };
        break;
      case 'bottom':
        translateValue = {
          initial: { y: -5 },
          animate: { y: 0 },
          exit: { y: -5 },
        };
        break;
      case 'left':
        translateValue = {
          initial: { x: 5 },
          animate: { x: 0 },
          exit: { x: 5 },
        };
        break;
      case 'right':
        translateValue = {
          initial: { x: -5 },
          animate: { x: 0 },
          exit: { x: -5 },
        };
        break;
    }

    return {
      initial: { opacity: 0, ...translateValue?.initial },
      animate: { opacity: 1, ...translateValue?.animate },
      exit: { opacity: 0, ...translateValue?.exit },
      transition: { ease: 'easeOut', duration: 0.2 },
    };
  }, [side]);

  return (
    <TooltipPrimitive.Provider delayDuration={250}>
      <TooltipPrimitive.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        <TooltipPrimitive.Trigger asChild={triggerAsChild}>
          {trigger}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipContet
            {...contentAnimation}
            side={side}
            align={align}
            sideOffset={sideOffset}
            {...props}
          >
            {content}
            <TooltipArow width={10} height={5} />
          </TooltipContet>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
