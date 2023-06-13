import { AnimatePresence, motion } from 'framer-motion';
import { FC } from 'react';
import { v4 as uuid } from 'uuid';

import { Styled as S } from './checkbox.styles';
import { CheckboxProps } from './checkbox.types';

export const Checkbox: FC<CheckboxProps> = ({
  onChange,
  size = 'medium',
  sizeConfined,
  sizeWide,
  id,
  label,
  isDisabled = false,
  defaultValue = false,
  innerRef,
  checked,
  intermediate = false,
  ...props
}) => {
  const checkboxId = id ?? uuid();

  return (
    <S.Container $disabled={isDisabled}>
      <S.Root
        ref={innerRef}
        checked={checked || intermediate}
        disabled={isDisabled}
        defaultChecked={defaultValue}
        onCheckedChange={(v) => {
          if (intermediate && !checked) {
            onChange(true);
          } else {
            onChange(v);
          }
        }}
        id={checkboxId}
        $size={size}
        $sizeConfined={sizeConfined}
        $sizeWide={sizeWide}
        {...props}
      >
        <S.Indicator forceMount>
          <AnimatePresence initial={false} mode="wait">
            {checked ? (
              <AnimatedCheckbox
                key={checked ? 'checked' : 'unchecked'}
                mode="checked"
              />
            ) : intermediate ? (
              <AnimatedCheckbox
                key={intermediate ? 'intermediate' : 'unchecked'}
                mode="intermediate"
              />
            ) : null}
          </AnimatePresence>
        </S.Indicator>
      </S.Root>
      {label && (
        <S.Label
          htmlFor={checkboxId}
          $size={size}
          $sizeConfined={sizeConfined}
          $sizeWide={sizeWide}
        >
          {label}
        </S.Label>
      )}
    </S.Container>
  );
};

const AnimatedCheckbox = ({ mode }: { mode: 'checked' | 'intermediate' }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <motion.path
        initial={{
          pathLength: 0,
        }}
        animate={{
          pathLength: 1,
        }}
        exit={{
          pathLength: 0,
        }}
        transition={{
          duration: 0.2,
          ease: 'easeInOut',
        }}
        strokeLinejoin="round"
        strokeLinecap="round"
        d={mode === 'checked' ? 'M5 13l4 4L19 7' : 'M5 12 L19 12'}
      />
    </svg>
  );
};
