"use client";
import { useEffect, useState } from "react";
import {
  brand,
  branches,
  cakes,
  drinkAddOns,
  drinks,
  food,
  foodAddOns,
  readyToDrink,
  sizeLegend,
  signatures,
  type Tag,
} from "@/lib/data";
import { changeDemo, useDemo } from "@/lib/demo-store";
import { menuDetails, menuKey } from "@/lib/menu-details";
import { useDialog } from "@/lib/useDialog";
import Img from "./Img";
import {
  IconArrowRight,
  IconBookmark,
  IconClose,
  IconMenu,
  IconPhone,
  IconPin,
  IconSearch,
  TagFav,
  TagSig,
  TagVeg,
  Tags,
} from "./Icons";
import { DiamondRow } from "./Doodles";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Mode = "food" | "drinks";
export type Pick = {
  name: string;
  prices: (number | null)[];
  sizes: string[];
  tags?: Tag[];
  note?: string;
  kcal?: number;
  category: string;
};
type Section = { id: string; title: string; script?: string; items: Pick[] };
const norm = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, "")
    .trim();
const foodSections: Section[] = [
  ...food.map((section) => ({
    ...section,
    items: section.items.map((item) => ({
      ...item,
      prices: [item.price],
      sizes: ["Plate"],
      category: section.title,
    })),
  })),
  {
    id: "food-add-ons",
    title: "Food Add-ons",
    items: foodAddOns.map((item) => ({
      ...item,
      prices: [item.price],
      sizes: ["Add-on"],
      category: "Food Add-ons",
    })),
  },
];
const drinkSections: Section[] = [
  ...drinks.map((section) => ({
    ...section,
    items: section.items.map((item) => ({
      ...item,
      sizes: section.sizes,
      category: section.title,
    })),
  })),
  {
    id: "drink-add-ons",
    title: "Add-ons & Ready to Drink",
    items: [...drinkAddOns, ...readyToDrink].map((item) => ({
      ...item,
      prices: [item.price],
      sizes: ["Price"],
      category: "Add-ons & Ready to Drink",
    })),
  },
];

export function ItemSheet({
  item: currentItem,
  camp,
  onClose,
}: {
  item: Pick | null;
  camp: string;
  onClose: () => void;
}) {
  const state = useDemo();
  const [lastItem, setLastItem] = useState<Pick | null>(null);
  useEffect(() => {
    if (currentItem) setLastItem(currentItem);
  }, [currentItem]);
  const item = currentItem ?? lastItem;
  const open = !!currentItem;
  const dialog = useDialog<HTMLElement>(open, onClose);
  const [size, setSize] = useState(0);
  const [message, setMessage] = useState("");
  useEffect(() => {
    setSize(item?.prices.findIndex((price) => price !== null) ?? 0);
    setMessage("");
  }, [item?.name]);
  const cake = item ? cakes.find(c => c.name === item.name) : null;
  const detail = item ? menuDetails[item.name] ?? (cake ? { image: cake.image, description: "A slice from Black Bear’s cake case. Selections vary by campsite. Ask the crew for today’s slice price and ingredient details." } : null) : null;
  const branch = branches.find((entry) => entry.id === camp)!;
  const itemKey = item ? menuKey(item.category, item.name) : "";
  const saved = !!item && state.savedPicks.includes(itemKey);
  const unavailable = !!item && state.camps[camp].soldOut.includes(itemKey);
  return (
    <>
      <div
        className={`sheet-backdrop ${open ? "is-open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        ref={dialog}
        className={`sheet menu-detail ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        aria-label={
          item ? `A closer look at ${item.name}` : "Menu item details"
        }
        inert={!open}
        tabIndex={-1}
        data-lenis-prevent
      >
        {item && (
          <>
            <button
              className="sheet__close"
              onClick={onClose}
              aria-label="Close item details"
            >
              <IconClose />
            </button>
            <div className="sheet__handle" />
            <div
              className={`menu-detail__photo ${detail?.image ? "" : "menu-detail__photo--empty"}`}
            >
              {detail?.image ? (
                <Img
                  slug={detail.image}
                  alt={
                    item.name === "Spanish Latte"
                      ? "Black Bear Spanish and ube lattes pictured together"
                      : item.name === "Matcha Latte"
                        ? "The Black Bear Matcha Series lineup"
                        : item.name
                  }
                  sizes="(min-width:760px) 480px,100vw"
                  priority
                />
              ) : (
                <>
                  <IconMenu />
                  <span>A closer look is on the way.</span>
                  <small>No matching product photo supplied yet.</small>
                </>
              )}
            </div>
            <div className="menu-detail__body">
              <span className="eyebrow">{item.category}</span>
              <h3 className="display">{item.name}</h3>
              <div className="menu-detail__tags">
                {item.tags?.includes("fav") && (
                  <span>
                    <TagFav /> Fan favorite
                  </span>
                )}
                {item.tags?.includes("sig") && (
                  <span>
                    <TagSig /> Signature
                  </span>
                )}
                {item.tags?.includes("veg") && (
                  <span>
                    <TagVeg /> Vegetarian
                  </span>
                )}
                {item.kcal && <span>{item.kcal} kcal</span>}
              </div>
              <p>
                {detail?.description ??
                  `A pick from Black Bear’s ${item.category.toLowerCase()} board. Ask the crew for preparation and ingredient details.`}
              </p>
              {item.note && <p className="menu-detail__note">{item.note}</p>}
              <div
                className="item-size"
                role="group"
                aria-label="Choose a listed size"
              >
                {item.prices.map((price, index) =>
                  price === null ? null : (
                    <button
                      key={index}
                      aria-pressed={size === index}
                      onClick={() => setSize(index)}
                    >
                      <span>
                        {item.sizes[index]}
                        {item.sizes[index] === "Grizzly"
                          ? " / 16oz iced"
                          : item.sizes[index] === "Polar"
                            ? " / 22oz iced"
                            : item.sizes[index] === "Black Bear"
                              ? " / hot"
                              : ""}
                      </span>
                      <b>₱{price}</b>
                    </button>
                  ),
                )}
              </div>
              {cake && <p className="menu-detail__note">Slice prices are not listed in the supplied menu. Call the crew for today’s price.</p>}
              <div className="menu-detail__availability">
                <IconPin />
                <span>
                  {branch.short} ·{" "}
                  {unavailable
                    ? "unavailable in this local demo"
                    : "call the crew to confirm availability"}
                </span>
              </div>
              <div className="menu-detail__actions">
                <button
                  className="btn btn--ghost"
                  aria-pressed={saved}
                  onClick={() => {
                    const ok = changeDemo((current) => ({
                      ...current,
                      savedPicks: saved
                        ? current.savedPicks.filter((name) => name !== itemKey)
                        : [...current.savedPicks, itemKey],
                    }));
                    setMessage(
                      ok
                        ? saved
                          ? "Removed from your picks."
                          : "Saved to your picks on this device."
                        : "Could not save this pick.",
                    );
                  }}
                >
                  <IconBookmark />
                  {saved ? "Saved pick" : "Save this pick"}
                </button>
                {branch.phone ? (
                  <a
                    className="btn"
                    href={`tel:${branch.phone.replace(/\s/g, "")}`}
                  >
                    <IconPhone /> Ask {branch.short}
                  </a>
                ) : (
                  <a className="btn" href="/campsites" onClick={onClose}>
                    <IconPin /> Find a camp
                  </a>
                )}
              </div>
              <p
                className="menu-detail__message"
                role="status"
                aria-live="polite"
              >
                {message}
              </p>
              <small>
                Prices in pesos. {brand.serviceCharge}. Brief descriptions are
                browsing guides; ask the crew about ingredients, allergens, and
                preparation.
              </small>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default function Menu() {
  const state = useDemo();
  const [mode, setMode] = useState<Mode>("food");
  const [category, setCategory] = useState("featured");
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<"all" | "fav" | "sig" | "veg" | "saved">(
    "all",
  );
  const [camp, setCamp] = useState("cauayan-d1");
  const [selected, setSelected] = useState<Pick | null>(null);
  const query = norm(q);
  const matches = (item: Pick) =>
    (!query ||
      norm(item.name).includes(query) ||
      norm(item.category).includes(query)) &&
    (tag === "all" || tag === "saved"
      ? tag !== "saved" ||
        state.savedPicks.includes(menuKey(item.category, item.name))
      : item.tags?.includes(tag));
  const filteredFood = foodSections
    .map((section) => ({ ...section, items: section.items.filter(matches) }))
    .filter((section) => section.items.length);
  const filteredDrinks = drinkSections
    .map((section) => ({ ...section, items: section.items.filter(matches) }))
    .filter((section) => section.items.length);
  const all = mode === "food" ? foodSections : drinkSections;
  const filtered = mode === "food" ? filteredFood : filteredDrinks;
  const featuredItems = filteredFood
    .flatMap((section) => section.items)
    .filter((item) =>
      signatures.some((signature) => signature.name === item.name),
    );
  const sections =
    category === "featured"
      ? [
          {
            id: "featured",
            title: "Camp Favorites",
            script: "from the kitchen",
            items: featuredItems,
          },
        ].filter((section) => section.items.length)
      : category === "all"
        ? filtered
        : filtered.filter((section) => section.id === category);
  const resultCount = sections.reduce(
    (count, section) => count + section.items.length,
    0,
  );
  const otherCount = (mode === "food" ? filteredDrinks : filteredFood).reduce(
    (count, section) => count + section.items.length,
    0,
  );
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialMode = params.get("type") === "drinks" ? "drinks" : "food";
    const initialQuery = params.get("search")?.slice(0, 60) ?? "";
    const initialCategory = params.get("category");
    setMode(initialMode);
    setQ(initialQuery);
    setCategory(
      initialQuery
        ? "all"
        : initialCategory &&
            (initialMode === "food" ? foodSections : drinkSections).some(
              (section) => section.id === initialCategory,
            )
          ? initialCategory
          : initialMode === "food"
            ? "featured"
            : "coffee",
    );
    const sync = () => {
      try {
        const saved = localStorage.getItem("bb-fav-camp");
        if (saved && branches.some((branch) => branch.id === saved))
          setCamp(saved);
      } catch {}
    };
    sync();
    window.addEventListener("bb:favorite", sync);
    const switchMenu = (event: Event) => {
      const detail = (
        event as CustomEvent<Mode | { mode: Mode; query?: string }>
      ).detail;
      setMode(typeof detail === "string" ? detail : detail.mode);
      setQ(typeof detail === "string" ? "" : (detail.query ?? ""));
      setCategory("all");
      setTag("all");
    };
    window.addEventListener("bb:menu", switchMenu);
    return () => {
      window.removeEventListener("bb:favorite", sync);
      window.removeEventListener("bb:menu", switchMenu);
    };
  }, []);
  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [mode, category, q, tag]);
  const changeMode = (value: Mode) => {
    setMode(value);
    setCategory(
      q || tag !== "all" ? "all" : value === "food" ? "featured" : "coffee",
    );
  };
  const chooseCategory = (value: string) => {
    setCategory(value);
    requestAnimationFrame(() => {
      const anchor = document.getElementById("menu-browse");
      if (anchor && anchor.getBoundingClientRect().top < 0)
        window.__lenis
          ? window.__lenis.scrollTo(anchor, { offset: -92, duration: 0.6 })
          : anchor.scrollIntoView({ block: "start" });
    });
  };
  return (
    <section className="section menu menu-explorer" id="menu">
      <div className="wrap">
        <div className="section-head section-head--split">
          <div>
            <span className="eyebrow" data-reveal>
              From our kitchen & coffee bar
            </span>
            <h2 className="display h2" data-reveal>
              The menu.
              <span className="script">Find your kind of good.</span>
            </h2>
          </div>
          <div className="menu-intro" data-reveal>
            <p className="lead">
              Tap a pick for a closer look, then save a few favorites for your
              next visit.
            </p>
            <a
              className="text-link"
              href="https://blackbearcoffee.my.canva.site/big-stores"
              target="_blank"
              rel="noreferrer"
            >
              Black Bear&apos;s original QR menu <IconArrowRight />
            </a>
          </div>
        </div>
        <div className="menu-browse" id="menu-browse">
          <div className="menu__bar">
            <div className="menu__bar-row">
              <div className="seg" role="group" aria-label="Menu type">
                {(["food", "drinks"] as Mode[]).map((value) => (
                  <button
                    key={value}
                    aria-pressed={mode === value}
                    onClick={() => changeMode(value)}
                  >
                    {value === "food" ? "The kitchen" : "The coffee bar"}
                  </button>
                ))}
              </div>
              <label className="search">
                <span className="sr-only">Search the menu</span>
                <IconSearch />
                <input
                  type="search"
                  placeholder="What are you craving?"
                  value={q}
                  onChange={(event) => {
                    setQ(event.target.value);
                    setCategory("all");
                  }}
                  maxLength={60}
                  autoComplete="off"
                  aria-controls="menu-results"
                  onKeyDown={(event) => {
                    if (event.key === "Escape") setQ("");
                  }}
                />
                {q && (
                  <button
                    className="clear"
                    aria-label="Clear menu search"
                    onClick={() => setQ("")}
                  >
                    <IconClose />
                  </button>
                )}
              </label>
            </div>
            <nav className="menu-categories" aria-label="Menu categories">
              {mode === "food" && (
                <button
                  aria-pressed={category === "featured"}
                  onClick={() => chooseCategory("featured")}
                >
                  Kitchen favorites
                </button>
              )}
              <button
                aria-pressed={category === "all"}
                onClick={() => chooseCategory("all")}
              >
                Everything
              </button>
              {all.map((section) => (
                <button
                  key={section.id}
                  aria-pressed={category === section.id}
                  onClick={() => chooseCategory(section.id)}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
          <div className="menu__refine">
            <div
              className="menu-filters"
              role="group"
              aria-label="Filter by menu tags"
            >
              <button
                aria-pressed={tag === "all"}
                onClick={() => setTag("all")}
              >
                All picks
              </button>
              <button
                aria-pressed={tag === "fav"}
                onClick={() => setTag("fav")}
              >
                <TagFav />
                Fan favorites
              </button>
              <button
                aria-pressed={tag === "sig"}
                onClick={() => setTag("sig")}
              >
                <TagSig />
                Signatures
              </button>
              <button
                aria-pressed={tag === "veg"}
                onClick={() => setTag("veg")}
              >
                <TagVeg />
                Vegetarian
              </button>
              <button
                aria-pressed={tag === "saved"}
                onClick={() => setTag("saved")}
              >
                <IconBookmark />
                My picks ({state.savedPicks.length})
              </button>
            </div>
            <span className="menu__results" role="status" aria-live="polite">
              {resultCount} {resultCount === 1 ? "pick" : "picks"}
              {q ? ` for “${q}”` : " to explore"}
            </span>
          </div>
          <div className="menu__camp">
            <label>
              At your campsite{" "}
              <select
                value={camp}
                onChange={(event) => {
                  setCamp(event.target.value);
                  try {
                    localStorage.setItem("bb-fav-camp", event.target.value);
                    window.dispatchEvent(new Event("bb:favorite"));
                  } catch {}
                }}
              >
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </label>
            <span>
              Tap any item for its story, sizes & photo where supplied.
            </span>
          </div>
          {mode === "drinks" && (
            <div className="menu-size-legend">
              {sizeLegend.map((size) => (
                <span key={size.name}>
                  <b>{size.name}</b> {size.desc}
                </span>
              ))}
            </div>
          )}
          <div id="menu-results" className="menu-board-grid">
            {sections.map((section, index) => (
              <article
                className={`menu-board ${mode === "drinks" && ["matcha", "protein", "shaken"].includes(section.id) ? "menu-board--forest" : ""}`}
                key={section.id}
              >
                <div className="menu-board__heading">
                  <span className="menu-board__index">
                    {section.id === "featured"
                      ? "HOUSE PICKS"
                      : String(
                          all.findIndex((item) => item.id === section.id) + 1,
                        ).padStart(2, "0")}{" "}
                    / {mode === "food" ? "KITCHEN" : "COFFEE BAR"}
                  </span>
                  <h3 className="display">{section.title}</h3>
                  {section.script && (
                    <span className="script">{section.script}</span>
                  )}
                  <span className="menu-board__tap">
                    A little closer look <span aria-hidden="true">↗</span>
                  </span>
                </div>
                <div className="menu-board__items">
                  {section.items.map((item) => {
                    const detail = menuDetails[item.name];
                    const prices = item.prices.filter(
                      (price): price is number => price !== null,
                    );
                    const unavailable = state.camps[camp].soldOut.includes(
                      menuKey(item.category, item.name),
                    );
                    return (
                      <button
                        key={item.name}
                        className={`menu-pick ${detail?.image ? "has-photo" : ""}`}
                        onClick={() => setSelected(item)}
                        aria-label={`View ${item.name}, ${prices.length > 1 ? "from " : ""}${Math.min(...prices)} pesos`}
                        aria-haspopup="dialog"
                      >
                        {detail?.image && (
                          <span className="menu-pick__thumb">
                            <Img slug={detail.image} alt="" sizes="72px" />
                          </span>
                        )}
                        <span className="menu-pick__body">
                          <span className="menu-pick__name">
                            <Tags tags={item.tags} />
                            {item.name}
                            {state.savedPicks.includes(
                              menuKey(item.category, item.name),
                            ) && <IconBookmark className="menu-pick__saved" />}
                          </span>
                          <span className="menu-pick__meta">
                            {unavailable
                              ? "Unavailable · local demo"
                              : item.kcal
                                ? `${item.kcal} kcal`
                                : detail?.description
                                  ? detail.description.split(".")[0]
                                  : "Tap for details"}
                          </span>
                        </span>
                        <span className="menu-pick__dots" />
                        <span className="menu-pick__price">
                          {prices.length > 1 && <small>from</small>}₱
                          {Math.min(...prices)}
                        </span>
                        <span className="menu-pick__arrow" aria-hidden="true">
                          ↗
                        </span>
                      </button>
                    );
                  })}
                </div>
                <DiamondRow
                  fill={
                    mode === "drinks" &&
                    ["matcha", "protein", "shaken"].includes(section.id)
                      ? "#fef6cf"
                      : "#43553d"
                  }
                  ink={
                    mode === "drinks" &&
                    ["matcha", "protein", "shaken"].includes(section.id)
                      ? "#43553d"
                      : "#fef6cf"
                  }
                />
              </article>
            ))}
          </div>
          {!resultCount && (
            <div className="empty">
              <div className="hand">A different trail, maybe?</div>
              <p>No picks match this search and filter combination.</p>
              <div className="app-actions">
                {otherCount > 0 && (
                  <button
                    className="btn"
                    onClick={() =>
                      changeMode(mode === "food" ? "drinks" : "food")
                    }
                  >
                    {otherCount} picks in{" "}
                    {mode === "food" ? "the coffee bar" : "the kitchen"}
                  </button>
                )}
                <button
                  className="btn btn--ghost"
                  onClick={() => {
                    setQ("");
                    setTag("all");
                    setCategory("all");
                  }}
                >
                  Show everything
                </button>
              </div>
            </div>
          )}
          <div className="service">
            <span className="pill">{brand.serviceCharge}</span>
            <span>
              Source: supplied menu boards. Prices in pesos. Call your camp for
              current availability.
            </span>
          </div>
        </div>
      </div>
      <ItemSheet
        item={selected}
        camp={camp}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
