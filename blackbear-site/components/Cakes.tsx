"use client";
import { useState } from "react";
import { branches, cakeStory, cakeStoryDate, cakes } from "@/lib/data";
import Img from "./Img";
import { CakeDrawn, DiamondRow } from "./Doodles";
import { IconPhone } from "./Icons";

const dateLabel = new Date(cakeStoryDate + "T00:00:00+08:00").toLocaleDateString("en-PH", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "Asia/Manila",
});

export default function Cakes() {
  const withStory = Object.keys(cakeStory).map((id) => branches.find((b) => b.id === id)!).filter(Boolean);
  const [sel, setSel] = useState(withStory[0].id);
  const b = branches.find((x) => x.id === sel)!;
  const list = (cakeStory[sel] ?? []).map((id) => cakes.find((c) => c.id === id)!).filter(Boolean);

  return (
    <section className="section section--forest cakes" id="cakes">
      <div className="wrap">
        <div className="section-head section-head--split">
          <div>
            <span className="eyebrow" data-reveal>
              Today&apos;s cake selection
            </span>
            <h2 className="retro" data-reveal>
              Cake Story
            </h2>
          </div>
          <p className="lead" data-reveal>
            Every campsite bakes a different lineup. Instead of a story that disappears in 24 hours, the cake case lives here, updated by the crew each
            morning.
          </p>
        </div>

        <DiamondRow fill="#c5a781" ink="#43553d" />

        <div className="branch-tabs" role="tablist" aria-label="Choose a campsite">
          {withStory.map((x) => (
            <button key={x.id} role="tab" aria-selected={sel === x.id} onClick={() => setSel(x.id)}>
              {x.short}
            </button>
          ))}
        </div>

        <div className="cake-board" role="tabpanel" aria-label={`Cakes at ${b.name}`}>
          <div className="cake-board__head">
            <h3 className="display h3">{b.name}</h3>
            <span className="pill">Cake Story · {dateLabel}</span>
          </div>
          {list.length ? (
            <div className="cake-grid">
              {list.map((c) => (
                <div className="cake" key={c.id}>
                  {c.image ? (
                    <div className="cake__img">
                      <Img slug={c.image} alt={c.name} sizes="(min-width: 1100px) 18vw, (min-width: 760px) 30vw, 46vw" />
                    </div>
                  ) : (
                    <div className="cake__img cake__img--drawn">
                      <CakeDrawn />
                      <span>photo coming soon</span>
                    </div>
                  )}
                  <div className="cake__name">{c.name}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="cake-empty">
              <div className="hand">No cake story posted yet today.</div>
            </div>
          )}
          <div className="cake-foot">
            <span>Sample day copied from Black Bear&apos;s Cake Story. Slices go fast, so call ahead to reserve one.</span>
            {b.phone && (
              <a className="btn btn--cream btn--small" href={`tel:${b.phone.replace(/\s/g, "")}`}>
                <IconPhone /> Call {b.short}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
