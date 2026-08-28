import type { JobId } from "./types";

export type FleetAgent = {
  id: string;
  name: string;
  task: string;
  status: "active";
  color: string;
  jobId?: JobId;
};

export const FLEET: FleetAgent[] = [
  {
    id: "product-context",
    name: "Product Context Agent",
    task: "Drafting a review brief from design, firmware, test, and qualification notes",
    status: "active",
    color: "#b11f3a",
    jobId: "standardize-room",
  },
  {
    id: "technical-answer",
    name: "Technical Answer Agent",
    task: "Sourcing a reply to a technical question",
    status: "active",
    color: "#7c1630",
    jobId: "legal-redlines",
  },
  {
    id: "test-triage",
    name: "Test Triage Agent",
    task: "Sorting open test notes for the engineering team",
    status: "active",
    color: "#3d3a36",
  },
  {
    id: "qualification",
    name: "Qualification Agent",
    task: "Listing open qualification questions for review",
    status: "active",
    color: "#5c4a46",
  },
  {
    id: "customer-brief",
    name: "Customer Brief Agent",
    task: "Assembling a review note for the customer team",
    status: "active",
    color: "#8a3a2a",
  },
  {
    id: "account-research",
    name: "Account Research Agent",
    task: "Building a public-evidence pack for a target account",
    status: "active",
    color: "#2a2622",
    jobId: "attach-engine",
  },
  {
    id: "follow-up",
    name: "Follow-Up Agent",
    task: "Queuing a follow-up draft. Nothing sent",
    status: "active",
    color: "#9a4a3a",
  },
  {
    id: "chief-of-staff",
    name: "Chief of Staff Agent",
    task: "Routing work across the fleet and keeping drafts in review",
    status: "active",
    color: "#4a3c38",
  },
];
