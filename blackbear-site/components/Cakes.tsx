"use client";
import { useEffect, useState } from "react";
import { branches, cakeStory, cakeStoryDate, cakes } from "@/lib/data";
import Img from "./Img";
import { CakeDrawn, DiamondRow } from "./Doodles";
import { IconPhone } from "./Icons";
import { useDemo } from "@/lib/demo-store";

const dateLabel = new Date(
  cakeStoryDate + "T00:00:00+08:00",
).toLocaleDateString("en-PH", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "Asia/Manila",
});

export default function Cakes() {
  const demo = useDemo();
  const withStory = branches;
  const [sel, setSel] = useState("cauayan-d1");
  useEffect(() => {
    const sync = () => {
      try {
        const saved = localStorage.getItem("bb-fav-camp");
        if (saved && branches.some((branch) => branch.id === saved))
          setSel(saved);
      } catch {}
    };
    sync();
    window.addEventListener("bb:favorite", sync);
    return () => window.removeEventListener("bb:favorite", sync);
  }, []);
  const b = branches.find((x) => x.id === sel)!;
  const local = demo.camps[sel];
  const list = local.cakes
    .map((id) => cakes.find((c) => c.id === id)!)
    .filter(Boolean);

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
            A different lineup at every campsite. Take a peek at a sample Cake
            Story, find your favorite slice, then call the crew for today&apos;s
            selection.
          </p>
        </div>

        <DiamondRow fill="#c5a781" ink="#43553d" />

        <div
          className="branch-tabs"
          role="tablist"
          aria-label="Choose a campsite"
        >
          {withStory.map((x, index) => (
            <button
              key={x.id}
              id={`cake-tab-${x.id}`}
              role="tab"
              aria-selected={sel === x.id}
              aria-controls="cake-panel"
              tabIndex={sel === x.id ? 0 : -1}
              onClick={() => setSel(x.id)}
              onKeyDown={(event) => {
                let next = index;
                if (event.key === "ArrowRight")
                  next = (index + 1) % withStory.length;
                else if (event.key === "ArrowLeft")
                  next = (index + withStory.length - 1) % withStory.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = withStory.length - 1;
                else return;
                event.preventDefault();
                setSel(withStory[next].id);
                document
                  .getElementById(`cake-tab-${withStory[next].id}`)
                  ?.focus({ preventScroll: true });
                document
                  .getElementById(`cake-tab-${withStory[next].id}`)
                  ?.scrollIntoView({
                    block: "nearest",
                    inline: "nearest",
                    behavior: "instant",
                  });
              }}
            >
              {x.short}
            </button>
          ))}
        </div>

        <div
          className="cake-board"
          id="cake-panel"
          role="tabpanel"
          aria-labelledby={`cake-tab-${sel}`}
          tabIndex={0}
        >
          <div className="cake-board__head">
            <h3 className="display h3">{b.name}</h3>
            <span className="pill">
              {local.updated
                ? `Local demo update · ${local.updated}`
                : `Sample selection · ${dateLabel}`}
            </span>
          </div>
          {list.length ? (
            <div className="cake-grid" key={sel}>
              {list.map((c) => (
                <div className="cake" key={c.id}>
                  {c.image ? (
                    <div className="cake__img">
                      <Img
                        slug={c.image}
                        alt={c.name}
                        sizes="(min-width: 1100px) 18vw, (min-width: 760px) 30vw, 46vw"
                      />
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
              <div className="hand">
                No cake selection listed for this camp.
              </div>
              <p>Call the crew to ask what&apos;s in the case.</p>
            </div>
          )}
          <div className="cake-foot">
            <span>
              {local.updated
                ? "Updated in this browser’s workspace demo. Call the crew to confirm real availability."
                : "A sample day from Black Bear’s Cake Story. Call ahead for today’s selection."}
            </span>
            {b.phone && (
              <a
                className="btn btn--cream btn--small"
                href={`tel:${b.phone.replace(/\s/g, "")}`}
              >
                <IconPhone /> Call {b.short}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
