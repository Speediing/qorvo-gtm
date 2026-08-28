import { QUOTES } from "@/data/quotes";

function initial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "?";
}

export function QuoteWall() {
  return (
    <section id="testimonials" className="quotes">
      <h2>Testimonials</h2>
      <p className="section-lede">
        Six reactions that capture the persistent-agent difference.
      </p>
      <div className="quote-thread">
        {QUOTES.map((quote) => (
          <article
            key={`${quote.handle}-${quote.date}-${quote.source}`}
            className="quote-row"
          >
            <div className="quote-who">
              <span className="quote-avatar" aria-hidden>
                {initial(quote.name)}
              </span>
              <div>
                <p className="quote-name">{quote.name}</p>
                <p className="quote-handle">{quote.handle}</p>
              </div>
            </div>
            <blockquote className="quote-bubble">{quote.quote}</blockquote>
            {quote.source ? (
              <a
                href={quote.source}
                target="_blank"
                rel="noopener noreferrer"
                className="quote-source"
              >
                Read source →
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
