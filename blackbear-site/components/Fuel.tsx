"use client";
import Img from "./Img";
import { signatures } from "@/lib/data";
import {
  BearLine,
  CurlyArrow,
  Heart,
  Ring,
  Sparkle,
  Squiggle,
  Star,
  Stamp,
  Sun,
} from "./Doodles";

const D = {
  heart: Heart,
  sparkle: Sparkle,
  sun: Sun,
  star: Star,
  squiggle: Squiggle,
} as const;

/** "Your daily dose of good fuel": their post style, with doodles that pen themselves in. */
export default function Fuel() {
  return (
    <section className="section section--forest fuel" id="fuel">
      <BearLine className="fuel__bear" />
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow" data-reveal>
            Signatures from the kitchen
          </span>
          <h2 className="retro" data-reveal>
            Your Daily Dose
            <br />
            of Good Fuel
          </h2>
        </div>
        <div className="fuel__grid">
          {signatures.map((s, i) => {
            const Doodle = D[s.doodle];
            return (
              <article className="fuel__card" key={s.name}>
                <div style={{ position: "relative" }}>
                  <Ring seed={i} />
                  <div
                    className="fuel__photo"
                    data-reveal
                    data-delay={String((i % 3) * 0.08)}
                  >
                    <Img
                      slug={s.image}
                      alt={s.name}
                      sizes="(min-width: 900px) 30vw, 50vw"
                    />
                  </div>
                  <Doodle className="fuel__doodle" />
                  <Stamp
                    value={`₱${s.price}`}
                    size={i < 2 ? 92 : 74}
                    className="fuel__stamp"
                  />
                </div>
                <div className="fuel__label">
                  <CurlyArrow className="fuel__arrow" flip={i % 2 === 1} />
                  <div>
                    <div className="hand">{s.name}</div>
                    <small>{s.note}</small>
                  </div>
                </div>
                <a
                  className="fuel__browse"
                  href={`/menu?search=${encodeURIComponent(s.name)}`}
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("bb:menu", {
                        detail: { mode: "food", query: s.name },
                      }),
                    )
                  }
                >
                  Find on the menu <span aria-hidden="true">↗</span>
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
