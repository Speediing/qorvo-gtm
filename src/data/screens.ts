import type { ClipId, JobId } from "./types";

export type SiteKind =
  | "granola"
  | "figma"
  | "gong"
  | "sfdc-account"
  | "sfdc-opp"
  | "sheets"
  | "gmail"
  | "slack"
  | "gdoc"
  | "linkedin"
  | "research"
  | "page"
  | "clip";

export type ChromeTab = {
  id: string;
  host: string;
  label: string;
};

export type ComputerBeat = {
  pill: string;
  host: string;
  path?: string;
  title: string;
  site: SiteKind;
  clip?: ClipId;
  tabs: ChromeTab[];
};

const notes = { id: "notes", host: "notes.local", label: "Notes" };
const figma = { id: "figma", host: "figma.com", label: "Figma" };
const gmail = { id: "gmail", host: "mail.google.com", label: "Gmail" };
const gdoc = { id: "gdoc", host: "docs.google.com", label: "Docs" };
const linkedin = {
  id: "linkedin",
  host: "www.linkedin.com",
  label: "LinkedIn",
};
const web = { id: "web", host: "target-account.example", label: "Target account" };

export const SCREENS: Record<JobId, Record<string, ComputerBeat>> = {
  "standardize-room": {
    m1: {
      pill: "Opening notes",
      host: "notes.local",
      path: "/notes/product-review",
      title: "Product review",
      site: "granola",
      tabs: [notes, figma, gmail],
    },
    m2: {
      pill: "In the review notes",
      host: "notes.local",
      path: "/notes/product-review",
      title: "Product review",
      site: "granola",
      tabs: [notes, figma, gmail],
    },
    m3: {
      pill: "Still gathering context",
      host: "notes.local",
      path: "/notes/product-review",
      title: "Product review",
      site: "granola",
      tabs: [notes, figma, gmail],
    },
    m4: {
      pill: "Writing the brief",
      host: "figma.com",
      path: "/file/engineering-context-brief",
      title: "Engineering context brief",
      site: "figma",
      tabs: [notes, figma, gmail],
    },
    m5: {
      pill: "Drafting the one-pager",
      host: "figma.com",
      path: "/file/product-review-note",
      title: "Product review note",
      site: "figma",
      tabs: [notes, figma, gmail],
    },
    m6: {
      pill: "Building the inside note",
      host: "figma.com",
      path: "/file/engineering-team-note",
      title: "Note for the engineering team",
      site: "figma",
      tabs: [notes, figma, gmail],
    },
    m7: {
      pill: "Drafting in Gmail, not sent",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [notes, figma, gmail],
    },
    m8: {
      pill: "Draft parked. Nothing sent",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [notes, figma, gmail],
    },
  },
  "legal-redlines": {
    m1: {
      pill: "Opening Gmail",
      host: "mail.google.com",
      path: "/mail/u/0/#inbox",
      title: "Inbox",
      site: "gmail",
      tabs: [gmail, gdoc],
    },
    m2: {
      pill: "Drafting so the team can review",
      host: "mail.google.com",
      path: "/mail/u/0/#inbox",
      title: "Inbox",
      site: "gmail",
      tabs: [gmail, gdoc],
    },
    m3: {
      pill: "Writing the sourced reply, not sent",
      host: "docs.google.com",
      path: "/document/d/technical-question",
      title: "Technical question. Sourced draft",
      site: "gdoc",
      tabs: [gmail, gdoc],
    },
    m4: {
      pill: "Drafting in Gmail, not sent",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [gmail, gdoc],
    },
    m5: {
      pill: "Draft parked. Nothing sent",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [gmail, gdoc],
    },
  },
  "attach-engine": {
    m1: {
      pill: "Researching the account",
      host: "target-account.example",
      path: "/careers",
      title: "Careers. Public pages",
      site: "research",
      tabs: [web, gdoc, linkedin, gmail],
    },
    m2: {
      pill: "Reading public evidence",
      host: "target-account.example",
      path: "/",
      title: "Target account. Public pages",
      site: "research",
      tabs: [web, gdoc, linkedin, gmail],
    },
    m3: {
      pill: "Writing the point of view",
      host: "docs.google.com",
      path: "/document/d/target-account-pack",
      title: "Target account point of view",
      site: "gdoc",
      tabs: [web, gdoc, linkedin, gmail],
    },
    m4: {
      pill: "Naming who reviews the pack",
      host: "docs.google.com",
      path: "/document/d/target-account-pack",
      title: "Target account point of view",
      site: "gdoc",
      tabs: [web, gdoc, linkedin, gmail],
    },
    m5: {
      pill: "Drafting LinkedIn, not sent",
      host: "www.linkedin.com",
      path: "/messaging/compose",
      title: "Message",
      site: "linkedin",
      tabs: [web, gdoc, linkedin, gmail],
    },
    m6: {
      pill: "Drafting in Gmail, not sent",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [gmail, gdoc, linkedin],
    },
    m7: {
      pill: "Building a page for this account",
      host: "docs.google.com",
      path: "/document/d/target-account-page",
      title: "A research pack for Target account",
      site: "page",
      tabs: [web, gdoc, linkedin, gmail],
    },
    m8: {
      pill: "Drafts parked. Nothing sent",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [web, gdoc, linkedin, gmail],
    },
  },
};

export function beatFor(
  jobId: JobId,
  messageId: string | undefined,
): ComputerBeat | undefined {
  if (!messageId) return undefined;
  return SCREENS[jobId]?.[messageId];
}
