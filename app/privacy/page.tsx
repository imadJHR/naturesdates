import type { Metadata } from "next";
import { LegalPage } from "../components/legal-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy",
  description: "Learn how the Natures Dates website handles visitor data, local media, fonts and external links.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy">
      <p className="legal-note">Last updated: July 13, 2026. This page describes the current behavior of this demonstration website.</p>
      <h2>Data collection</h2>
      <p>This site does not provide accounts, forms, checkout, analytics or advertising trackers. It does not intentionally collect or store personal information.</p>
      <h2>External links</h2>
      <p>Links to Natural Delights and Instagram open third-party websites. Those services operate under their own privacy policies and may collect technical or account information.</p>
      <h2>Local media and fonts</h2>
      <p>Images and video are served by this website. Fonts are optimized at build time by Next.js, so the page does not need to contact Google Fonts from the visitor’s browser.</p>
      <h2>Changes</h2>
      <p>This notice should be reviewed if analytics, contact forms, hosting telemetry or other data-processing features are added later.</p>
    </LegalPage>
  );
}
