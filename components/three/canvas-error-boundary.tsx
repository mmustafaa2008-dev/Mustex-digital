"use client";

import { Component, type ReactNode } from "react";

type CanvasErrorBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

type CanvasErrorBoundaryState = {
  hasError: boolean;
};

/**
 * Catches R3F/Suspense render errors (e.g. a missing `.glb` asset) so the
 * scene can gracefully degrade to a procedural fallback instead of crashing
 * the page.
 */
class CanvasErrorBoundary extends Component<
  CanvasErrorBoundaryProps,
  CanvasErrorBoundaryState
> {
  constructor(props: CanvasErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[hero-robot] Falling back to placeholder robot:",
        error,
      );
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export { CanvasErrorBoundary };
