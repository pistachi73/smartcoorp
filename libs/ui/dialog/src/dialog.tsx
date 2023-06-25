import * as DialogPrimitive from '@radix-ui/react-alert-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import React, { FC, MouseEvent, forwardRef } from 'react';

import { Button } from '@smartcoorp/ui/button';

import { Styled } from './dialog.styles';
import type { DialogContentProps, DialoglRootProps } from './dialog.types';

const variantMapping = {
  animate: 'animate',
  initial: 'initial',
  exit: 'initial',
};
const overlayVariants = {
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
  initial: {
    opacity: 0,
    transition: {
      duration: 0.5,
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};
const contentVariants = {
  animate: {
    y: '-50%',
    x: '-50%',
    opacity: 1,
    transition: {
      type: 'spring',
      delay: 0.25,
      stiffness: 150,
      damping: 30,
    },
  },
  initial: {
    y: '-55%',
    x: '-50%',
    opacity: 0,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 30,
    },
  },
};

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  (
    {
      children,
      title,
      description,
      actionLabel,
      onAction,
      onCancel,
      cancelLabel,
      disabled,
      loading,
      variant = 'info',
      ...props
    },
    forwardedRef: React.Ref<HTMLDivElement>
  ) => {
    const onActionClick = onAction
      ? {
          onClick: (
            e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
          ) => {
            e.preventDefault();
            onAction(e);
          },
        }
      : {};

    const onCancelClick = onCancel
      ? {
          onClick: (
            e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
          ) => {
            e.preventDefault();
            onCancel(e);
          },
        }
      : {};

    return (
      <DialogPrimitive.Portal>
        <Styled.DialogOverlay variants={overlayVariants} {...variantMapping} />
        <Styled.DialogContent
          ref={forwardedRef}
          variants={contentVariants}
          {...variantMapping}
          {...props}
        >
          <VisuallyHidden.Root>
            <DialogPrimitive.Title>{title}</DialogPrimitive.Title>
          </VisuallyHidden.Root>
          <VisuallyHidden.Root>
            <DialogPrimitive.Description>
              {description}
            </DialogPrimitive.Description>
          </VisuallyHidden.Root>
          <div>{children}</div>
          <Styled.DialogActionsContainer $cancelLabel={Boolean(cancelLabel)}>
            {cancelLabel && (
              <Styled.DialogActionButton asChild={true}>
                <Button
                  disabled={disabled || loading}
                  variant="secondary"
                  size="small"
                  {...onCancelClick}
                >
                  {cancelLabel}
                </Button>
              </Styled.DialogActionButton>
            )}
            <Styled.DialogActionButton asChild={true}>
              <Button
                loading={loading}
                disabled={disabled || loading}
                variant="primary"
                color={variant === 'danger' ? 'error' : 'primary'}
                size="small"
                {...onActionClick}
              >
                {actionLabel}
              </Button>
            </Styled.DialogActionButton>
          </Styled.DialogActionsContainer>
        </Styled.DialogContent>
      </DialogPrimitive.Portal>
    );
  }
);
export const Dialog: FC<DialoglRootProps> = ({
  children,
  open,
  onOpenChange,
  defaultOpen,
}) => {
  const controlledProps = onOpenChange ? { open, onOpenChange } : {};
  return (
    <DialogPrimitive.Root defaultOpen={defaultOpen} {...controlledProps}>
      {children}
    </DialogPrimitive.Root>
  );
};
export const DialogTrigger = DialogPrimitive.Trigger;
