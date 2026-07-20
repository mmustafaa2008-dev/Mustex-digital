"use client";

import { useFormContext } from "react-hook-form";

import { Button, type ButtonProps } from "@/components/ui/button";

export type FormSubmitButtonProps = Omit<
  ButtonProps,
  "type" | "loading"
> & {
  /** Show loading when form is submitting */
  loading?: boolean;
  /** Disable while invalid (after submit attempt) */
  disableWhenInvalid?: boolean;
};

/**
 * Submit button bound to RHF form state (loading / disabled).
 */
function FormSubmitButton({
  children = "Submit",
  loading,
  disabled,
  disableWhenInvalid = false,
  ...props
}: FormSubmitButtonProps) {
  const {
    formState: { isSubmitting, isValid, isSubmitted },
  } = useFormContext();

  const isLoading = Boolean(loading || isSubmitting);
  const isDisabled =
    Boolean(disabled) ||
    isLoading ||
    (disableWhenInvalid && isSubmitted && !isValid);

  return (
    <Button
      type="submit"
      data-slot="form-submit-button"
      loading={isLoading}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </Button>
  );
}

export { FormSubmitButton };
