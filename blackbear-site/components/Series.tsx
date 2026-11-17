"use client";
import { series } from "@/lib/data";
import Img from "./Img";
import { RailNav, useDragRail } from "./Rail";

export default function Series() {
  const rail = useDragRail();
  return (
    <section className="section section--orange series" id="series">
      <div className="wrap">
        <div className="section-head section-head--split">
          <div>
            <span className="eyebrow" data-reveal>
              Featured series
            </span>
            <h2 className="display h2" data-reveal>
              Pick your trail
            </h2>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 20, flexWrap: "wrap" }}>
            <p className="lead" style={{ margin: 0 }} data-reveal>
              Matcha, protein, refreshers, decaf and smoothies. Each series has its own look in the Black Bear cup.
            </p>
            <RailNav target={rail} />
          </div>
        </div>
        <div className="rail" ref={rail} data-stagger>
          {series.map((s) => (
            <a className="series-card" key={s.id} href="#menu" onClick={() => window.dispatchEvent(new CustomEvent("bb:menu", { detail: "drinks" }))}>
              <div className="series-card__img">
                <Img slug={s.image} alt={s.title} sizes="360px" />
              </div>
              <div className="series-card__body">
                <h3 className="display">{s.title}</h3>
                <p>{s.line}</p>
                <span className="series-card__from">{s.fromLabel ?? `From ₱${s.from}`}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
