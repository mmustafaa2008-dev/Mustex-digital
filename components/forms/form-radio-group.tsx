"use client";

import type { ReactNode } from "react";
import {
  useFormContext,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

import { FormField, FormFieldWrapper } from "./form-field";

export type FormRadioOption = {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
};

export type FormRadioGroupProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  label?: ReactNode;
  description?: ReactNode;
  required?: boolean;
  optional?: boolean;
  options: FormRadioOption[];
  disabled?: boolean;
  className?: string;
  orientation?: "vertical" | "horizontal";
};

function FormRadioGroup<TFieldValues extends FieldValues>({
  name,
  label,
  description,
  required,
  optional,
  options,
  disabled,
  className,
  orientation = "vertical",
}: FormRadioGroupProps<TFieldValues>) {
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
          className={className}
        >
          {(a11y) => (
            <RadioGroup
              {...a11y}
              value={field.value}
              onValueChange={field.onChange}
              disabled={disabled}
              aria-invalid={fieldState.invalid || undefined}
              className={cn(
                orientation === "horizontal" &&
                  "flex flex-wrap items-center gap-4",
              )}
            >
              {options.map((option) => {
                const optionId = `${a11y.id}-${option.value}`;
                return (
                  <div
                    key={option.value}
                    className="flex items-start gap-3"
                  >
                    <RadioGroupItem
                      id={optionId}
                      value={option.value}
                      disabled={option.disabled || disabled}
                    />
                    <div className="flex flex-col gap-0.5">
                      <Label
                        htmlFor={optionId}
                        className="font-normal leading-none"
                      >
                        {option.label}
                      </Label>
                      {option.description ? (
                        <p className="text-xs text-[var(--ds-foreground-muted)]">
                          {option.description}
                        </p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </RadioGroup>
          )}
        </FormFieldWrapper>
      )}
    />
  );
}

export { FormRadioGroup };
