import { forwardRef, useEffect, useState } from 'react';

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
    const [flattenedOptions, setFlattenedOptions] = useState<
      Option[] | undefined
    >(
      options
        ?.map((option) => {
          if (isOption(option)) {
            return option;
          } else {
            return option.options;
          }
        })
        .flat()
    );

    useEffect(() => {
      setFlattenedOptions(
        options
          ?.map((option) => {
            if (isOption(option)) {
              return option;
            } else {
              return option.options;
            }
          })
          .flat()
      );
    }, [options]);

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
        ? (value as string[])?.map((v) => flattenedOptions?.find(findOption(v)))
        : flattenedOptions?.find(findOption(findValue as string));
    };

    return (
      <Styled.SelectContainer $disabled={isDisabled || !options?.length}>
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
          options={options ?? [{ label: 'Loading options', value: 'loading' }]}
          onChange={onChangeHandler}
          value={findSelectedOptions(value) ?? 'loading'}
          defaultValue={findSelectedOptions(defaultValue) ?? 'loading'}
          unstyled={true}
          isClearable={isMulti ? true : false}
          closeMenuOnSelect={isMulti ? false : true}
          isMulti={isMulti}
          isDisabled={isDisabled || !options?.length}
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
