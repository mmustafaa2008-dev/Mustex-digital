"use client";

import type { ReactNode } from "react";
import {
  useFormContext,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "./form-field";

function CheckboxControl({
  checked,
  onCheckedChange,
  disabled,
  name,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  name: string;
}) {
  const { formItemId, formDescriptionId, formMessageId, error } = useFormField();

  return (
    <Checkbox
      id={formItemId}
      name={name}
      checked={checked}
      disabled={disabled}
      onCheckedChange={(value) => onCheckedChange(value === true)}
      aria-invalid={error ? true : undefined}
      aria-describedby={
        error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId
      }
    />
  );
}

export type FormCheckboxProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
  className?: string;
};

function FormCheckbox<TFieldValues extends FieldValues>({
  name,
  label,
  description,
  disabled,
  className,
}: FormCheckboxProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("gap-2", className)}>
          <div className="flex items-start gap-3">
            <CheckboxControl
              name={field.name}
              checked={Boolean(field.value)}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
            <div className="flex flex-col gap-1">
              <FormLabel className="font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
                {label}
              </FormLabel>
              {description ? (
                <FormDescription>{description}</FormDescription>
              ) : null}
              <FormMessage />
            </div>
          </div>
        </FormItem>
      )}
    />
  );
}

export { FormCheckbox };
