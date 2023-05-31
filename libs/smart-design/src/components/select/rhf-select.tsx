import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from 'react-hook-form';

import { Select } from './select';
import { SelectProps } from './select.types';

type OmittedFormFieldProps = Omit<
  SelectProps,
  'onChange' | 'onBlur' | 'isError' | 'value' | 'defaultValue'
>;

type RHFSelectProps<FormValues extends FieldValues> = OmittedFormFieldProps & {
  control: Control<FormValues>;
  name: Path<FormValues>;
  rules?: RegisterOptions;
  defaultValue?: PathValue<FormValues, Path<FormValues>> | undefined;
};

export const RHFSelect = <FormValues extends FieldValues>({
  control,
  rules,
  name,
  defaultValue,
  ...props
}: RHFSelectProps<FormValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <Select
          {...field}
          {...props}
          isError={Boolean(error)}
          helperText={error ? error.message : props?.helperText}
        />
      )}
    />
  );
};
