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
            A little something sweet
            </span>
            <h2 className="retro" data-reveal>
              Cake Story
            </h2>
          </div>
          <p className="lead" data-reveal>
            A different lineup at every campsite. Take a peek at a sample Cake Story, find your favorite slice, then call the crew for today&apos;s selection.
          </p>
        </div>

        <DiamondRow fill="#c5a781" ink="#43553d" />

        <div className="branch-tabs" role="tablist" aria-label="Choose a campsite">
          {withStory.map((x, index) => (
            <button key={x.id} id={`cake-tab-${x.id}`} role="tab" aria-selected={sel === x.id} aria-controls="cake-panel" tabIndex={sel === x.id ? 0 : -1} onClick={() => setSel(x.id)} onKeyDown={(event) => {
              let next = index;
              if (event.key === "ArrowRight") next = (index + 1) % withStory.length;
              else if (event.key === "ArrowLeft") next = (index + withStory.length - 1) % withStory.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = withStory.length - 1;
              else return;
              event.preventDefault();
              setSel(withStory[next].id);
              document.getElementById(`cake-tab-${withStory[next].id}`)?.focus({ preventScroll: true });
              document.getElementById(`cake-tab-${withStory[next].id}`)?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "instant" });
            }}>
              {x.short}
            </button>
          ))}
        </div>

        <div className="cake-board" id="cake-panel" role="tabpanel" aria-labelledby={`cake-tab-${sel}`} tabIndex={0}>
          <div className="cake-board__head">
            <h3 className="display h3">{b.name}</h3>
            <span className="pill">Sample selection · {dateLabel}</span>
          </div>
          {list.length ? (
            <div className="cake-grid" key={sel}>
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
