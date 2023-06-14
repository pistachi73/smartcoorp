import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from 'react-hook-form';

import { RadioGroup } from './radio-group';
import { RadioGroupProps } from './radio-group.types';

type OmittedRadioGroupProps = Omit<
  RadioGroupProps,
  'value' | 'onChange' | 'isError'
>;

export type RHFRadioGroupProps<FormValues extends FieldValues> =
  OmittedRadioGroupProps & {
    control: Control<FormValues>;
    name: Path<FormValues>;
    rules?: RegisterOptions;
    defaultValue?: PathValue<FormValues, Path<FormValues>>;
  };

export const RHFRadioGroup = <FormValues extends FieldValues>({
  control,
  rules,
  name,
  defaultValue,
  ...props
}: RHFRadioGroupProps<FormValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <RadioGroup {...field} {...props} isError={!!error} />
      )}
    ></Controller>
  );
};
