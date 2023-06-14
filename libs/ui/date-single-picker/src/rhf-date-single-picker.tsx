import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';

import { DateSinglePicker } from './date-single-picker';
import { DateSinglePickerProps } from './date-single-picker.types';

type OmittedDateSinglePickerProps = Omit<
  DateSinglePickerProps,
  'selected' | 'onSelect'
>;

export type RHFDateSinglePickerProps<FormValues extends FieldValues> =
  OmittedDateSinglePickerProps & {
    control: Control<FormValues>;
    name: Path<FormValues>;
    rules?: RegisterOptions;
    defaultValue?: Date;
  };

export const RHFDateSinglePicker = <FormValues extends FieldValues>({
  control,
  name,
  rules,
  defaultValue,
  ...props
}: RHFDateSinglePickerProps<FormValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue as any}
      render={({
        field: { ref, onChange, value, ...field },
        fieldState: { error },
      }) => (
        <DateSinglePicker
          selected={value}
          onSelect={onChange}
          {...field}
          {...props}
          isError={props.isError ?? Boolean(error)}
        />
      )}
    />
  );
};
