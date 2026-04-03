/**
 * Umami bootstrap — hardcoded for static export on Render.
 * Do not use env vars here; they are not reliably available at build time.
 */
export const UMAMI_INSTANCE_URL = "https://umami-avidx.onrender.com";
export const UMAMI_WEBSITE_ID = "1e6a0b1c-f6ba-45cf-bc06-9090fa34d577";

export type UmamiTicketEvent =
  | "project_link_clicked"
  | "article_clicked"
  | "linkedin_clicked"
  | "email_clicked";

type UmamiTrackFn = {
  (): void;
  (payload: Record<string, unknown>): void;
  (eventName: string, eventData?: Record<string, unknown>): void;
  (map: (props: Record<string, unknown>) => Record<string, unknown>): void;
};

declare global {
  interface Window {
    umami?: { track: UmamiTrackFn };
  }
}

export function trackUmamiEvent(
  name: UmamiTicketEvent,
  eventData?: Record<string, string | number | boolean>
): void {
  if (typeof window === "undefined") return;
  window.umami?.track(name, eventData);
}
