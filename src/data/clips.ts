import type { Clip, ClipId } from "./types";

function clip(
  id: ClipId,
  title: string,
  caption: string,
): Clip {
  return {
    id,
    file: `/api/media/clips/${id}.mp4`,
    poster: `/media/clips/${id}.jpg`,
    title,
    caption,
  };
}

export const CLIPS: Record<ClipId, Clip> = {
  "01-morning-inbox": clip(
    "01-morning-inbox",
    "Technical question",
    "A sourced reply stays in draft for review.",
  ),
  "02-prospecting-pg": clip(
    "02-prospecting-pg",
    "Account research",
    "Public pages collected for a target account pack.",
  ),
  "03-slides-granola": clip(
    "03-slides-granola",
    "Product review",
    "An engineering context brief stays in draft.",
  ),
  "04-engineer-bugbot": clip(
    "04-engineer-bugbot",
    "Test notes",
    "Open test notes stay on the computer.",
  ),
  "05-forecast-sfdc": clip(
    "05-forecast-sfdc",
    "Qualification",
    "Open qualification questions listed for review.",
  ),
  "06-customer-expert": clip(
    "06-customer-expert",
    "Customer brief",
    "A review note for the customer team.",
  ),
  "07-customer-exec-brief": clip(
    "07-customer-exec-brief",
    "Follow-up",
    "A follow-up draft. Nothing sent.",
  ),
  "08-chief-groupchat": clip(
    "08-chief-groupchat",
    "Chief of staff",
    "Work routed across the fleet. Drafts stay drafts.",
  ),
};

export const ALL_CLIPS: Clip[] = Object.values(CLIPS);
