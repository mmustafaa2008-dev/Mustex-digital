import type { ElementType, HTMLAttributes } from "react";

import { resolveStackClass, type LayoutSpace } from "@/lib/layout";
import { cn } from "@/lib/utils";

export type StackProps = HTMLAttributes<HTMLElement> & {
  /** Vertical rhythm between children */
  space?: LayoutSpace;
  as?: ElementType;
};

/**
 * Vertical stack using space-y utilities.
 */
export function Stack({
  className,
  space = "md",
  as: Comp = "div",
  ...props
}: StackProps) {
  // `Comp` is a polymorphic `ElementType`; TypeScript can't resolve JSX
  // attribute types against that broad a union, so it's narrowed to a
  // single concrete tag here purely for type-checking. The actual runtime
  // value of `Comp` (and therefore the rendered tag) is unaffected.
  const Component = Comp as "div";
  return (
    <Component
      data-slot="stack"
      className={cn("flex flex-col", resolveStackClass(space), className)}
      {...props}
    />
  );
}
