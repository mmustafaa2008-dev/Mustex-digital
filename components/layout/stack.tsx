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
  return (
    <Comp
      data-slot="stack"
      className={cn("flex flex-col", resolveStackClass(space), className)}
      {...props}
    />
  );
}
