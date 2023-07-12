'use client';

import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from 'react-hook-form';

import { FormField } from './form-field';
import { FormFieldProps } from './form-field.types';

type OmittedFormFieldProps = Omit<
  FormFieldProps,
  'onChange' | 'onBlur' | 'defaultValue'
>;

export type RHFFormFieldProps<FormValues extends FieldValues> =
  OmittedFormFieldProps & {
    control: Control<FormValues>;
    name: Path<FormValues>;
    rules?: RegisterOptions;
    defaultValue?: PathValue<FormValues, Path<FormValues>> | undefined;
  };

export const RHFFormField = <FormValues extends FieldValues>({
  control,
  rules,
  name,
  defaultValue,
  ...props
}: RHFFormFieldProps<FormValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <FormField
          {...field}
          {...props}
          isError={props.isError ?? Boolean(error)}
          helperText={error ? error.message : props?.helperText}
        />
      )}
    />
  );
};
