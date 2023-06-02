import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from 'react-hook-form';

import { Checkbox } from './checkbox';
import { CheckboxProps } from './checkbox.types';

type OmittedFormFieldProps = Omit<CheckboxProps, 'value' | 'onChange'>;

export type RHFCheckboxProps<FormValues extends FieldValues> =
  OmittedFormFieldProps & {
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
      render={({ field: { ref, ...field } }) => (
        <Checkbox
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
