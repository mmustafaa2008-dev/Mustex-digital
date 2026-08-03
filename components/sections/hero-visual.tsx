"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Activity,
  Bot,
  Cloud,
  Database,
  GitBranch,
  Server,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import {
  useCallback,
  useMemo,
  useRef,
  type CSSProperties,
  type MouseEvent,
} from "react";

import { createIconProps } from "@/lib/icons";
import {
  createFloatingEffect,
  createStaggerVariants,
  fadeUp,
  floatingPresets,
  withReducedMotion,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

export type HeroVisualProps = {
  ariaLabel: string;
  className?: string;
  style?: CSSProperties;
};

const springConfig = { stiffness: 70, damping: 18, mass: 0.35 };

const PARTICLES = [
  { x: "8%", y: "18%", s: 2, d: 7 },
  { x: "18%", y: "72%", s: 1.5, d: 9 },
  { x: "78%", y: "14%", s: 2, d: 8 },
  { x: "88%", y: "58%", s: 1.5, d: 6.5 },
  { x: "62%", y: "82%", s: 2, d: 10 },
  { x: "42%", y: "8%", s: 1.5, d: 7.5 },
  { x: "92%", y: "34%", s: 1.5, d: 8.5 },
  { x: "12%", y: "48%", s: 2, d: 9.5 },
  { x: "52%", y: "90%", s: 1.5, d: 7 },
  { x: "70%", y: "40%", s: 1.5, d: 11 },
  { x: "28%", y: "28%", s: 1.5, d: 8.2 },
  { x: "55%", y: "62%", s: 2, d: 9.8 },
  { x: "84%", y: "76%", s: 1.5, d: 7.2 },
  { x: "35%", y: "88%", s: 1.5, d: 10.4 },
  { x: "6%", y: "62%", s: 2, d: 8.8 },
] as const;

const CODE_LINES = [
  { w: "72%", indent: false },
  { w: "58%", indent: true },
  { w: "84%", indent: false },
  { w: "46%", indent: true },
  { w: "68%", indent: true },
  { w: "52%", indent: false },
] as const;

const glassPanel = cn(
  "border border-white/12 bg-[var(--glass-panel-bg)]",
  "shadow-[0_12px_40px_rgb(0_0_0_/_0.35),var(--ds-shadow-glow-sm)]",
  "backdrop-blur-[var(--glass-panel-blur)]",
  "[-webkit-backdrop-filter:blur(var(--glass-panel-blur))]",
);

function FloatingChip({
  icon: Icon,
  label,
  value,
  className,
  float,
  delay = 0,
  rotate = 0,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  className?: string;
  float?: ReturnType<typeof createFloatingEffect>;
  delay?: number;
  rotate?: number;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        "absolute z-30 flex items-center gap-2.5 rounded-[var(--ds-radius-lg)] px-3 py-2.5",
        glassPanel,
        className,
      )}
      style={{ rotate }}
      animate={float?.animate}
      transition={{ ...float?.transition, delay }}
      whileHover={{ scale: 1.03, y: -2 }}
    >
      <span className="inline-flex size-8 items-center justify-center rounded-[var(--ds-radius-md)] border border-[var(--ds-primary-text)]/25 bg-[var(--ds-primary-muted)] text-[var(--ds-primary-text)]">
        <Icon {...createIconProps({ size: "sm", decorative: true })} />
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span className="text-[0.625rem] tracking-[0.14em] text-[var(--ds-foreground-muted)] uppercase">
          {label}
        </span>
        <span className="mt-1 text-sm font-semibold tabular-nums text-[var(--ds-foreground)]">
          {value}
        </span>
      </span>
    </motion.div>
  );
}

function MiniChart({ reduced }: { reduced: boolean }) {
  const bars = [42, 68, 54, 82, 58, 74, 48, 88, 62];

  return (
    <div className="flex h-10 items-end gap-0.5">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="w-1 rounded-full bg-[var(--ds-primary-text)]/75"
          style={{ boxShadow: "0 0 8px rgb(37 99 235 / 0.35)", originY: 1 }}
          initial={reduced ? { height: `${h}%` } : { height: "10%" }}
          animate={
            reduced
              ? { height: `${h}%` }
              : { height: [`${h * 0.5}%`, `${h}%`, `${h * 0.65}%`] }
          }
          transition={{
            duration: 2.2 + (i % 3) * 0.3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay: i * 0.06,
          }}
        />
      ))}
    </div>
  );
}

function CodeEditorPanel({
  reduced,
  float,
}: {
  reduced: boolean;
  float?: ReturnType<typeof createFloatingEffect>;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        "relative z-20 w-full max-w-[17rem] rounded-[var(--ds-radius-xl)] p-3.5 sm:max-w-[19rem] sm:p-4",
        glassPanel,
        "shadow-[0_24px_80px_rgb(0_0_0_/_0.45),var(--ds-shadow-glow-md)]",
      )}
      animate={float?.animate}
      transition={float?.transition}
      whileHover={reduced ? undefined : { y: -4, rotate: -0.5 }}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-red-400/80" />
          <span className="size-2 rounded-full bg-amber-400/80" />
          <span className="size-2 rounded-full bg-emerald-400/80" />
        </div>
        <span className="text-[0.5625rem] tracking-[0.12em] text-[var(--ds-foreground-muted)] uppercase">
          api.ts
        </span>
      </div>
      <div className="space-y-2 rounded-[var(--ds-radius-md)] border border-white/8 bg-black/30 p-3 font-mono">
        {CODE_LINES.map((line, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2"
            initial={reduced ? false : { opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
          >
            <span className="w-3 text-[0.5625rem] text-[var(--ds-foreground-muted)]/50">
              {i + 1}
            </span>
            <span
              className={cn(
                "h-1.5 rounded-full bg-[var(--ds-primary-text)]/60",
                line.indent && "ml-3",
              )}
              style={{ width: line.w }}
            />
          </motion.div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2 py-0.5 text-[0.5625rem] text-emerald-300">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          Deployed
        </span>
        <span className="text-[0.5625rem] text-[var(--ds-foreground-muted)]">
          12ms latency
        </span>
      </div>
    </motion.div>
  );
}

function ServerCard({
  reduced,
  className,
  float,
  delay = 0,
}: {
  reduced: boolean;
  className?: string;
  float?: ReturnType<typeof createFloatingEffect>;
  delay?: number;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        "absolute z-25 rounded-[var(--ds-radius-lg)] p-3",
        glassPanel,
        className,
      )}
      animate={float?.animate}
      transition={{ ...float?.transition, delay }}
      whileHover={reduced ? undefined : { scale: 1.04, y: -3 }}
    >
      <div className="mb-2 flex items-center gap-2">
        <Server
          {...createIconProps({ size: "xs", decorative: true })}
          className="text-[var(--ds-primary-text)]"
        />
        <span className="text-[0.625rem] font-semibold text-[var(--ds-foreground)]">
          Edge Node
        </span>
      </div>
      <div className="space-y-1.5">
        {[0.85, 0.62, 0.74].map((w, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-1.5"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.1 }}
          >
            <span className="size-1 rounded-full bg-emerald-400 shadow-[0_0_6px_rgb(52_211_153_/_0.8)]" />
            <span
              className="h-1 rounded-full bg-white/15"
              style={{ width: `${w * 100}%` }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function DatabasePanel({
  reduced,
  className,
  float,
}: {
  reduced: boolean;
  className?: string;
  float?: ReturnType<typeof createFloatingEffect>;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        "absolute z-25 flex flex-col items-center rounded-[var(--ds-radius-lg)] p-3",
        glassPanel,
        className,
      )}
      animate={float?.animate}
      transition={float?.transition}
      whileHover={reduced ? undefined : { scale: 1.04 }}
    >
      <Database
        {...createIconProps({ size: "sm", decorative: true })}
        className="mb-2 text-[var(--ds-primary-text)]"
      />
      <div className="flex flex-col items-center gap-1">
        {[1, 0.82, 0.64].map((scale, i) => (
          <motion.div
            key={i}
            className="h-2 rounded-sm border border-[var(--ds-primary-text)]/30 bg-[var(--ds-primary-muted)]"
            style={{ width: `${scale * 3.5}rem` }}
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.08 }}
          />
        ))}
      </div>
      <span className="mt-2 text-[0.5625rem] tracking-[0.1em] text-[var(--ds-foreground-muted)] uppercase">
        PostgreSQL
      </span>
    </motion.div>
  );
}

function AiNodeCluster({ reduced }: { reduced: boolean }) {
  const nodes = [
    { x: 50, y: 20 },
    { x: 20, y: 55 },
    { x: 80, y: 55 },
    { x: 50, y: 85 },
  ];

  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        "absolute z-25 rounded-[var(--ds-radius-lg)] p-3",
        glassPanel,
        "top-[4%] left-[2%] hidden w-[5.5rem] sm:block",
      )}
      whileHover={reduced ? undefined : { scale: 1.05 }}
    >
      <div className="mb-1.5 flex items-center gap-1.5">
        <Bot
          {...createIconProps({ size: "xs", decorative: true })}
          className="text-[var(--ds-primary-text)]"
        />
        <span className="text-[0.5625rem] font-semibold text-[var(--ds-foreground)]">
          AI Core
        </span>
      </div>
      <svg viewBox="0 0 100 100" className="h-14 w-full">
        {nodes.slice(0, 3).map((from, i) => {
          const to = nodes[(i + 1) % 3];
          return (
            <motion.line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="rgb(96 165 250 / 0.35)"
              strokeWidth="1"
              initial={reduced ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.8 }}
            />
          );
        })}
        {nodes.map((node, i) => (
          <motion.circle
            key={i}
            cx={node.x}
            cy={node.y}
            r={i === 0 ? 5 : 3.5}
            fill={i === 0 ? "#60a5fa" : "rgb(96 165 250 / 0.6)"}
            initial={reduced ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 + i * 0.1, type: "spring" }}
            style={{ filter: "drop-shadow(0 0 4px rgb(96 165 250 / 0.8))" }}
          />
        ))}
      </svg>
    </motion.div>
  );
}

function WorkflowPanel({
  reduced,
  className,
  float,
}: {
  reduced: boolean;
  className?: string;
  float?: ReturnType<typeof createFloatingEffect>;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        "absolute z-25 rounded-[var(--ds-radius-lg)] p-2.5",
        glassPanel,
        className,
      )}
      animate={float?.animate}
      transition={float?.transition}
      whileHover={reduced ? undefined : { scale: 1.04, rotate: 1 }}
    >
      <div className="mb-2 flex items-center gap-1.5">
        <Workflow
          {...createIconProps({ size: "xs", decorative: true })}
          className="text-[var(--ds-primary-text)]"
        />
        <span className="text-[0.5625rem] font-semibold text-[var(--ds-foreground)]">
          Automation
        </span>
      </div>
      <div className="flex items-center gap-1">
        {["Trigger", "Process", "Deploy"].map((step, i) => (
          <div key={step} className="flex items-center gap-1">
            <motion.span
              className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[0.5rem] text-[var(--ds-foreground-muted)]"
              initial={reduced ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.12 }}
            >
              {step}
            </motion.span>
            {i < 2 ? (
              <GitBranch
                {...createIconProps({ size: "xs", decorative: true })}
                className="size-2.5 text-[var(--ds-primary-text)]/50"
              />
            ) : null}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function AnalyticsWidget({
  reduced,
  className,
  float,
}: {
  reduced: boolean;
  className?: string;
  float?: ReturnType<typeof createFloatingEffect>;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        "absolute z-30 rounded-[var(--ds-radius-lg)] p-3",
        glassPanel,
        className,
      )}
      animate={float?.animate}
      transition={float?.transition}
      whileHover={reduced ? undefined : { scale: 1.03 }}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-[0.5625rem] tracking-[0.1em] text-[var(--ds-foreground-muted)] uppercase">
          <Activity
            {...createIconProps({ size: "xs", decorative: true })}
          />
          Analytics
        </span>
        <span className="text-[0.625rem] font-semibold text-emerald-400">
          +24%
        </span>
      </div>
      <MiniChart reduced={reduced} />
    </motion.div>
  );
}

function CloudPanel({
  reduced,
  className,
  float,
}: {
  reduced: boolean;
  className?: string;
  float?: ReturnType<typeof createFloatingEffect>;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        "absolute z-25 flex items-center gap-2 rounded-[var(--ds-radius-lg)] px-3 py-2.5",
        glassPanel,
        className,
      )}
      animate={float?.animate}
      transition={float?.transition}
      whileHover={reduced ? undefined : { scale: 1.05, y: -2 }}
    >
      <span className="inline-flex size-7 items-center justify-center rounded-[var(--ds-radius-md)] border border-[var(--ds-primary-text)]/25 bg-[var(--ds-primary-muted)] text-[var(--ds-primary-text)]">
        <Cloud {...createIconProps({ size: "xs", decorative: true })} />
      </span>
      <div className="flex flex-col leading-none">
        <span className="text-[0.5625rem] tracking-[0.12em] text-[var(--ds-foreground-muted)] uppercase">
          Cloud
        </span>
        <span className="mt-0.5 text-xs font-semibold text-[var(--ds-foreground)]">
          3 regions
        </span>
      </div>
      {!reduced ? (
        <motion.span
          className="ml-1 size-1.5 rounded-full bg-emerald-400"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ boxShadow: "0 0 6px rgb(52 211 153 / 0.8)" }}
        />
      ) : null}
    </motion.div>
  );
}

function NetworkLines({ reduced }: { reduced: boolean }) {
  const paths = [
    "M60 50 C120 30 160 40 200 60",
    "M340 70 C280 90 240 100 200 110",
    "M80 240 C140 210 170 190 200 170",
    "M320 220 C260 200 230 185 200 165",
    "M200 50 L200 130",
    "M200 130 L200 210",
  ];

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      viewBox="0 0 400 320"
      preserveAspectRatio="none"
    >
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="rgb(96 165 250 / 0.22)"
          strokeWidth="1"
          strokeDasharray="4 6"
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 + i * 0.12 }}
        />
      ))}
      {!reduced ? (
        <>
          <motion.circle
            r="2.5"
            fill="#60a5fa"
            style={{ filter: "drop-shadow(0 0 6px rgb(96 165 250 / 0.9))" }}
            animate={{
              cx: [60, 120, 160, 200],
              cy: [50, 30, 40, 60],
              opacity: [0.3, 1, 1, 0.4],
            }}
            transition={{
              duration: 5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
          <motion.circle
            r="2"
            fill="#93c5fd"
            style={{ filter: "drop-shadow(0 0 5px rgb(147 197 253 / 0.8))" }}
            animate={{
              cx: [340, 280, 240, 200],
              cy: [70, 90, 100, 110],
              opacity: [0.3, 1, 0.8, 0.3],
            }}
            transition={{
              duration: 6,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
              delay: 1,
            }}
          />
        </>
      ) : null}
    </svg>
  );
}

/**
 * Animated enterprise technology illustration for the homepage hero.
 * Decorative — exposed via aria-label on the figure.
 */
function HeroVisual({ ariaLabel, className, style }: HeroVisualProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const stageRef = useRef<HTMLElement | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const layer1X = useSpring(mouseX, { ...springConfig, stiffness: 50 });
  const layer1Y = useSpring(mouseY, { ...springConfig, stiffness: 50 });
  const layer2X = useSpring(mouseX, { ...springConfig, stiffness: 95 });
  const layer2Y = useSpring(mouseY, { ...springConfig, stiffness: 95 });
  const deepX = useTransform(springX, (value) => value * 0.4);
  const deepY = useTransform(springY, (value) => value * 0.4);

  const onMove = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (prefersReducedMotion || !stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(px * 28);
      mouseY.set(py * 20);
    },
    [mouseX, mouseY, prefersReducedMotion],
  );

  const onLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const floatMain = prefersReducedMotion
    ? undefined
    : createFloatingEffect({ distance: 8, duration: 6.5 });
  const floatA = prefersReducedMotion ? undefined : floatingPresets.subtle;
  const floatB = prefersReducedMotion
    ? undefined
    : createFloatingEffect({ distance: 10, duration: 5.5 });
  const floatC = prefersReducedMotion
    ? undefined
    : createFloatingEffect({ distance: 12, duration: 7 });
  const floatD = prefersReducedMotion
    ? undefined
    : createFloatingEffect({ distance: 9, duration: 6.2 });

  const reveal = useMemo(
    () =>
      withReducedMotion(
        createStaggerVariants({
          staggerChildren: 0.08,
          delayChildren: 0.12,
          childVariants: fadeUp,
        }).container,
        prefersReducedMotion,
      ),
    [prefersReducedMotion],
  );

  const orbGlow = useMotionTemplate`radial-gradient(circle at ${springX}px ${springY}px, rgb(37 99 235 / 0.35), transparent 55%)`;

  return (
    <figure
      ref={stageRef}
      data-slot="hero-visual"
      aria-label={ariaLabel}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "relative mx-auto aspect-[5/4] w-full max-w-xl overflow-hidden md:max-w-none lg:aspect-[4/3]",
        "rounded-[var(--ds-radius-xl)]",
        className,
      )}
      style={style}
    >
      {/* Atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[var(--ds-background)]"
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-80"
        style={{
          backgroundImage: prefersReducedMotion ? undefined : orbGlow,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(96 165 250 / 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgb(96 165 250 / 0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse 75% 70% at 50% 45%, black 20%, transparent 75%)",
        }}
      />
      {!prefersReducedMotion ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(96 165 250 / 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgb(96 165 250 / 0.15) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        />
      ) : null}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] polish-noise opacity-[0.05] mix-blend-overlay"
      />

      {!prefersReducedMotion ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-40"
          style={{
            background:
              "linear-gradient(115deg, transparent 30%, rgb(96 165 250 / 0.18) 48%, transparent 66%)",
          }}
          animate={{ x: ["-35%", "35%", "-35%"] }}
          transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
        />
      ) : null}

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-[8%] left-[18%] size-48 rounded-full bg-[var(--ds-primary)]/25 blur-[70px]"
        style={prefersReducedMotion ? undefined : { x: deepX, y: deepY }}
        animate={
          prefersReducedMotion
            ? undefined
            : { opacity: [0.35, 0.6, 0.35], scale: [0.95, 1.08, 0.95] }
        }
        transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-[6%] bottom-[10%] size-56 rounded-full bg-[var(--ds-primary-soft)]/20 blur-[80px]"
        animate={
          prefersReducedMotion
            ? undefined
            : { opacity: [0.25, 0.5, 0.25], x: [0, -16, 0], y: [0, 12, 0] }
        }
        transition={{ duration: 11, ease: "easeInOut", repeat: Infinity }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 z-0 size-[14rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--ds-primary)]/30 blur-[60px] md:size-[18rem]"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                opacity: [0.4, 0.75, 0.4],
                scale: [0.92, 1.08, 0.92],
                rotate: [0, 20, 0],
              }
        }
        transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
      />

      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="pointer-events-none absolute z-10 rounded-full bg-[var(--ds-primary-text)]"
          style={{
            left: p.x,
            top: p.y,
            width: p.s,
            height: p.s,
            boxShadow: "0 0 8px rgb(96 165 250 / 0.8)",
          }}
          animate={
            prefersReducedMotion
              ? undefined
              : { opacity: [0.2, 0.9, 0.2], y: [0, -10, 0] }
          }
          transition={{
            duration: p.d,
            ease: "easeInOut",
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}

      <NetworkLines reduced={prefersReducedMotion} />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 z-10 size-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--ds-primary)]/15"
        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 48, ease: "linear", repeat: Infinity }}
      >
        <span className="absolute top-0 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--ds-primary-text)] shadow-[0_0_10px_rgb(96_165_250_/_0.9)]" />
        <span className="absolute bottom-[18%] left-[8%] size-1 rounded-full bg-[var(--ds-primary)] shadow-[0_0_8px_rgb(37_99_235_/_0.8)]" />
      </motion.div>

      <motion.div
        className="relative z-20 flex h-full w-full items-center justify-center p-4 sm:p-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={reveal}
      >
        <motion.div
          style={
            prefersReducedMotion ? undefined : { x: layer2X, y: layer2Y }
          }
          className="contents"
        >
          <FloatingChip
            icon={Sparkles}
            label="API Gateway"
            value="REST · GraphQL"
            className="top-[4%] right-[0%] hidden sm:flex"
            float={floatB}
            delay={0.25}
            rotate={2}
          />
          <CloudPanel
            reduced={prefersReducedMotion}
            className="top-[12%] right-[8%] hidden md:flex"
            float={floatC}
          />
          <AiNodeCluster reduced={prefersReducedMotion} />
          <AnalyticsWidget
            reduced={prefersReducedMotion}
            className="bottom-[6%] right-[2%] hidden sm:block"
            float={floatA}
          />
          <WorkflowPanel
            reduced={prefersReducedMotion}
            className="bottom-[14%] left-[0%] hidden sm:block"
            float={floatD}
          />
          <ServerCard
            reduced={prefersReducedMotion}
            className="bottom-[22%] right-[12%] hidden md:block"
            float={floatB}
            delay={0.35}
          />
          <DatabasePanel
            reduced={prefersReducedMotion}
            className="top-[38%] left-[0%] hidden md:block"
            float={floatC}
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          style={
            prefersReducedMotion ? undefined : { x: layer1X, y: layer1Y }
          }
          className="relative z-20"
        >
          <CodeEditorPanel reduced={prefersReducedMotion} float={floatMain} />
        </motion.div>
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(ellipse_at_center,transparent_45%,rgb(5_8_22_/_0.55)_100%)]"
      />
    </figure>
  );
}

export { HeroVisual };
