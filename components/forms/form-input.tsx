"use client";

import type { ReactNode } from "react";
import {
  useFormContext,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { Input, type InputProps } from "@/components/ui/input";

import { FormField, FormFieldWrapper } from "./form-field";

export type FormInputProps<TFieldValues extends FieldValues> = Omit<
  InputProps,
  "name" | "defaultValue" | "value"
> & {
  name: FieldPath<TFieldValues>;
  label?: ReactNode;
  description?: ReactNode;
  required?: boolean;
  optional?: boolean;
};

function FormInput<TFieldValues extends FieldValues>({
  name,
  label,
  description,
  required,
  optional,
  ...inputProps
}: FormInputProps<TFieldValues>) {
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
            <Input
              {...field}
              {...inputProps}
              {...a11y}
              aria-invalid={fieldState.invalid || undefined}
              value={field.value ?? ""}
            />
          )}
        </FormFieldWrapper>
      )}
    />
  );
}

export { FormInput };
