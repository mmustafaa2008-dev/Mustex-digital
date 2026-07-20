"use client";

import { Menu } from "@base-ui/react/menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

import { createIconProps } from "@/lib/icons";
import { uiFocusRing, uiTransition } from "@/lib/ui";
import { cn } from "@/lib/utils";

import type { NavDropdownItem } from "./types";

export type NavDropdownProps = {
  item: NavDropdownItem;
  className?: string;
};

/**
 * Desktop navigation dropdown menu.
 */
function NavDropdown({ item, className }: NavDropdownProps) {
  return (
    <Menu.Root>
      <Menu.Trigger
        data-slot="nav-dropdown-trigger"
        className={cn(
          "inline-flex items-center gap-1 rounded-[var(--ds-radius-xs)] px-3 py-2",
          "text-sm font-medium text-[var(--ds-foreground-subtle)]",
          "hover:text-[var(--ds-foreground)] data-[popup-open]:text-[var(--ds-foreground)]",
          uiTransition,
          uiFocusRing,
          className,
        )}
      >
        {item.label}
        <ChevronDown
          {...createIconProps({ size: "xs", decorative: true })}
          className="opacity-70 transition-transform duration-[var(--duration-fast)] data-[popup-open]:rotate-180"
        />
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner sideOffset={8} align="start">
          <Menu.Popup
            data-slot="nav-dropdown"
            className={cn(
              "z-50 min-w-48 origin-[var(--transform-origin)] rounded-[var(--ds-radius-md)]",
              "border border-[var(--ds-border)] bg-[var(--glass-panel-bg-strong)] p-1.5",
              "shadow-[var(--ds-shadow-lg),var(--ds-shadow-glow-sm)] outline-none",
              "backdrop-blur-[var(--glass-panel-blur)]",
              "[-webkit-backdrop-filter:blur(var(--glass-panel-blur))]",
              "transition-[transform,scale,opacity,filter]",
              "data-[ending-style]:translate-y-1 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[ending-style]:blur-[2px]",
              "data-[starting-style]:translate-y-1 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[starting-style]:blur-[2px]",
            )}
          >
            {item.items.map((link) => (
              <Menu.LinkItem
                key={link.href}
                closeOnClick
                render={<Link href={link.href} />}
                className={cn(
                  "flex w-full flex-col items-start gap-0.5 rounded-[var(--ds-radius-sm)] px-3 py-2",
                  "text-sm text-[var(--ds-foreground)] outline-none",
                  "data-[highlighted]:bg-[var(--ds-muted)]",
                  uiFocusRing,
                )}
              >
                <span className="font-medium">{link.label}</span>
                {link.description ? (
                  <span className="text-xs font-normal text-[var(--ds-foreground-muted)]">
                    {link.description}
                  </span>
                ) : null}
              </Menu.LinkItem>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

export { NavDropdown };
