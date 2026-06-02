import posthog from "posthog-js";

/**
 * Safe event capture — no-ops on the server or when PostHog isn't configured,
 * so callers never need to guard.
 */
export function track(event: string, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
  try {
    posthog.capture(event, props);
  } catch {
    /* ignore */
  }
}
