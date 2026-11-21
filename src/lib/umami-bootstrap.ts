/**
 * Umami bootstrap — hardcoded for static export on Render.
 * Do not use env vars here; they are not reliably available at build time.
 */
export const UMAMI_INSTANCE_URL = "https://umami-avidx.onrender.com";
export const UMAMI_WEBSITE_ID = "1e6a0b1c-f6ba-45cf-bc06-9090fa34d577";

/** Only these hostnames are tracked, so local dev, Render previews and test runs never count. */
export const UMAMI_DOMAINS = "www.mitchheard.com,mitchheard.com";

/** Umami calls this (by global name) before every send; returning null drops the event.
 *  Keeps the private /dashboard (a personal browser homepage) out of the stats. */
export const UMAMI_BEFORE_SEND_NAME = "umamiBeforeSend";
export const UMAMI_BEFORE_SEND_SOURCE = `window.${UMAMI_BEFORE_SEND_NAME}=function(t,p){try{var u=new URL(p&&p.url,location.href);if(u.pathname.indexOf("/dashboard")===0)return null}catch(e){}return p};`;

/* Events and their properties:
   linkedin_clicked | github_clicked | email_clicked   { location: nav | menu | hero | footer }
   company_link_clicked                                { company, location: hero | career }
   home_project_clicked                                { project_id }
   project_link_clicked                                { project_id, link_type: site | source }
   gallery_image_selected                              { project_id, index }   (index is 1-based)
   article_clicked                                     { article_id }
   Pageviews are sent by Umami itself (it hooks history.pushState), including client-side navigations. */
export type UmamiTicketEvent =
  | "project_link_clicked"
  | "home_project_clicked"
  | "gallery_image_selected"
  | "company_link_clicked"
  | "article_clicked"
  | "linkedin_clicked"
  | "github_clicked"
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
