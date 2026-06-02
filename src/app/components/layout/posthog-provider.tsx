"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

let initialized = false;

/**
 * Initializes PostHog on the client: autocapture (clicks/inputs), pageviews,
 * and session replay (video). Reads NEXT_PUBLIC_POSTHOG_KEY / _HOST from env;
 * if no key is set it's a no-op, so the app works fine without analytics.
 *
 * Session replay must also be toggled ON in the PostHog project settings.
 */
export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key || initialized) return;
    initialized = true;

    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
      person_profiles: "always",
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: true,
      disable_session_recording: false, // session replay (video)
      persistence: "localStorage+cookie",
    });
  }, []);

  return <>{children}</>;
}
