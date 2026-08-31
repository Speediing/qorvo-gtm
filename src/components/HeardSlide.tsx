import type { SlideCard } from "@/data/types";

export function HeardSlide({
  slides,
  size = "lg",
}: {
  slides: SlideCard[];
  size?: "sm" | "lg";
  wash?: string;
}) {
  const lead = slides[0];

  return (
    <div className={`leave leave-heard size-${size}`}>
      <article className="heard-slide">
        <div className="heard-bar">
          <span>Illustrative workflow</span>
          <span>Review draft</span>
        </div>
        <div className="heard-main">
          <h3>{lead?.title ?? "Engineering context brief"}</h3>
          <ol>
            {slides.map((card) => (
              <li key={card.n}>
                {card.kicker ? <p className="heard-tag">{card.kicker}</p> : null}
                <p className="heard-quote">{card.body}</p>
              </li>
            ))}
          </ol>
        </div>
        {slides.length > 1 ? (
          <div className="heard-map">
            <p>Pages in this draft</p>
            <ul>
              {slides.map((card) => (
                <li key={`map-${card.n}`}>
                  <strong>{String(card.n).padStart(2, "0")}</strong> {card.title}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </article>
    </div>
  );
}
