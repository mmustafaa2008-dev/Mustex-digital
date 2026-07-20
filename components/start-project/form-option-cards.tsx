"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import {
  useFormContext,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import {
  FormField,
  FormFieldWrapper,
} from "@/components/forms/form-field";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { fadeUp, withReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type FormOptionCard = {
  value: string;
  label: ReactNode;
  description?: ReactNode;
};

export type FormOptionCardsProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  label?: ReactNode;
  description?: ReactNode;
  required?: boolean;
  options: readonly FormOptionCard[];
  columns?: 1 | 2 | 3;
  className?: string;
};

/**
 * Premium selectable option cards wired to RHF + RadioGroup.
 */
function FormOptionCards<TFieldValues extends FieldValues>({
  name,
  label,
  description,
  required,
  options,
  columns = 1,
  className,
}: FormOptionCardsProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();
  const prefersReducedMotion = useReducedMotion();
  const itemVariants = withReducedMotion(fadeUp, prefersReducedMotion);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormFieldWrapper
          label={label}
          description={description}
          required={required}
          className={className}
        >
          {(a11y) => (
            <RadioGroup
              {...a11y}
              value={field.value}
              onValueChange={field.onChange}
              aria-invalid={fieldState.invalid || undefined}
              className={cn(
                "grid gap-3",
                columns === 2 && "sm:grid-cols-2",
                columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
              )}
            >
              {options.map((option, index) => {
                const optionId = `${a11y.id}-${option.value}`;
                const selected = field.value === option.value;

                return (
                  <motion.div
                    key={option.value}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: prefersReducedMotion ? 0 : index * 0.04 }}
                  >
                    <Label
                      htmlFor={optionId}
                      className={cn(
                        "group relative flex cursor-pointer items-start gap-3 rounded-[var(--ds-radius-lg)] border p-4",
                        "bg-[var(--glass-panel-bg)] backdrop-blur-[var(--glass-panel-blur)]",
                        "transition-[border-color,box-shadow,background-color,transform] duration-200",
                        "hover:-translate-y-0.5 hover:border-[var(--ds-border-strong)] hover:shadow-[var(--ds-shadow-card)]",
                        "has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[var(--ds-ring)]",
                        selected
                          ? "border-[var(--ds-primary)] shadow-[var(--ds-shadow-glow-sm)]"
                          : "border-[var(--ds-border)]",
                      )}
                    >
                      <RadioGroupItem
                        id={optionId}
                        value={option.value}
                        className="mt-0.5"
                      />
                      <span className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-[var(--ds-foreground)]">
                          {option.label}
                        </span>
                        {option.description ? (
                          <span className="text-xs text-[var(--ds-foreground-muted)]">
                            {option.description}
                          </span>
                        ) : null}
                      </span>
                    </Label>
                  </motion.div>
                );
              })}
            </RadioGroup>
          )}
        </FormFieldWrapper>
      )}
    />
  );
}

export { FormOptionCards };
