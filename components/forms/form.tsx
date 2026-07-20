"use client";

import type { ComponentProps } from "react";
import {
  FormProvider,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";

import { cn } from "@/lib/utils";

export type FormProps<TFieldValues extends FieldValues> = Omit<
  ComponentProps<"form">,
  "onSubmit"
> & {
  form: UseFormReturn<TFieldValues>;
  onSubmit: Parameters<UseFormReturn<TFieldValues>["handleSubmit"]>[0];
  onSubmitInvalid?: Parameters<UseFormReturn<TFieldValues>["handleSubmit"]>[1];
};

/**
 * Form provider shell — wires RHF context + accessible native form element.
 */
function Form<TFieldValues extends FieldValues>({
  form,
  onSubmit,
  onSubmitInvalid,
  className,
  children,
  noValidate = true,
  ...props
}: FormProps<TFieldValues>) {
  return (
    <FormProvider {...form}>
      <form
        data-slot="form"
        noValidate={noValidate}
        className={cn("flex flex-col gap-5", className)}
        onSubmit={form.handleSubmit(onSubmit, onSubmitInvalid)}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
}

export { Form };
