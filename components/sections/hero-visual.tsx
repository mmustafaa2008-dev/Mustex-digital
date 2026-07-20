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
  Cpu,
  Gauge,
  ShieldCheck,
  Sparkles,
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

function ProgressRing({
  value,
  label,
  reduced,
}: {
  value: number;
  label: string;
  reduced: boolean;
}) {
  const r = 28;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;

  return (
    <div className="relative flex size-[4.5rem] items-center justify-center">
      <svg viewBox="0 0 72 72" className="size-full -rotate-90">
        <circle
          cx="36"
          cy="36"
          r={r}
          fill="none"
          stroke="rgb(255 255 255 / 0.08)"
          strokeWidth="4"
        />
        <motion.circle
          cx="36"
          cy="36"
          r={r}
          fill="none"
          stroke="var(--ds-primary-text)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={reduced ? { strokeDashoffset: offset } : { strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          style={{ filter: "drop-shadow(0 0 6px rgb(37 99 235 / 0.55))" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-semibold tabular-nums text-[var(--ds-foreground)]">
          {value}%
        </span>
        <span className="text-[0.5625rem] tracking-[0.14em] text-[var(--ds-foreground-muted)] uppercase">
          {label}
        </span>
      </div>
    </div>
  );
}

function LiveChart({ reduced }: { reduced: boolean }) {
  return (
    <svg
      viewBox="0 0 220 72"
      className="h-16 w-full overflow-visible"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hero-chart-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(37 99 235 / 0.45)" />
          <stop offset="100%" stopColor="rgb(37 99 235 / 0)" />
        </linearGradient>
        <linearGradient id="hero-chart-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      <motion.path
        d="M0 52 C18 48 28 30 44 34 C60 38 70 58 88 46 C106 34 118 18 136 24 C154 30 164 50 182 40 C196 32 208 22 220 28 L220 72 L0 72 Z"
        fill="url(#hero-chart-fill)"
        initial={reduced ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.45 }}
      />
      <motion.path
        d="M0 52 C18 48 28 30 44 34 C60 38 70 58 88 46 C106 34 118 18 136 24 C154 30 164 50 182 40 C196 32 208 22 220 28"
        fill="none"
        stroke="url(#hero-chart-stroke)"
        strokeWidth="2.25"
        strokeLinecap="round"
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        style={{ filter: "drop-shadow(0 0 8px rgb(37 99 235 / 0.55))" }}
      />
      {!reduced ? (
        <motion.circle
          r="3.5"
          fill="#60a5fa"
          style={{ filter: "drop-shadow(0 0 8px rgb(96 165 250 / 0.9))" }}
          animate={{
            cx: [0, 44, 88, 136, 182, 220],
            cy: [52, 34, 46, 24, 40, 28],
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      ) : null}
    </svg>
  );
}

function ActivityBars({ reduced }: { reduced: boolean }) {
  const bars = [38, 62, 48, 78, 54, 88, 66, 72, 58, 84, 70, 92];

  return (
    <div className="flex h-14 items-end gap-1">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="w-1.5 rounded-full bg-[var(--ds-primary-text)]/80"
          style={{
            boxShadow: "0 0 10px rgb(37 99 235 / 0.35)",
            originY: 1,
          }}
          initial={reduced ? { height: `${h}%` } : { height: "12%" }}
          animate={
            reduced
              ? { height: `${h}%` }
              : { height: [`${h * 0.55}%`, `${h}%`, `${h * 0.7}%`] }
          }
          transition={{
            duration: 2.4 + (i % 4) * 0.25,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay: i * 0.08,
          }}
        />
      ))}
    </div>
  );
}

function MetricChip({
  icon: Icon,
  label,
  value,
  className,
  float,
  delay = 0,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  className?: string;
  float?: ReturnType<typeof createFloatingEffect>;
  delay?: number;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        "absolute z-30 flex items-center gap-2.5 rounded-[var(--ds-radius-lg)] px-3 py-2.5",
        "border border-white/12 bg-[var(--glass-panel-bg-strong)]",
        "shadow-[0_12px_40px_rgb(0_0_0_/_0.35),var(--ds-shadow-glow-sm)]",
        "backdrop-blur-[var(--glass-panel-blur)]",
        "[-webkit-backdrop-filter:blur(var(--glass-panel-blur))]",
        className,
      )}
      animate={float?.animate}
      transition={{ ...float?.transition, delay }}
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

/**
 * Animated AI software dashboard for the homepage hero.
 * Decorative — exposed via aria-label on the figure.
 */
function HeroVisual({ ariaLabel, className, style }: HeroVisualProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const stageRef = useRef<HTMLElement | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Depth layers — lighter / stronger response to the same pointer signal
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

      {/* Noise */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] polish-noise opacity-[0.05] mix-blend-overlay"
      />

      {/* Gradient light sweep */}
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

      {/* Light blobs */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-[8%] left-[18%] size-48 rounded-full bg-[var(--ds-primary)]/25 blur-[70px]"
        style={
          prefersReducedMotion
            ? undefined
            : { x: deepX, y: deepY }
        }
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

      {/* Core orb */}
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

      {/* Particles */}
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

      {/* Connection lines */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
        viewBox="0 0 400 320"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M70 70 C140 90 180 120 210 150"
          fill="none"
          stroke="rgb(96 165 250 / 0.28)"
          strokeWidth="1"
          strokeDasharray="4 6"
          initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.5 }}
        />
        <motion.path
          d="M330 80 C280 110 250 140 220 160"
          fill="none"
          stroke="rgb(96 165 250 / 0.22)"
          strokeWidth="1"
          strokeDasharray="4 6"
          initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.7 }}
        />
        <motion.path
          d="M90 250 C150 220 180 190 210 170"
          fill="none"
          stroke="rgb(96 165 250 / 0.2)"
          strokeWidth="1"
          strokeDasharray="4 6"
          initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.9 }}
        />
        {!prefersReducedMotion ? (
          <motion.circle
            r="2.5"
            fill="#60a5fa"
            style={{ filter: "drop-shadow(0 0 6px rgb(96 165 250 / 0.9))" }}
            animate={{
              cx: [70, 140, 180, 210],
              cy: [70, 90, 120, 150],
              opacity: [0.4, 1, 1, 0.5],
            }}
            transition={{
              duration: 4.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        ) : null}
      </svg>

      {/* Orbit ring */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 z-10 size-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--ds-primary)]/15"
        animate={
          prefersReducedMotion ? undefined : { rotate: 360 }
        }
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
        {/* Floating chips */}
        <motion.div
          style={
            prefersReducedMotion
              ? undefined
              : { x: layer2X, y: layer2Y }
          }
          className="contents"
        >
          <MetricChip
            icon={Activity}
            label="Throughput"
            value="2.4k/s"
            className="top-[6%] left-[2%] hidden sm:flex"
            float={floatA}
            delay={0.2}
          />
          <MetricChip
            icon={ShieldCheck}
            label="Uptime"
            value="99.98%"
            className="top-[10%] right-[0%] hidden sm:flex"
            float={floatB}
            delay={0.45}
          />
          <MetricChip
            icon={Bot}
            label="AI Agents"
            value="12 active"
            className="bottom-[8%] left-[0%] hidden sm:flex"
            float={floatC}
            delay={0.6}
          />
        </motion.div>

        {/* Main dashboard */}
        <motion.div
          variants={fadeUp}
          style={
            prefersReducedMotion
              ? undefined
              : { x: layer1X, y: layer1Y }
          }
          className="relative z-20 w-full max-w-[26rem]"
        >
          <motion.div
            aria-hidden="true"
            className={cn(
              "flex flex-col gap-4 rounded-[var(--ds-radius-xl)] p-4 sm:p-5",
              "border border-white/14 bg-[var(--glass-panel-bg)]",
              "shadow-[0_24px_80px_rgb(0_0_0_/_0.45),var(--ds-shadow-glow-md)]",
              "backdrop-blur-[var(--glass-panel-blur)]",
              "[-webkit-backdrop-filter:blur(var(--glass-panel-blur))]",
            )}
            animate={floatMain?.animate}
            transition={floatMain?.transition}
          >
            {/* Title bar */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex size-8 items-center justify-center rounded-[var(--ds-radius-md)] border border-[var(--ds-primary-text)]/30 bg-[var(--ds-primary-muted)] text-[var(--ds-primary-text)]">
                  <Cpu
                    {...createIconProps({ size: "sm", decorative: true })}
                  />
                </span>
                <div className="flex flex-col leading-none">
                  <span className="text-xs font-semibold tracking-[-0.01em] text-[var(--ds-foreground)]">
                    Mustex AI Console
                  </span>
                  <span className="mt-1 flex items-center gap-1.5 text-[0.625rem] text-[var(--ds-foreground-muted)]">
                    <span className="relative flex size-1.5">
                      <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
                      <span className="relative size-1.5 rounded-full bg-emerald-400" />
                    </span>
                    Live inference
                  </span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[0.625rem] text-[var(--ds-primary-text)]">
                <Sparkles
                  {...createIconProps({ size: "xs", decorative: true })}
                />
                v2.4
              </span>
            </div>

            {/* Chart panel */}
            <div
              className={cn(
                "rounded-[var(--ds-radius-lg)] border border-white/10 bg-black/25 p-3",
              )}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[0.625rem] tracking-[0.14em] text-[var(--ds-foreground-muted)] uppercase">
                  Model latency
                </span>
                <span className="text-[0.6875rem] font-semibold text-[var(--ds-primary-text)]">
                  −18% p95
                </span>
              </div>
              <LiveChart reduced={prefersReducedMotion} />
            </div>

            {/* Widgets row */}
            <div className="grid grid-cols-[auto_1fr] gap-3">
              <div
                className={cn(
                  "flex items-center justify-center rounded-[var(--ds-radius-lg)] border border-white/10 bg-black/20 p-2",
                )}
              >
                <ProgressRing
                  value={94}
                  label="Health"
                  reduced={prefersReducedMotion}
                />
              </div>

              <div
                className={cn(
                  "flex flex-col justify-between rounded-[var(--ds-radius-lg)] border border-white/10 bg-black/20 p-3",
                )}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[0.625rem] tracking-[0.12em] text-[var(--ds-foreground-muted)] uppercase">
                    <Gauge
                      {...createIconProps({ size: "xs", decorative: true })}
                    />
                    Activity
                  </span>
                  <span className="text-[0.6875rem] font-semibold tabular-nums text-[var(--ds-foreground)]">
                    86.2
                  </span>
                </div>
                <ActivityBars reduced={prefersReducedMotion} />
              </div>
            </div>

            {/* Metric footer */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Requests", value: "1.2M" },
                { label: "Accuracy", value: "99.4%" },
                { label: "Regions", value: "8" },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[var(--ds-radius-md)] border border-white/8 bg-white/[0.03] px-2.5 py-2"
                >
                  <p className="text-[0.5625rem] tracking-[0.12em] text-[var(--ds-foreground-muted)] uppercase">
                    {metric.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold tabular-nums text-[var(--ds-foreground)]">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Edge vignette */}
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
