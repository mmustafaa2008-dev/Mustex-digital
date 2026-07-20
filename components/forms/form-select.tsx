"use client";

import type { ReactNode } from "react";
import {
  useFormContext,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { Select, type SelectProps } from "@/components/ui/select";

import { FormField, FormFieldWrapper } from "./form-field";

export type FormSelectProps<TFieldValues extends FieldValues> = Omit<
  SelectProps,
  "name" | "defaultValue" | "value" | "onValueChange"
> & {
  name: FieldPath<TFieldValues>;
  label?: ReactNode;
  description?: ReactNode;
  required?: boolean;
  optional?: boolean;
};

function FormSelect<TFieldValues extends FieldValues>({
  name,
  label,
  description,
  required,
  optional,
  ...selectProps
}: FormSelectProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormFieldWrapper
          label={label}
          description={description}
          required={required}
          optional={optional}
        >
          {(a11y) => (
            <Select
              {...selectProps}
              {...a11y}
              name={field.name}
              value={field.value ?? null}
              onValueChange={(value) => field.onChange(value)}
              aria-invalid={fieldState.invalid || undefined}
            />
          )}
        </FormFieldWrapper>
      )}
    />
  );
}

export { FormSelect };
