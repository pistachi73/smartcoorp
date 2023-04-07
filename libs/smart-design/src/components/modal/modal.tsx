import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { motion } from 'framer-motion';
import React, { FC, forwardRef } from 'react';
import { ImCross } from 'react-icons/im';

import { Styled } from './modal.styles';
import type { ModalContentProps, ModalRootProps } from './modal.types';

// type ModalVariants = Record<'animate' | 'initial', Variant>;
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

export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  (
    { children, title, description, closeIcon = true, ...props },
    forwardedRef: React.Ref<HTMLDivElement>
  ) => {
    return (
      <DialogPrimitive.Portal>
        <Styled.ModalOverlay variants={overlayVariants} {...variantMapping} />
        <Styled.ModalContent
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

          {children}
          {closeIcon && (
            <Styled.ModalCloseIcon
              data-cy="modal-close-icon"
              aria-label="Close modal"
            >
              <ImCross size={12} />
            </Styled.ModalCloseIcon>
          )}
        </Styled.ModalContent>
      </DialogPrimitive.Portal>
    );
  }
);
export const ModalTrigger = DialogPrimitive.Trigger;
export const Modal: FC<ModalRootProps> = ({ children, open, onOpenChange }) => {
  const controlledProps = open ? { open, onOpenChange } : {};
  return (
    <DialogPrimitive.Root {...controlledProps}>{children}</DialogPrimitive.Root>
  );
};
