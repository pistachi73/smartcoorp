import { FC } from 'react';
import { BiCheck, BiMinus } from 'react-icons/bi';
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
        <S.Indicator>
          {checked ? <BiCheck size={16} /> : <BiMinus size={16} />}
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
