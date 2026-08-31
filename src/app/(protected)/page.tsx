import { CompareTable } from "@/components/CompareTable";
import { HeroDemo } from "@/components/HeroDemo";
import { HeroTelemetry } from "@/components/HeroTelemetry";
import { JobSection } from "@/components/JobSection";
import { QuoteWall } from "@/components/QuoteWall";
import { RosterChart } from "@/components/RosterChart";
import { SiteNav } from "@/components/SiteNav";
import { JOBS } from "@/data/jobs";

export default function HomePage() {
  return (
    <main id="top">
      <div className="hero-watercolor">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hero-watercolor-image"
          src="/brand/watercolor-header.svg"
          alt=""
        />
        <SiteNav />
      </div>

      <div className="report-band">
        <div className="report">
          <div className="report-hero">
            <HeroTelemetry />
            <HeroDemo />

            <section className="usecase-framing">
              <p className="eyebrow">Three illustrative workflows</p>
              <h2>
                Qorvo works across RF, analog, mixed-signal, power,
                connectivity, and sensing. Agents with computers can keep that
                work moving while people decide.
              </h2>
              <p>
                Qorvo is preparing for a combination with Skyworks and shifting
                toward defense, infrastructure, and power. These three workflows
                are a point of view. They are not a confirmed Qorvo need.
              </p>
            </section>

            <div className="metric-grid">
              {JOBS.map((job) => (
                <a
                  key={job.id}
                  className="metric-card"
                  href={`#${job.id}`}
                >
                  <div className="metric-card-top">
                    <p>Sample {String(job.number).padStart(2, "0")}</p>
                  </div>
                  <h2>{job.title}</h2>
                  <p className="metric-trigger">Starts when {job.trigger.toLowerCase()}</p>
                </a>
              ))}
            </div>
          </div>

          <RosterChart />

          <div id="jobs">
            {JOBS.map((job) => (
              <JobSection key={job.id} job={job} />
            ))}
          </div>
        </div>
      </div>

      <div className="orbit-break" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/watercolor-orbit.svg" alt="" />
      </div>

      <div className="report">
        <CompareTable />
        <QuoteWall />
      </div>

      <footer className="site-footer">
        <div>
          <p className="footer-title">Qorvo x SpaceXAI</p>
          <p>A point of view for engineering and customer teams</p>
        </div>
        <address className="footer-contact">
          <p>Cursor contact</p>
          <strong>Mike Weinert</strong>
          <a href="mailto:mike.weinert@cursor.com">
            mike.weinert@cursor.com
          </a>
        </address>
      </footer>
    </main>
  );
}
