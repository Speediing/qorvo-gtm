export type HeroJob = {
  id: string;
  name: string;
  icon:
    | "outbound"
    | "research"
    | "follow-up"
    | "deal-desk"
    | "pipeline"
    | "renewal"
    | "competitive"
    | "chief-of-staff";
  account: string;
  signal: string;
  work: string;
  result: string;
  user: string;
  bot: string;
};

export const HERO_JOBS = [
  {
    id: "product-context",
    name: "Product Context",
    icon: "research",
    account: "Qorvo product review",
    signal: "A product review is starting",
    work:
      "I gathered the design, firmware, test, and qualification notes I can already see. Open questions stay open in the brief.",
    result: "Product context brief ready for review",
    user: "keep the open questions in the brief",
    bot: "done. nothing is marked complete.",
  },
  {
    id: "technical-answer",
    name: "Technical Answer",
    icon: "deal-desk",
    account: "Qorvo engineering review",
    signal: "A technical question arrives",
    work:
      "I checked the available product context, qualification notes, and firmware notes, then drafted a sourced answer.",
    result: "Technical reply ready for review",
    user: "park it until engineering reviews it",
    bot: "parked. nothing has been sent.",
  },
  {
    id: "test-triage",
    name: "Test Triage",
    icon: "pipeline",
    account: "Qorvo test review",
    signal: "Open test notes are added",
    work:
      "I sorted the visible notes by design question, firmware question, and follow-up owner. Unresolved items stay open.",
    result: "Test note list ready for review",
    user: "keep the list with engineering",
    bot: "done. the list stays in review.",
  },
  {
    id: "qualification",
    name: "Qualification",
    icon: "renewal",
    account: "Qorvo qualification review",
    signal: "Qualification questions remain open",
    work:
      "I collected the open qualification questions from shared notes and kept each unanswered item visible.",
    result: "Qualification checklist ready for review",
    user: "flag anything without an answer",
    bot: "flagged. nothing is marked complete.",
  },
  {
    id: "customer-brief",
    name: "Customer Brief",
    icon: "follow-up",
    account: "Qorvo customer-team review",
    signal: "A review note is requested",
    work:
      "I turned the visible product context into a short note for the customer team. The draft makes no new claims.",
    result: "Customer-team note ready for review",
    user: "leave it as a draft",
    bot: "left in draft. the team reviews it before it moves.",
  },
  {
    id: "account-research",
    name: "Account Research",
    icon: "competitive",
    account: "Target account",
    signal: "Public account pages are collected",
    work:
      "I linked company pages, careers pages, and current news. Open roles stay signals, not proof of a need.",
    result: "Public-evidence pack ready for review",
    user: "mark the open roles as signals only",
    bot: "done. the pack does not treat them as proof.",
  },
  {
    id: "follow-up",
    name: "Follow-Up",
    icon: "outbound",
    account: "Qorvo follow-up",
    signal: "A follow-up draft is requested",
    work:
      "I drafted a recap from the visible notes and kept every open question in the review queue.",
    result: "Follow-up draft ready for review",
    user: "queue it for review",
    bot: "queued. nothing has been sent.",
  },
  {
    id: "chief-of-staff",
    name: "Chief of Staff",
    icon: "chief-of-staff",
    account: "Qorvo operating review",
    signal: "Draft work needs clear owners",
    work:
      "I grouped the open briefs, questions, and follow-ups across the fleet, then kept each item with a person.",
    result: "Review queue ready",
    user: "keep every draft with a person",
    bot: "done. people keep the judgment.",
  },
] as const satisfies readonly HeroJob[];

export type HeroJobName = (typeof HERO_JOBS)[number]["name"];
