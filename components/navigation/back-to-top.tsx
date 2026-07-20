"use client";

import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { IconButton } from "@/components/ui/icon-button";
import { useNavbarState } from "@/hooks/use-navbar-state";
import { createIconProps } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type BackToTopProps = {
  /** Show after scrolling past this many pixels */
  threshold?: number;
  className?: string;
  label?: string;
};

/**
 * Floating back-to-top control.
 */
function BackToTop({
  threshold = 400,
  className,
  label = "Back to top",
}: BackToTopProps) {
  const { scrollY } = useNavbarState({ threshold });
  const visible = scrollY > threshold;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          data-slot="back-to-top"
          className={cn("fixed right-4 bottom-4 z-50 md:right-6 md:bottom-6", className)}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
        >
          <IconButton
            label={label}
            variant="secondary"
            size="md"
            className="shadow-[var(--ds-shadow-md)]"
            icon={<ArrowUp {...createIconProps({ size: "md", decorative: true })} />}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export { BackToTop };
