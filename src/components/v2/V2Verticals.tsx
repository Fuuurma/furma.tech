import Link from "next/link";

const SAAS_ITEMS = [
  { name: "Tic-Tac-Toe Disappear", tag: "Games", href: "/portfolio/tic-tac-toe-disappear" },
  { name: "Gambit Deck", tag: "Games", href: "/portfolio/gambit-deck" },
  { name: "Bloxs", tag: "Design tools", href: "/portfolio/bloxs" },
  { name: "Renfe", tag: "Civic tech", href: "/portfolio/putarenfe" },
  { name: "Software Factory", tag: "Agent infra", href: "/portfolio/software-factory" },
  { name: "FUDDY", tag: "Food", href: "/portfolio/fuddy" },
  { name: "QArt", tag: "Marketing", href: "/portfolio/qart" },
  { name: "Benxer", tag: "AI tools", href: "/portfolio/benxer" },
];

const AITLAS_ITEMS = [
  { name: "Nova", tag: "AI workspace", href: "/portfolio/aitlas" },
  { name: "Nexus", tag: "Agent runtime", href: "/portfolio/aitlas" },
  { name: "Agents", tag: "Marketplace", href: "/portfolio/aitlas" },
];

export function V2Verticals() {
  return (
    <section className="v2-section" aria-labelledby="v2-verticals">
      <div className="v2-container">
        <div className="v2-section-head">
          <span className="v2-kicker">§03 — The catalogue</span>
          <h2 id="v2-verticals" className="v2-display">
            Where the forging happens
          </h2>
          <p className="v2-lede">
            Two panels: the active catalogue, and Aitlas — the flagship the
            rest of the work is measured against.
          </p>
        </div>

        <div className="v2-verticals">
          <article className="v2-panel v2-panel--light">
            <div className="v2-panel-head">
              <span className="v2-panel-index">V.01</span>
              <span className="v2-panel-pill">The catalogue</span>
            </div>
            <h3 className="v2-panel-title">The active set</h3>
            <p className="v2-panel-copy">
              Games, tools and civic software — every project the studio is
              actually working on, each with its own case study.
            </p>
            <ul className="v2-panel-list">
              {SAAS_ITEMS.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="v2-panel-link">
                    <span>{item.name}</span>
                    <span className="v2-panel-tag">{item.tag}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </article>

          <article className="v2-panel v2-panel--dark">
            <div className="v2-panel-head">
              <span className="v2-panel-index">V.02</span>
              <span className="v2-panel-pill v2-panel-pill--dark">Flagship</span>
            </div>
            <h3 className="v2-panel-title">Aitlas</h3>
            <p className="v2-panel-copy">
              The sovereign AI ecosystem: bring-your-own-key, agentic runtime,
              marketplace. The deep-dive lives on its own page.
            </p>
            <ul className="v2-panel-list v2-panel-list--dark">
              {AITLAS_ITEMS.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="v2-panel-link">
                    <span>{item.name}</span>
                    <span className="v2-panel-tag">{item.tag}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
