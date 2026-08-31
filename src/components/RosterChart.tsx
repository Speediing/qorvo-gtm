import { FLEET, type FleetAgent } from "@/data/fleet";

function Desk({ agent }: { agent: FleetAgent }) {
  const body = (
    <>
      <div className="fleet-monitor" aria-hidden>
        <header className="fleet-chrome">
          <span className="fleet-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="fleet-status">{agent.status}</span>
        </header>
        <p className="fleet-task">{agent.task}</p>
      </div>
      <div className="fleet-base">
        <span className="fleet-name">{agent.name}</span>
      </div>
    </>
  );

  if (agent.jobId) {
    return (
      <a className="fleet-desk" href={`#${agent.jobId}`}>
        {body}
      </a>
    );
  }

  return <article className="fleet-desk">{body}</article>;
}

export function RosterChart() {
  return (
    <section id="roster" className="roster">
      <h2>Eight agents. Each one has a computer.</h2>
      <p className="section-lede">
        The work itself is the trigger. A review starts, a question lands, or a
        target account enters the list. The matching agent picks it up on its
        own machine. Drafts stay drafts until a person sends.
      </p>

      <ul className="fleet-grid">
        {FLEET.map((agent) => (
          <li key={agent.id}>
            <Desk agent={agent} />
          </li>
        ))}
      </ul>
    </section>
  );
}
