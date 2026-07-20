"use client";

import type { ReactNode } from "react";
import {
  useFormContext,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { Textarea, type TextareaProps } from "@/components/ui/textarea";

import { FormField, FormFieldWrapper } from "./form-field";

export type FormTextareaProps<TFieldValues extends FieldValues> = Omit<
  TextareaProps,
  "name" | "defaultValue" | "value"
> & {
  name: FieldPath<TFieldValues>;
  label?: ReactNode;
  description?: ReactNode;
  required?: boolean;
  optional?: boolean;
};

function FormTextarea<TFieldValues extends FieldValues>({
  name,
  label,
  description,
  required,
  optional,
  ...textareaProps
}: FormTextareaProps<TFieldValues>) {
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
            <Textarea
              {...field}
              {...textareaProps}
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

export { FormTextarea };
