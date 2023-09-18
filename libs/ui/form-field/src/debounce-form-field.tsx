'use client';

import debounce from 'lodash.debounce';
import { useMemo, useState } from 'react';

import { FormField } from './form-field';
import { FormFieldProps } from './form-field.types';

export type DebounceFormFieldProps = FormFieldProps & {
  debounceTime?: number;
};

export const DebounceFormField: React.FC<DebounceFormFieldProps> = ({
  debounceTime = 500,
  onChange,
  value,
  ...props
}) => {
  const [inputValue, setInputValue] = useState<FormFieldProps['value']>(value);

  const debouncedOnChange = useMemo(() => {
    if (!onChange) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {};
    }
    return debounce(onChange, debounceTime);
  }, [debounceTime, onChange]);

  const handleDebouncedOnChange = (value: string | number) => {
    setInputValue(value);
    debouncedOnChange(value);
  };

  return (
    <FormField
      {...props}
      value={inputValue}
      onChange={handleDebouncedOnChange}
    />
  );
};
