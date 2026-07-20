"use client";

import {
  createContext,
  useContext,
  useId,
  type ComponentProps,
  type ReactNode,
} from "react";
import {
  Controller,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue | null>(null);

function useFormField() {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext) {
    throw new Error("useFormField must be used within <FormField>");
  }

  if (!itemContext) {
    throw new Error("useFormField must be used within <FormItem>");
  }

  const fieldState = getFieldState(fieldContext.name, formState);

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
}

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

function FormItem({ className, ...props }: ComponentProps<"div">) {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("flex flex-col gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

function FormLabel({
  className,
  ...props
}: ComponentProps<typeof Label>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      htmlFor={formItemId}
      className={cn(error && "text-[var(--ds-error-text)]", className)}
      {...props}
    />
  );
}

function FormControl({
  children,
}: {
  children: (props: {
    id: string;
    "aria-describedby"?: string;
    "aria-invalid"?: boolean;
    "aria-errormessage"?: string;
  }) => ReactNode;
}) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return children({
    id: formItemId,
    "aria-describedby": error
      ? `${formDescriptionId} ${formMessageId}`
      : formDescriptionId,
    "aria-invalid": error ? true : undefined,
    "aria-errormessage": error ? formMessageId : undefined,
  });
}

function FormDescription({ className, ...props }: ComponentProps<"p">) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn(
        "text-xs leading-[var(--leading-body)] text-[var(--ds-foreground-muted)]",
        className,
      )}
      {...props}
    />
  );
}

function FormMessage({ className, children, ...props }: ComponentProps<"p">) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error.message ?? children) : children;

  if (!body) return null;

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      role="alert"
      className={cn(
        "text-xs font-medium text-[var(--ds-error-text)]",
        className,
      )}
      {...props}
    >
      {body}
    </p>
  );
}

/**
 * Reusable field wrapper — label, control slot, description, error.
 */
function FormFieldWrapper({
  className,
  label,
  description,
  required,
  optional,
  children,
}: {
  className?: string;
  label?: ReactNode;
  description?: ReactNode;
  required?: boolean;
  optional?: boolean;
  children: (controlProps: {
    id: string;
    "aria-describedby"?: string;
    "aria-invalid"?: boolean;
    "aria-errormessage"?: string;
  }) => ReactNode;
}) {
  return (
    <FormItem className={className}>
      {label ? (
        <FormLabel required={required} optional={optional}>
          {label}
        </FormLabel>
      ) : null}
      <FormControl>{children}</FormControl>
      {description ? <FormDescription>{description}</FormDescription> : null}
      <FormMessage />
    </FormItem>
  );
}

export {
  FormControl,
  FormDescription,
  FormField,
  FormFieldWrapper,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
};
