import type { Artifact, DemoMessage, SlideCard } from "@/data/types";
import type { ComputerBeat } from "@/data/screens";
import { CONTEXT_BRIEF_SLIDES } from "@/data/jobs";
import { HeardSlide } from "./HeardSlide";

function asSlides(artifact?: Artifact) {
  return artifact?.kind === "slides" ? artifact : null;
}
function asTable(artifact?: Artifact) {
  return artifact?.kind === "table" ? artifact : null;
}
function asGmail(artifact?: Artifact) {
  return artifact?.kind === "gmail" ? artifact : null;
}
function asSlack(artifact?: Artifact) {
  return artifact?.kind === "slack" ? artifact : null;
}
function asOnePager(artifact?: Artifact) {
  return artifact?.kind === "one-pager" ? artifact : null;
}
function asForecast(artifact?: Artifact) {
  return artifact?.kind === "forecast" ? artifact : null;
}
function asTalks(artifact?: Artifact) {
  return artifact?.kind === "talk-tracks" ? artifact : null;
}
function asGaps(artifact?: Artifact) {
  return artifact?.kind === "gaps" ? artifact : null;
}
function asPacket(artifact?: Artifact) {
  return artifact?.kind === "packet" ? artifact : null;
}
function asLinkedin(artifact?: Artifact) {
  return artifact?.kind === "linkedin" ? artifact : null;
}
function asOutbound(artifact?: Artifact) {
  return artifact?.kind === "outbound" ? artifact : null;
}

export function SiteScreen({
  beat,
  message,
  account,
  sent,
}: {
  beat: ComputerBeat;
  message?: DemoMessage;
  account: string;
  sent: boolean;
}) {
  const artifact = message?.artifact;

  switch (beat.site) {
    case "granola":
      return <NotesScreen account={account} />;
    case "figma":
      return <FigmaScreen account={account} artifact={artifact} />;
    case "gong":
      return <GongScreen account={account} />;
    case "sfdc-account":
      return <SfdcAccountScreen account={account} />;
    case "sfdc-opp":
      return (
        <SfdcOppScreen
          account={account}
          highlight={Boolean(asGaps(artifact))}
        />
      );
    case "sheets":
      return <SheetsScreen account={account} artifact={artifact} />;
    case "gmail":
      return (
        <GmailScreen account={account} artifact={asGmail(artifact)} sent={sent} />
      );
    case "linkedin":
      return (
        <LinkedInScreen
          account={account}
          artifact={asLinkedin(artifact)}
          sent={sent}
        />
      );
    case "research":
      return <ResearchScreen account={account} />;
    case "page":
      return (
        <PageScreen
          account={account}
          onePager={asOnePager(artifact)}
          outbound={asOutbound(artifact)}
        />
      );
    case "slack":
      return (
        <SlackScreen account={account} artifact={asSlack(artifact)} sent={sent} />
      );
    case "gdoc":
      return (
        <GdocScreen
          account={account}
          onePager={asOnePager(artifact)}
          forecast={asForecast(artifact)}
          talks={asTalks(artifact)}
          packet={asPacket(artifact)}
        />
      );
    default:
      return <NotesScreen account={account} />;
  }
}

function NotesScreen({ account }: { account: string }) {
  return (
    <div className="site site-granola">
      <header>
        <strong>Notes</strong>
        <span>Live. In review</span>
      </header>
      <p className="site-time">Product review is open. Gathering context</p>
      <ul>
        <li>
          <span>Now</span> Design notes are in the brief.
        </li>
        <li>
          <span>Now</span> Firmware notes tagged for the engineering team.
        </li>
        <li>
          <span>Now</span> Test notes listed. Nothing marked complete.
        </li>
        <li>
          <span>Now</span> Qualification questions stay open.
        </li>
        <li>
          <span>Now</span> {account} is open. No customer quote in this draft.
        </li>
      </ul>
    </div>
  );
}

function FigmaScreen({
  account,
  artifact,
}: {
  account: string;
  artifact?: Artifact;
}) {
  const slides = asSlides(artifact);
  const packet = artifact?.kind === "packet" ? artifact : null;
  const pager = asOnePager(artifact);
  const cards: SlideCard[] = slides?.cards ?? CONTEXT_BRIEF_SLIDES;

  return (
    <div className="site site-figma">
      <header>
        <span className="figma-logo">F</span>
        <strong>
          {slides
            ? slides.title
            : pager
              ? `${account} one-pager`
              : packet
                ? `${account} inside note`
                : `${account} brief`}
        </strong>
        <em>Draft</em>
      </header>
      <div className="figma-board">
        {packet ? (
          <div className="figma-doc">
            {packet.fields.map((field) => (
              <p key={field.label}>
                <b>{field.label}</b>
                {field.value}
              </p>
            ))}
          </div>
        ) : pager ? (
          <div className="figma-doc">
            {pager.sections.map((section) => (
              <p key={section.heading}>
                <b>{section.heading}</b>
                {section.body}
              </p>
            ))}
          </div>
        ) : (
          <HeardSlide slides={cards} size="sm" />
        )}
      </div>
    </div>
  );
}

function GongScreen({ account }: { account: string }) {
  return (
    <div className="site site-gong">
      <header>
        <strong>Call notes</strong>
        <span>{account}. In review</span>
      </header>
      <div className="gong-recap">
        <h4>Recap</h4>
        <ul>
          <li>Product review is open</li>
          <li>Engineering team is in the room</li>
          <li>Brief stays in draft</li>
          <li>Nothing sent</li>
        </ul>
      </div>
    </div>
  );
}

function SfdcAccountScreen({ account }: { account: string }) {
  return (
    <div className="site site-sfdc">
      <header>
        <span className="sfdc-cloud" />
        <strong>Account</strong>
        <em>Draft</em>
      </header>
      <div className="sfdc-title">
        <p>Account</p>
        <h3>{account}</h3>
      </div>
      <dl className="sfdc-fields">
        <div>
          <dt>Work</dt>
          <dd>Product review</dd>
        </div>
        <div>
          <dt>Team</dt>
          <dd>Engineering team</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>In review</dd>
        </div>
        <div>
          <dt>Send</dt>
          <dd>Not sent</dd>
        </div>
      </dl>
    </div>
  );
}

function SfdcOppScreen({
  account,
  highlight,
}: {
  account: string;
  highlight: boolean;
}) {
  return (
    <div className="site site-sfdc">
      <header>
        <span className="sfdc-cloud" />
        <strong>Opportunity</strong>
        <em>Draft</em>
      </header>
      <div className="sfdc-title">
        <p>Opportunity</p>
        <h3>{account}</h3>
      </div>
      <dl className="sfdc-fields">
        <div>
          <dt>Stage</dt>
          <dd>In review</dd>
        </div>
        <div className={highlight ? "gap" : undefined}>
          <dt>Next meeting</dt>
          <dd>Not on the calendar</dd>
        </div>
        <div className={highlight ? "gap" : undefined}>
          <dt>Pack</dt>
          <dd>Draft only</dd>
        </div>
        <div className={highlight ? "gap" : undefined}>
          <dt>Inside contact</dt>
          <dd>Engineering team</dd>
        </div>
      </dl>
    </div>
  );
}

function SheetsScreen({
  account,
  artifact,
}: {
  account: string;
  artifact?: Artifact;
}) {
  const table = asTable(artifact);
  const rows = table
    ? table.rows
    : [
        [account, "Engineering team", "In review", "Product review", "Draft"],
        ["Target account", "Customer team", "In review", "Account research", "Draft"],
        ["Sample customer", "Engineering team", "In review", "Technical question", "Draft"],
      ];
  const cols = table
    ? table.columns
    : ["Account", "Team", "Status", "Work", "Next"];

  return (
    <div className="site site-sheets">
      <header>
        <span className="sheets-mark">Sheets</span>
        <strong>
          {table ? `${account} next steps` : "Accounts in review"}
        </strong>
      </header>
      <table>
        <thead>
          <tr>
            {cols.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GmailScreen({
  account,
  artifact,
  sent,
}: {
  account: string;
  artifact: ReturnType<typeof asGmail>;
  sent: boolean;
}) {
  return (
    <div className="site site-gmail">
      <header>
        <strong>Gmail</strong>
        <em>{sent ? "Sent" : "Draft. Not sent"}</em>
      </header>
      <p>
        <span>To</span>
        {artifact?.to || `${account} contact`}
      </p>
      <p>
        <span>Subject</span>
        {artifact?.subject || `${account}. Draft for review`}
      </p>
      <div>{artifact?.body || "Draft parked here until someone sends it."}</div>
    </div>
  );
}

function SlackScreen({
  account,
  artifact,
  sent,
}: {
  account: string;
  artifact: ReturnType<typeof asSlack>;
  sent: boolean;
}) {
  return (
    <div className="site site-slack">
      <header>
        <h4>{artifact?.channel || "#review"}</h4>
        <em>{sent ? "Sent" : "Draft. Not sent"}</em>
      </header>
      <div className="slack-draft">
        {artifact?.body ||
          `Note for ${account}. Draft only. Nothing posted.`}
      </div>
    </div>
  );
}

function GdocScreen({
  account,
  onePager,
  forecast,
  talks,
  packet,
}: {
  account: string;
  onePager: ReturnType<typeof asOnePager>;
  forecast: ReturnType<typeof asForecast>;
  talks: ReturnType<typeof asTalks>;
  packet: ReturnType<typeof asPacket>;
}) {
  return (
    <div className="site site-gdoc">
      <header>
        <strong>Docs</strong>
        <span>
          {forecast
            ? `${account} note`
            : talks
              ? "Talk tracks"
              : packet
                ? packet.title
                : onePager?.title || `${account} brief`}
        </span>
      </header>
      <article>
        {forecast ? (
          <>
            <p className="gdoc-status">{forecast.status}</p>
            <p>{forecast.body}</p>
          </>
        ) : talks ? (
          talks.tracks.map((track) => (
            <p key={track.seat}>
              <b>{track.seat}.</b> {track.line}
            </p>
          ))
        ) : packet ? (
          packet.fields.map((field) => (
            <p key={field.label}>
              <b>{field.label}.</b> {field.value}
            </p>
          ))
        ) : onePager ? (
          onePager.sections.map((section) => (
            <p key={section.heading}>
              <b>{section.heading}.</b> {section.body}
            </p>
          ))
        ) : (
          <p>Working note for {account}.</p>
        )}
      </article>
    </div>
  );
}

function ResearchScreen({ account }: { account: string }) {
  return (
    <div className="site site-research">
      <header>
        <strong>{account}</strong>
        <span>Public pages only</span>
      </header>
      <p className="site-time">Researching the account. Not a sequence</p>
      <ul>
        <li>
          <span>Pages</span> Company pages collected with source links.
        </li>
        <li>
          <span>Careers</span> Open roles are a signal rather than proof.
        </li>
        <li>
          <span>News</span> Current news collected with source links.
        </li>
        <li>
          <span>Teams</span> Customer team and engineering team review the pack
          before anything is sent.
        </li>
      </ul>
    </div>
  );
}

function LinkedInScreen({
  account,
  artifact,
  sent,
}: {
  account: string;
  artifact: ReturnType<typeof asLinkedin>;
  sent: boolean;
}) {
  return (
    <div className="site site-linkedin">
      <header>
        <strong>LinkedIn</strong>
        <em>{sent ? "Sent" : "Draft. Not sent"}</em>
      </header>
      <p>
        <span>To</span>
        {artifact?.to || `${account}. Engineering team`}
        {artifact?.role ? ` · ${artifact.role}` : ""}
      </p>
      <div>{artifact?.body || "Note parked here until someone sends it."}</div>
    </div>
  );
}

function PageScreen({
  account,
  onePager,
  outbound,
}: {
  account: string;
  onePager: ReturnType<typeof asOnePager>;
  outbound: ReturnType<typeof asOutbound>;
}) {
  const headline =
    outbound?.page.headline || onePager?.title || `For ${account}`;
  const body =
    outbound?.page.body ||
    onePager?.sections.map((section) => section.body).join(" ") ||
    `A page for ${account}. Draft only.`;

  return (
    <div className="site site-page">
      <header>
        <strong>Page</strong>
        <em>Not live</em>
      </header>
      <h4>{headline}</h4>
      {onePager ? (
        onePager.sections.map((section) => (
          <p key={section.heading}>
            <b>{section.heading}.</b> {section.body}
          </p>
        ))
      ) : (
        <p>{body}</p>
      )}
    </div>
  );
}
