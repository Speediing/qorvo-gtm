import type { Artifact, CroJob, SlideCard } from "./types";

export const CONTEXT_BRIEF_SLIDES: SlideCard[] = [
  {
    n: 1,
    kicker: "In review",
    voice: "us",
    title: "Product context",
    body: "What the engineering team needs in one place before a product review. Design notes, firmware notes, test notes, and qualification questions.",
  },
  {
    n: 2,
    kicker: "In review",
    voice: "us",
    title: "Where the work sits",
    body: "Design tools, firmware, test code, qualification flows, and product context. The brief stays in draft until someone on the team accepts it.",
  },
  {
    n: 3,
    kicker: "In review",
    voice: "us",
    title: "Open questions",
    body: "What still needs judgment. Test gaps. Qualification items. Product claims that are not ready to send.",
  },
  {
    n: 4,
    kicker: "In review",
    voice: "us",
    title: "Next pass",
    body: "A short list the review can walk. Nothing leaves this draft on its own.",
  },
];

export const TECHNICAL_ANSWER: Extract<Artifact, { kind: "redlines" }> = {
  kind: "redlines",
  title: "Technical question. Sourced draft",
  paperTitle: "The question",
  from: "Sample customer. Technical question",
  marks: [
    {
      text: "What changed in the latest product context?",
      note: "Draft pulls the current brief. Review it before it leaves the team.",
      take: true,
    },
    {
      text: "Where does qualification stand?",
      note: "Draft lists open qualification questions from shared notes. Nothing is marked complete.",
      take: true,
    },
    {
      text: "Which firmware or test notes apply?",
      note: "Draft points at the notes the agent already has. It does not invent a result.",
      take: true,
    },
    {
      text: "Can we send this as written?",
      note: "No. The reply stays a draft until someone on the team sends it.",
      take: false,
    },
  ],
  reply: {
    to: "Sample customer",
    subject: "Technical question. Draft reply for review",
    body: "Sharing a sourced draft for this technical question. It uses product context, qualification notes, and firmware or test notes the agent can already see. Please review. Nothing has been sent.",
  },
};

export const ACCOUNT_RESEARCH: Extract<Artifact, { kind: "outbound" }> = {
  kind: "outbound",
  title: "Public-evidence account research pack",
  account: "Target account",
  hypothesis: [
    {
      k: "Why this work",
      body: "An agent with a computer can collect public pages and keep a research pack in draft while people keep the judgment.",
    },
    {
      k: "Why this moment",
      body: "Current news is in the pack with source links. It is a signal for review, not a claim.",
    },
    {
      k: "Why these teams",
      body: "The customer team and the engineering team review the pack before anything is sent.",
    },
  ],
  evidence: [
    {
      source: "Public company pages",
      finding:
        "Company pages are collected with source links. Public copy only.",
    },
    {
      source: "Public careers pages",
      finding:
        "Open roles are a signal rather than proof. They stay in the pack as links.",
    },
    {
      source: "Public news",
      finding:
        "Current news is collected with source links. Nothing private is in this draft.",
    },
  ],
  targets: [
    {
      name: "Engineering team",
      role: "Review",
      why: "They review the pack before it is treated as ready.",
    },
    {
      name: "Customer team",
      role: "Review",
      why: "They review the pack before any outreach draft moves.",
    },
  ],
  page: {
    headline: "A research pack for Target account",
    body: "Public evidence only. Company pages, careers pages, and current news sit in this draft with source links. The customer team and the engineering team review it. Nothing is sent.",
  },
};

export const JOBS: CroJob[] = [
  {
    id: "standardize-room",
    number: 1,
    title: "Build the engineering context brief",
    trigger: "A product review starts",
    backgroundAction: "Gathering design, firmware, test, and qualification context",
    problem:
      "A product review goes better when the context is already in one place. Design notes, firmware notes, test notes, and qualification questions should not be a scavenger hunt.",
    botJob:
      "When a product review starts, Product Context Agent opens its computer and drafts a brief the engineering team can review.",
    storyboard: [
      {
        when: "Product review",
        label: "The review starts. The agent is already on its computer.",
        scene: "call",
        visual: {
          kind: "live-call",
          title: "Product review",
          people: [
            { initials: "YO", name: "You" },
            { initials: "ET", name: "Engineering team" },
          ],
        },
      },
      {
        when: "In the background",
        label: "It gathers product context while the room stays on the review.",
        scene: "notes",
        visual: {
          kind: "deck-update",
          eyebrow: "Illustrative workflow",
          headline: "Engineering context brief",
          product: "Design, firmware, test, qualification",
          status: "Draft in review",
        },
      },
      {
        when: "Ready for review",
        label: "A review-ready engineering context brief is waiting.",
        scene: "deck",
        slides: CONTEXT_BRIEF_SLIDES,
      },
    ],
    unlock:
      "The review can walk one brief instead of hunting notes across tools.",
    outcome: "A review-ready engineering context brief.",
    clips: ["03-slides-granola"],
    demo: {
      title: "Product Context Agent",
      subtitle: "Product review. Brief in draft",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "context",
          name: "Product Context Agent",
          role: "bot",
          persona: "Drafts an engineering context brief the room can review",
          color: "#b11f3a",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "context",
          kind: "routine",
          body: "Product review is open. I am on my computer. Pulling design, firmware, test, and qualification notes into one brief.",
        },
        {
          id: "m2",
          from: "context",
          kind: "text",
          body: "The brief is taking shape. Design, firmware, test, and qualification stay in scope. Nothing is marked final.",
        },
        {
          id: "m3",
          from: "context",
          kind: "text",
          body: "Open questions stay open. The last pages are the artifact the room can walk.",
        },
        {
          id: "m4",
          from: "context",
          kind: "draft",
          draftLabel: "Engineering context brief. In review",
          artifact: {
            kind: "slides",
            title: "Engineering context brief",
            cards: CONTEXT_BRIEF_SLIDES,
          },
        },
        {
          id: "m5",
          from: "context",
          kind: "draft",
          draftLabel: "One-pager the room can keep",
          artifact: {
            kind: "one-pager",
            title: "Product review note",
            eyebrow: "Illustrative workflow",
            sections: [
              {
                heading: "In the brief",
                body: "Product context from design tools, firmware, test code, and qualification flows.",
              },
              {
                heading: "Still open",
                body: "Questions that need a person. No claim is marked complete.",
              },
              {
                heading: "For the room",
                body: "Walk the brief in the review. Edit it. Then decide what leaves this draft.",
              },
            ],
          },
        },
        {
          id: "m6",
          from: "context",
          kind: "draft",
          draftLabel: "Inside note. Not sent",
          artifact: {
            kind: "packet",
            title: "Note for the engineering team",
            fields: [
              {
                label: "What this is",
                value:
                  "A draft brief for the product review. Context only. Not a customer statement.",
              },
              {
                label: "What it covers",
                value:
                  "Design notes, firmware notes, test notes, and qualification questions.",
              },
              {
                label: "What it does not do",
                value:
                  "It does not send, close a question, or speak for Sample customer.",
              },
            ],
          },
        },
        {
          id: "m7",
          from: "context",
          kind: "draft",
          draftLabel: "Mail draft. Not sent",
          artifact: {
            kind: "gmail",
            title: "Share the brief",
            to: "Engineering team",
            subject: "Product review. Engineering context brief for review",
            body: "The review brief is in draft. Product context, open questions, and the next pass are in one place. Please review. Nothing has been sent.",
          },
        },
        {
          id: "m8",
          from: "context",
          kind: "system",
          body: "Nothing sent. The brief stays a draft until someone on the team moves it.",
        },
      ],
    },
  },
  {
    id: "legal-redlines",
    number: 2,
    title: "Draft the technical answer",
    trigger: "A technical question lands",
    backgroundAction: "Searching product knowledge and internal notes",
    problem:
      "A technical question can sit while people hunt product context, firmware notes, and qualification status. The customer team waits. The engineering team repeats itself.",
    botJob:
      "Technical Answer Agent watches for the question, searches what it can already see, and drafts a sourced reply. A person reviews it.",
    storyboard: [
      {
        when: "The question lands",
        label: "A technical question arrives. The agent starts on its computer.",
        scene: "notes",
        visual: {
          kind: "procurement-email",
          sender: "Sample customer",
          subject: "Technical question",
          questions: 4,
        },
      },
      {
        when: "In the background",
        label: "It checks product context, qualification notes, and firmware notes.",
        scene: "inspect",
        visual: {
          kind: "answers-found",
          sources: [
            { name: "Product context", answer: "Current brief pulled" },
            { name: "Qualification notes", answer: "Open items listed" },
            { name: "Firmware notes", answer: "Matching notes tagged" },
          ],
          status: "Draft in review",
        },
      },
      {
        when: "Ready for review",
        label: "A sourced technical answer draft is waiting.",
        scene: "send",
        artifact: TECHNICAL_ANSWER,
      },
    ],
    unlock:
      "The question comes in. A sourced draft comes out. No chase across the company.",
    outcome: "A sourced technical answer draft.",
    clips: ["01-morning-inbox"],
    demo: {
      title: "Technical Answer Agent",
      subtitle: "Technical question. Draft waiting",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "answer",
          name: "Technical Answer Agent",
          role: "bot",
          persona: "Drafts a sourced reply so the team reviews instead of hunting notes",
          color: "#7c1630",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "answer",
          kind: "routine",
          body: "New technical question from Sample customer. I am on my computer. Checking product context, qualification notes, and firmware notes.",
        },
        {
          id: "m2",
          from: "answer",
          kind: "text",
          body: "The draft is up. Sources are attached to each line. Nothing has been sent.",
        },
        {
          id: "m3",
          from: "answer",
          kind: "draft",
          draftLabel: "Questions and reply. In review",
          artifact: TECHNICAL_ANSWER,
        },
        {
          id: "m4",
          from: "answer",
          kind: "draft",
          draftLabel: "Mail draft. Not sent",
          artifact: {
            kind: "gmail",
            title: "Reply to Sample customer",
            to: TECHNICAL_ANSWER.reply.to,
            subject: TECHNICAL_ANSWER.reply.subject,
            body: TECHNICAL_ANSWER.reply.body,
          },
        },
        {
          id: "m5",
          from: "answer",
          kind: "system",
          body: "Nothing sent. The reply stays a draft until someone taps send.",
        },
      ],
    },
  },
  {
    id: "attach-engine",
    number: 3,
    title: "Pack the account research",
    trigger: "A target account enters the list",
    backgroundAction: "Reading public evidence and drafting the pack",
    problem:
      "Account research that starts from a list is thin. A useful pack starts from public evidence, a clear point of view, and a review step before anyone writes out.",
    botJob:
      "When a target account enters the list, Account Research Agent reads public pages and drafts a research pack. Draft only.",
    storyboard: [
      {
        when: "On the list",
        label: "Target account enters the list. The agent starts without a prompt.",
        scene: "inspect",
        visual: {
          kind: "account-research",
          account: "Target account",
          sources: ["Company pages", "Careers", "News"],
          signal: "Public evidence",
        },
      },
      {
        when: "In the background",
        label: "It turns public pages into a short point of view.",
        scene: "notes",
        visual: {
          kind: "three-why",
          items: [
            { label: "Why this work", answer: "Public pages on a computer" },
            { label: "Why this moment", answer: "Current public news" },
            { label: "Why these teams", answer: "Customer and engineering review" },
          ],
        },
      },
      {
        when: "Ready for review",
        label: "A public-evidence account research pack is waiting.",
        scene: "send",
        artifact: ACCOUNT_RESEARCH,
      },
    ],
    unlock:
      "Public evidence, a point of view, and a pack the team can review. Nothing goes out on its own.",
    outcome: "A public-evidence account research pack.",
    clips: ["02-prospecting-pg"],
    demo: {
      title: "Account Research Agent",
      subtitle: "Target account. Pack in draft",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "research",
          name: "Account Research Agent",
          role: "bot",
          persona: "Reads public pages and drafts a research pack",
          color: "#2a2622",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "research",
          kind: "routine",
          body: "Target account is on the list. I am on my computer. Reading public pages only. Drafts stay drafts.",
        },
        {
          id: "m2",
          from: "research",
          kind: "text",
          body: "Company pages, careers pages, and current news are in the pack with source links. Open roles are a signal rather than proof. The customer team and the engineering team review it. Not a private brief.",
        },
        {
          id: "m3",
          from: "research",
          kind: "draft",
          draftLabel: "Point of view. In review",
          artifact: {
            kind: "packet",
            title: "Target account point of view",
            fields: ACCOUNT_RESEARCH.hypothesis.map((item) => ({
              label: item.k,
              value: item.body,
            })),
          },
        },
        {
          id: "m4",
          from: "research",
          kind: "draft",
          draftLabel: "Evidence and who reviews it",
          artifact: {
            kind: "packet",
            title: "Public evidence, then the teams",
            fields: [
              ...ACCOUNT_RESEARCH.evidence.map((item) => ({
                label: item.source,
                value: item.finding,
              })),
              ...ACCOUNT_RESEARCH.targets.map((person) => ({
                label: `${person.name}. ${person.role}`,
                value: person.why,
              })),
            ],
          },
        },
        {
          id: "m5",
          from: "research",
          kind: "draft",
          draftLabel: "LinkedIn draft. Not sent",
          artifact: {
            kind: "linkedin",
            title: "Note to the engineering team",
            to: "Engineering team",
            role: "Product, test, and qualification",
            body: "Sharing a short research pack on Target account. Built from public pages only. Draft. Nothing sent.",
          },
        },
        {
          id: "m6",
          from: "research",
          kind: "draft",
          draftLabel: "Mail draft. Not sent",
          artifact: {
            kind: "gmail",
            title: "Mail to the customer team",
            to: "Customer team",
            subject: "Target account. Public-evidence pack for review",
            body: "The research pack is in draft. Public pages only. A point of view, not a confirmed need. Please review. Nothing has been sent.",
          },
        },
        {
          id: "m7",
          from: "research",
          kind: "draft",
          draftLabel: "Account page. Not live",
          artifact: {
            kind: "one-pager",
            title: ACCOUNT_RESEARCH.page.headline,
            eyebrow: "Illustrative workflow",
            sections: [
              {
                heading: "What is public",
                body:
                  ACCOUNT_RESEARCH.evidence[0]?.finding ??
                  "Public pages on the account.",
              },
              {
                heading: "Who reviews it",
                body:
                  ACCOUNT_RESEARCH.hypothesis.find((item) => item.k === "Why these teams")
                    ?.body ?? "Engineering and customer teams.",
              },
              {
                heading: "How to read it",
                body: ACCOUNT_RESEARCH.page.body,
              },
            ],
          },
        },
        {
          id: "m8",
          from: "research",
          kind: "system",
          body: "Nothing sent. LinkedIn, mail, and the page stay drafts until someone moves them.",
        },
      ],
    },
  },
];

export function getJob(id: string): CroJob | undefined {
  return JOBS.find((job) => job.id === id);
}
