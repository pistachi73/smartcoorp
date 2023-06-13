import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';

import { Checkbox } from './checkbox';
import { CheckboxProps } from './checkbox.types';

type OmittedCheckboxdProps = Omit<CheckboxProps, 'checked' | 'onChange'>;

export type RHFCheckboxProps<FormValues extends FieldValues> =
  OmittedCheckboxdProps & {
    control: Control<FormValues>;
    name: Path<FormValues>;
    rules?: RegisterOptions;
  };

export const RHFCheckbox = <FormValues extends FieldValues>({
  control,
  rules,
  name,
  ...props
}: RHFCheckboxProps<FormValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={(props?.defaultValue ?? false) as any}
      render={({ field: { ref, value, ...field } }) => (
        <Checkbox
          checked={value}
          defaultValue={props.defaultValue}
          label={props?.label}
          isDisabled={props?.isDisabled}
          size={props?.size}
          sizeConfined={props?.sizeConfined}
          sizeWide={props?.sizeWide}
          {...field}
        />
      )}
    ></Controller>
  );
};
