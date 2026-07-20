/**
 * Fixed site-wide atmosphere — CSS-only (Server Component).
 * No Framer Motion / no client JS on the critical path.
 */
function SiteAtmosphere() {
  return (
    <div
      aria-hidden="true"
      data-slot="site-atmosphere"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 polish-mesh opacity-90" />
      <div className="absolute inset-0 polish-aurora opacity-70" />

      <div
        className="absolute inset-0 opacity-[0.32] polish-grid-move motion-reduce:animate-none"
        style={{
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 10%, transparent 75%)",
        }}
      />

      <div className="polish-glow-orb polish-glow-a max-md:opacity-60" />
      <div className="polish-glow-orb polish-glow-b max-md:hidden" />
      <div className="polish-glow-orb polish-glow-c max-md:opacity-50" />

      <div className="absolute inset-0 polish-noise opacity-[0.03] mix-blend-overlay" />
    </div>
  );
}

export { SiteAtmosphere };
