"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { brand, drinkAddOns, drinks, food, foodAddOns, readyToDrink, sizeLegend, type DrinkSection, type FoodItem, type FoodSection } from "@/lib/data";
import Img from "./Img";
import { IconClose, IconSearch, TagFav, TagSig, TagVeg, Tags } from "./Icons";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Mode = "food" | "drinks";

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/['’]/g, "");

function Hl({ text, q }: { text: string; q: string }) {
  if (!q) return <>{text}</>;
  const i = norm(text).indexOf(norm(q));
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark>{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

function FoodBoard({ s, q, forest }: { s: FoodSection; q: string; forest?: boolean }) {
  return (
    <article className={`board ${forest ? "board--forest" : ""}`} id={`m-${s.id}`}>
      {s.image && !q && (
        <div className="board__media">
          <Img slug={s.image} alt={s.title} sizes="(min-width: 900px) 45vw, 100vw" />
        </div>
      )}
      <div className="board__body">
        <div className="board__title">
          <h3 className="display">{s.title}</h3>
          {s.script && <span className="script">{s.script}</span>}
        </div>
        <ul className="items">
          {s.items.map((it) => (
            <li className="item" key={it.name}>
              <Tags tags={it.tags} />
              <span className="item__name">
                <span>
                  <Hl text={it.name} q={q} />
                </span>
                <span className="lead-dots" />
              </span>
              <span className="item__price">₱{it.price}</span>
              {it.kcal && <span className="item__meta">{it.kcal} kcal</span>}
            </li>
          ))}
        </ul>
        {s.note && <p className="board__note">{s.note}</p>}
      </div>
    </article>
  );
}

function DrinkBoard({ s, q, forest }: { s: DrinkSection; q: string; forest?: boolean }) {
  return (
    <article className={`board ${forest ? "board--forest" : ""}`} id={`m-${s.id}`}>
      {s.image && !q && (
        <div className="board__media">
          <Img slug={s.image} alt={s.title} sizes="(min-width: 900px) 45vw, 100vw" />
        </div>
      )}
      <div className="board__body">
        <div className="board__title">
          <h3 className="display">{s.title}</h3>
          {s.script && <span className="script">{s.script}</span>}
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">
                <span className="sr-only">Drink</span>
              </th>
              {s.sizes.map((z) => (
                <th scope="col" key={z}>
                  {z}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {s.items.map((it) => (
              <tr key={it.name + (it.note ?? "")}>
                <td className="cell">
                  <div className="cell__inner">
                    <Tags tags={it.tags} />
                    <div>
                      <Hl text={it.name} q={q} />
                      {(it.note || it.kcal) && <small>{[it.note, it.kcal ? `${it.kcal} kcal` : ""].filter(Boolean).join(" · ")}</small>}
                    </div>
                  </div>
                </td>
                {it.prices.map((p, i) => (
                  <td key={i}>{p == null ? <span className="muted" aria-label="not available">–</span> : `₱${p}`}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {s.note && <p className="board__note">{s.note}</p>}
      </div>
    </article>
  );
}

function AddOns({ title, items, q }: { title: string; items: FoodItem[]; q: string }) {
  return (
    <article className="board" id={`m-${title.toLowerCase().replace(/\W+/g, "-")}`} style={{ gridColumn: "1 / -1" }}>
      <div className="board__body">
        <div className="board__title">
          <h3 className="display">{title}</h3>
        </div>
        <ul className="items addons">
          {items.map((it) => (
            <li className="item" key={it.name}>
              <span />
              <span className="item__name">
                <span>
                  <Hl text={it.name} q={q} />
                </span>
                <span className="lead-dots" />
              </span>
              <span className="item__price">₱{it.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function Menu() {
  const [mode, setMode] = useState<Mode>("food");
  const [q, setQ] = useState("");
  const [active, setActive] = useState<string>("");
  const boardsRef = useRef<HTMLDivElement>(null);

  const match = (name: string) => !q || norm(name).includes(norm(q.trim()));

  const foodF = useMemo(() => food.map((s) => ({ ...s, items: s.items.filter((i) => match(i.name)) })).filter((s) => s.items.length), [q]); // eslint-disable-line
  const drinkF = useMemo(() => drinks.map((s) => ({ ...s, items: s.items.filter((i) => match(i.name)) })).filter((s) => s.items.length), [q]); // eslint-disable-line
  const fAdd = foodAddOns.filter((i) => match(i.name));
  const dAdd = [...drinkAddOns, ...readyToDrink].filter((i) => match(i.name));

  const count = (m: Mode) => (m === "food" ? foodF.reduce((a, s) => a + s.items.length, 0) + fAdd.length : drinkF.reduce((a, s) => a + s.items.length, 0) + dAdd.length);
  const here = count(mode);
  const other: Mode = mode === "food" ? "drinks" : "food";

  // "Pick your trail" cards jump here and switch to drinks
  useEffect(() => {
    const on = (e: Event) => {
      setMode((e as CustomEvent<Mode>).detail);
      setQ("");
    };
    window.addEventListener("bb:menu", on);
    return () => window.removeEventListener("bb:menu", on);
  }, []);

  // layout changes → let ScrollTrigger re-measure
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 60);
    return () => clearTimeout(t);
  }, [mode, q]);

  // highlight the category chip for the board in view
  useEffect(() => {
    const boards = boardsRef.current?.querySelectorAll<HTMLElement>(".board[id]");
    if (!boards?.length) return;
    const io = new IntersectionObserver(
      (es) => {
        const v = es.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (v) setActive(v.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    boards.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, [mode, q]);

  const sections = mode === "food" ? foodF : drinkF;

  return (
    <section className="section menu" id="menu">
      <div className="wrap">
        <div className="section-head section-head--split">
          <div>
            <span className="eyebrow" data-reveal>
              The full menu
            </span>
            <h2 className="display h2" data-reveal>
              Everything on the board
            </h2>
          </div>
          <p className="lead" data-reveal>
            Brunch all day, lunch and dinner plates, bear bites, focaccia pizza, and a coffee bar with three cup sizes. Prices in pesos, straight from the
            menu boards at every campsite.
          </p>
        </div>

        <div className="menu__bar">
          <div className="menu__bar-row">
            <div className="seg" role="group" aria-label="Menu type">
              {(["food", "drinks"] as Mode[]).map((m) => (
                <button key={m} aria-pressed={mode === m} onClick={() => setMode(m)}>
                  {m}
                </button>
              ))}
            </div>
            <label className="search">
              <span className="sr-only">Search the menu</span>
              <IconSearch />
              <input value={q} onChange={(e) => setQ(e.target.value.slice(0, 40))} placeholder="Search: matcha, loco moco…" maxLength={40} />
              {q && (
                <button className="clear" type="button" aria-label="Clear search" onClick={() => setQ("")}>
                  <IconClose width={16} />
                </button>
              )}
            </label>
          </div>
          {!q && (
            <nav className="chips" aria-label="Menu categories">
              {sections.map((s) => (
                <a key={s.id} href={`#m-${s.id}`} className={active === `m-${s.id}` ? "is-active" : ""}>
                  {s.title}
                </a>
              ))}
              <a href={mode === "food" ? "#m-food-add-ons" : "#m-drink-add-ons-ready-to-drink"}>Add-ons</a>
            </nav>
          )}
        </div>

        <div className="legend">
          <span>
            <TagFav className="tag-icon" /> Fan&apos;s favorite
          </span>
          <span>
            <TagSig className="tag-icon" /> Signature
          </span>
          <span>
            <TagVeg className="tag-icon" /> Vegetarian
          </span>
          {mode === "drinks" &&
            sizeLegend.map((s) => (
              <span key={s.name} className="pill pill--tan" style={{ border: "1.5px solid var(--ink)" }}>
                {s.name}: {s.desc}
              </span>
            ))}
        </div>

        {here === 0 ? (
          <div className="empty">
            <div className="hand">Nothing on the {mode} board for &ldquo;{q}&rdquo;</div>
            <p>Try another word, or check the other side of the menu.</p>
            {count(other) > 0 ? (
              <button className="btn" onClick={() => setMode(other)}>
                {count(other)} match{count(other) > 1 ? "es" : ""} in {other}
              </button>
            ) : (
              <button className="btn btn--ghost" onClick={() => setQ("")}>
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="boards" ref={boardsRef}>
            {mode === "food"
              ? foodF.map((s, i) => <FoodBoard key={s.id} s={s} q={q} forest={s.id === "pizza"} />)
              : drinkF.map((s, i) => <DrinkBoard key={s.id} s={s} q={q} forest={s.id === "shaken" || s.id === "protein"} />)}
            {mode === "food" && fAdd.length > 0 && <AddOns title="Food Add-ons" items={fAdd} q={q} />}
            {mode === "drinks" && dAdd.length > 0 && <AddOns title="Drink Add-ons & Ready to Drink" items={dAdd} q={q} />}
          </div>
        )}

        <div className="service">
          <span className="pill">{brand.serviceCharge}</span>
          <span>Prices from the current in-store menu boards. Availability can vary per campsite.</span>
        </div>
      </div>
    </section>
  );
}
