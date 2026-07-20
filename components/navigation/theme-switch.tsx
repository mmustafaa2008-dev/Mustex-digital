"use client";

import { Moon, Sun } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import { useTheme, type ThemeMode } from "@/hooks/use-theme";
import { createIconProps } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type ThemeSwitchProps = {
  className?: string;
  defaultTheme?: ThemeMode;
  lightLabel: string;
  darkLabel: string;
};

/**
 * Theme switch foundation — toggles dark / light document theme.
 * Labels come from the content layer.
 */
function ThemeSwitch({
  className,
  defaultTheme = "dark",
  lightLabel,
  darkLabel,
}: ThemeSwitchProps) {
  const { theme, toggleTheme, mounted } = useTheme(defaultTheme);

  return (
    <IconButton
      data-slot="theme-switch"
      label={theme === "dark" ? lightLabel : darkLabel}
      variant="ghost"
      size="md"
      className={cn(className)}
      disabled={!mounted}
      onClick={toggleTheme}
      icon={
        theme === "dark" ? (
          <Sun {...createIconProps({ size: "md", decorative: true })} />
        ) : (
          <Moon {...createIconProps({ size: "md", decorative: true })} />
        )
      }
    />
  );
}

export { ThemeSwitch };
