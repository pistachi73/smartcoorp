import { FC, forwardRef } from 'react';

import { Styled as S } from './radio-group.styles';
import { RadioGroupItemProps, RadioGroupProps } from './radio-group.types';
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      defaultValue,
      value,
      isDisabled,
      onChange,
      isError,
      size = 'medium',
      sizeConfined,
      sizeWide,
      options,
    },
    forwardedRef
  ) => {
    return (
      <S.Root
        ref={forwardedRef}
        defaultValue={defaultValue}
        value={value}
        disabled={isDisabled}
        $disabled={isDisabled}
        onValueChange={onChange}
      >
        {options.map(({ label, value }) => (
          <RadioGroupItem
            key={value}
            value={value}
            label={label}
            size={size}
            sizeConfined={sizeConfined}
            sizeWide={sizeWide}
            isError={isError}
          />
        ))}
      </S.Root>
    );
  }
);

export const RadioGroupItem: FC<RadioGroupItemProps> = ({
  label,
  value,
  size = 'medium',
  sizeConfined,
  sizeWide,
  isError,
}) => {
  return (
    <S.ItemContainer>
      <S.Item
        value={value}
        id={value}
        $size={size}
        $sizeConfined={sizeConfined}
        $sizeWide={sizeWide}
        $isError={isError}
      >
        <S.Indicator
          $size={size}
          $sizeConfined={sizeConfined}
          $sizeWide={sizeWide}
        />
      </S.Item>
      <S.Label
        htmlFor={value}
        $size={size}
        $sizeConfined={sizeConfined}
        $sizeWide={sizeWide}
      >
        {label}
      </S.Label>
    </S.ItemContainer>
  );
};
