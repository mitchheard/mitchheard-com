"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Umami’s default tracker records the first load; Next.js client navigations
 * do not reload the page, so we send a pageview when the pathname changes.
 */
export function UmamiPageviewRouteListener() {
  const pathname = usePathname();
  const skipNext = useRef(true);

  useEffect(() => {
    if (skipNext.current) {
      skipNext.current = false;
      return;
    }
    window.umami?.track((props: Record<string, unknown>) => ({
      ...props,
      url: pathname,
    }));
  }, [pathname]);

  return null;
}
