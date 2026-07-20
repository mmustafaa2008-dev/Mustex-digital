"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  type DefaultValues,
  type FieldValues,
  type Resolver,
  type UseFormProps,
  type UseFormReturn,
} from "react-hook-form";
import type { z } from "zod";

type ZodFormValues<TSchema extends z.ZodType> = z.output<TSchema> & FieldValues;

export type UseZodFormProps<TSchema extends z.ZodType> = Omit<
  UseFormProps<ZodFormValues<TSchema>>,
  "resolver"
> & {
  schema: TSchema;
  defaultValues?: DefaultValues<ZodFormValues<TSchema>>;
};

/**
 * React Hook Form + Zod resolver helper (Zod v4 compatible).
 */
export function useZodForm<TSchema extends z.ZodType>(
  props: UseZodFormProps<TSchema>,
): UseFormReturn<ZodFormValues<TSchema>> {
  const { schema, ...formProps } = props;

  return useForm<ZodFormValues<TSchema>>({
    ...formProps,
    resolver: zodResolver(
      schema as never,
    ) as Resolver<ZodFormValues<TSchema>>,
  });
}
