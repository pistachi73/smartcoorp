import { forwardRef, useState } from 'react';

import { Styled } from './select.styles';
import { Option, SelectProps, isOption } from './select.types';

export const Select = forwardRef<any, SelectProps>(
  (
    {
      placeholder = '',
      value,
      label,
      defaultValue,
      helperText,
      isError = false,
      isDisabled = false,
      size = 'medium',
      sizeConfined,
      sizeWide,
      options,
      isMulti = false,
      onChange,
      menuPlacement = 'bottom',
    },
    ref
  ) => {
    const [flattenedOptions] = useState(
      options
        .map((option) => {
          if (isOption(option)) {
            return option;
          } else {
            return option.options;
          }
        })
        .flat()
    );

    const onChangeHandler = (val: any, actionMeta: any) => {
      if (!onChange || !val) return;

      if (isMulti) {
        onChange(
          val.map((val: any) => val.value),
          actionMeta
        );
      } else {
        onChange(val.value, actionMeta);
      }
    };

    const findOption = (optionValue: string) => (option: Option) =>
      option.value === optionValue;

    const findSelectedOptions = (findValue?: string | string[]) => {
      if (!findValue) return;

      return isMulti
        ? (value as string[])?.map((v) => flattenedOptions.find(findOption(v)))
        : flattenedOptions.find(findOption(findValue as string));
    };

    return (
      <Styled.SelectContainer $disabled={isDisabled}>
        {label && (
          <Styled.SingleSelectLabel
            $size={size}
            $sizeConfined={sizeConfined}
            $sizeWide={sizeWide}
          >
            {label}
          </Styled.SingleSelectLabel>
        )}
        <Styled.StyledReactSelect
          ref={ref}
          classNamePrefix={'react-select'}
          placeholder={placeholder}
          options={options}
          onChange={onChangeHandler}
          value={findSelectedOptions(value)}
          defaultValue={findSelectedOptions(defaultValue)}
          unstyled={true}
          isClearable={isMulti ? true : false}
          closeMenuOnSelect={isMulti ? false : true}
          isMulti={isMulti}
          isDisabled={isDisabled}
          menuPlacement={menuPlacement}
          $error={isError}
          $size={size}
          $sizeConfined={sizeConfined}
          $sizeWide={sizeWide}
        />
        {helperText && (
          <Styled.HelperText
            $error={isError}
            $size={size}
            $sizeConfined={sizeConfined}
            $sizeWide={sizeWide}
          >
            {helperText}
          </Styled.HelperText>
        )}
      </Styled.SelectContainer>
    );
  }
);