"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isDash = pathname.startsWith("/dash");
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    if (isDash || isLocalhost) return;

    const start = performance.now();
    let sent = false;

    const sendVisit = () => {
      if (sent) return;
      sent = true;

      const durationMs = Math.max(0, Math.round(performance.now() - start));

      void fetch("/api/analytics/visit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          path: pathname,
          durationMs,
        }),
        keepalive: true,
      }).catch(() => {
        // falha silenciosa, não deve quebrar a navegação
      });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        sendVisit();
      }
    };

    window.addEventListener("pagehide", sendVisit);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      sendVisit();
      window.removeEventListener("pagehide", sendVisit);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [pathname]);

  return null;
}

