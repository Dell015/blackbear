"use client";
import { campLocations } from "@/lib/camp-experiences";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  branches,
  cakeStory,
  cakeStoryDate,
  cakes,
  type Branch,
} from "@/lib/data";
import { hoursText, manilaNow, statusOf, type Status } from "@/lib/hours";
import Img from "./Img";
import { useDialog } from "@/lib/useDialog";
import { useDemo } from "@/lib/demo-store";
import {
  IconArrowRight,
  IconBookmark,
  IconClose,
  IconDirections,
  IconPhone,
  IconShare,
} from "./Icons";

/* --------------------------- trail map --------------------------- */
// Schematic (not to scale): the campsites strung along the Maharlika Highway.
const ROAD =
  "M140 860 C150 830 140 820 140 818 C150 760 185 720 200 676 C215 630 228 580 240 528 C252 470 250 420 256 380 C262 350 262 340 262 330 C266 260 258 200 248 150 C244 120 240 100 238 60";
const SPUR_ROXAS = "M254 400 C220 392 170 396 104 372";
const SPUR_SF = "M238 540 C262 548 282 552 300 560";
const RIVER =
  "M330 900 C320 800 300 760 310 680 C320 600 340 560 328 470 C318 380 330 320 312 240 C300 170 316 110 300 0";

const BLOCKS: [number, number, number, number, "o" | "s"][] = [
  [40, 90, 70, 46, "o"],
  [300, 120, 56, 70, "s"],
  [60, 190, 50, 50, "s"],
  [320, 230, 50, 40, "o"],
  [150, 240, 60, 44, "o"],
  [30, 300, 58, 40, "o"],
  [170, 300, 40, 40, "s"],
  [340, 330, 44, 56, "o"],
  [20, 430, 64, 52, "s"],
  [120, 450, 70, 40, "o"],
  [300, 430, 40, 60, "s"],
  [340, 520, 44, 40, "o"],
  [60, 540, 60, 60, "o"],
  [150, 560, 40, 36, "s"],
  [270, 620, 70, 40, "o"],
  [30, 650, 56, 44, "s"],
  [110, 720, 44, 56, "o"],
  [260, 720, 56, 40, "s"],
  [330, 780, 50, 50, "o"],
  [20, 790, 60, 40, "o"],
  [210, 800, 46, 46, "s"],
  [60, 860, 70, 30, "s"],
  [250, 860, 60, 30, "o"],
];

const SIDE: Record<string, "l" | "r"> = {
  tuguegarao: "r",
  ilagan: "r",
  roxas: "r",
  "cauayan-d1": "l",
  "cauayan-sf": "r",
  alicia: "r",
  santiago: "r",
};

function Pin({
  b,
  active,
  onSelect,
}: {
  b: Branch;
  active: boolean;
  onSelect: () => void;
}) {
  const text = b.short.toUpperCase();
  const w = text.length * 7.6 + 22;
  const side = SIDE[b.id] ?? "r";
  const bx = side === "r" ? 14 : -14 - w;
  const tail = side === "r" ? `M14 -6 L6 0 L14 6` : `M-14 -6 L-6 0 L-14 6`;
  return (
    <g
      className={`pin ${active ? "is-active" : ""}`}
      transform={`translate(${b.map.x} ${b.map.y})`}
      onClick={onSelect}
      onKeyDown={(e) =>
        (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onSelect())
      }
      role="button"
      tabIndex={0}
      aria-label={`${b.name} campsite`}
    >
      {b.hours === "24/7" && <circle className="pin__pulse" r="10" />}
      <circle className="pin__dot" r="6" />
      <circle r="2.4" fill="#fef6cf" />
      <g>
        <rect
          className="pin__bubble"
          x={bx}
          y={-15}
          width={w}
          height={30}
          rx={11}
        />
        <path className="pin__bubble" d={tail} style={{ stroke: "none" }} />
        <text className="pin__text" x={bx + w / 2} y={4.5} textAnchor="middle">
          {text}
        </text>
      </g>
    </g>
  );
}

function TrailMap({
  sel,
  onSelect,
}: {
  sel: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="trail" data-reveal>
      <svg
        viewBox="0 0 400 900"
        role="group"
        aria-label="Map of Black Bear campsites along the Maharlika Highway"
      >
        <rect width="400" height="900" fill="#fef6cf" />
        <path className="trail__river" d={RIVER} />
        {BLOCKS.map(([x, y, w, h, c], i) => (
          <rect
            key={i}
            className="trail__block"
            x={x}
            y={y}
            width={w}
            height={h}
            rx={3}
            fill={c === "o" ? "#cd6128" : "#6f8a6b"}
          />
        ))}
        <path
          className="trail__road"
          d={ROAD}
          strokeWidth={20}
          stroke="#12120f"
          opacity={0.12}
          transform="translate(3 4)"
        />
        <path
          className="trail__road"
          d={SPUR_ROXAS}
          strokeWidth={12}
          data-draw
        />
        <path className="trail__road" d={SPUR_SF} strokeWidth={10} data-draw />
        <path
          className="trail__road"
          id="hwy"
          d={ROAD}
          strokeWidth={18}
          data-draw
        />
        <text className="trail__label" dy={-14}>
          <textPath href="#hwy" startOffset="8%">
            MAHARLIKA HIGHWAY
          </textPath>
        </text>
        <text className="trail__label" x="24" y="40">
          CAGAYAN
        </text>
        <text className="trail__label" x="24" y="250">
          ISABELA
        </text>
        <line
          x1="20"
          y1="226"
          x2="380"
          y2="226"
          stroke="#43553d"
          strokeDasharray="4 6"
          strokeWidth="1.2"
          opacity="0.5"
        />
        <text className="trail__label" x="340" y="20" style={{ fontSize: 10 }}>
          N
        </text>
        <path d="M344 26 L348 40 L344 37 L340 40 Z" fill="#43553d" />
        {branches.map((b) => (
          <Pin
            key={b.id}
            b={b}
            active={sel === b.id}
            onSelect={() => onSelect(b.id)}
          />
        ))}
      </svg>
      <div className="trail__legend">
        <span className="pill pill--forest">Tap a campsite</span>
        <span className="pill pill--line">Map not to scale</span>
      </div>
    </div>
  );
}

/* --------------------------- detail sheet --------------------------- */
function Sheet({
  b,
  status,
  fav,
  onFav,
  onClose,
  toast,
}: {
  b: Branch | null;
  status: Status | null;
  fav: boolean;
  onFav: () => void;
  onClose: () => void;
  toast: (m: string) => void;
}) {
  const open = !!b;
  const demo = useDemo();
  const dialog = useDialog<HTMLElement>(open, onClose);

  const [last, setLast] = useState<Branch | null>(null);
  useEffect(() => {
    if (b) setLast(b);
  }, [b]);
  const x = b ?? last;

  const share = async () => {
    if (!x) return;
    const text = `Black Bear ${x.name}: ${x.address}${x.phone ? ` · ${x.phone}` : ""}`;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(x.mapQuery)}${campLocations[x.id]?.placeId?`&query_place_id=${campLocations[x.id].placeId}`:""}`;
    try {
      if (navigator.share)
        await navigator.share({ title: `Black Bear ${x.name}`, text, url });
      else {
        await navigator.clipboard.writeText(`${text}\n${url}`);
        toast("Address copied");
      }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError"))
        toast("Could not share. Use Directions to open the address.");
    }
  };

  const update = x ? demo.camps[x.id] : null;
  const todays = update
    ? update.cakes
        .map((id) => cakes.find((c) => c.id === id)?.name)
        .filter(Boolean)
    : [];

  return (
    <>
      <div
        className={`sheet-backdrop ${open ? "is-open" : ""}`}
        onClick={onClose}
        aria-hidden
      />
      <aside
        ref={dialog}
        className={`sheet ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={x ? `${x.name} campsite` : "Campsite"}
        aria-hidden={!open}
        inert={!open}
        tabIndex={-1}
        data-lenis-prevent
      >
        {x && (
          <>
            <button
              className="sheet__close"
              onClick={onClose}
              aria-label="Close"
              tabIndex={open ? 0 : -1}
            >
              <IconClose />
            </button>
            <div className="sheet__handle" />
            {x.image ? (
              <div className="sheet__media">
                <Img
                  slug={x.image}
                  alt={`Black Bear ${x.name}`}
                  sizes="440px"
                />
              </div>
            ) : (
              <div className="sheet__media sheet__media--none">
                <div>
                  <div className="hand">Photo of this campsite coming soon</div>
                </div>
              </div>
            )}
            <div className="sheet__body">
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                {status && (
                  <span className={`status status--${status.kind}`}>
                    {status.label}
                    {status.detail ? ` · ${status.detail}` : ""}
                  </span>
                )}
                {x.badge && <span className="pill">{x.badge}</span>}
                {fav && <span className="pill pill--forest">Your camp</span>}
              </div>
              <h3 className="sheet__title">Black Bear Coffee – {x.name}</h3>
              <div className="sheet__addr">
                {x.address}
                {!x.addressConfirmed && (
                  <span className="confirm">to confirm</span>
                )}
              </div>
              {update?.note && (
                <div className="sheet__update">
                  <span className="eyebrow">A note from camp · local demo</span>
                  {update.featuredPhoto && (
                    <img
                      src={update.featuredPhoto}
                      alt={`Photo selected for ${x.name}'s local update`}
                    />
                  )}
                  <p>{update.note}</p>
                </div>
              )}
              <div className="sheet__actions">
                <a
                  className="act"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(x.mapQuery)}${campLocations[x.id]?.placeId?`&query_place_id=${campLocations[x.id].placeId}`:""}`}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={open ? 0 : -1}
                >
                  <IconDirections /> Directions
                </a>
                <button
                  className="act"
                  aria-pressed={fav}
                  onClick={onFav}
                  tabIndex={open ? 0 : -1}
                >
                  <IconBookmark /> {fav ? "Saved" : "Favorite"}
                </button>
                {x.phone ? (
                  <a
                    className="act"
                    href={`tel:${x.phone.replace(/\s/g, "")}`}
                    tabIndex={open ? 0 : -1}
                  >
                    <IconPhone /> Call
                  </a>
                ) : (
                  <button
                    className="act"
                    aria-disabled="true"
                    title="Phone number to confirm"
                    onClick={() => toast("Phone number still to confirm")}
                    tabIndex={open ? 0 : -1}
                  >
                    <IconPhone /> Call
                  </button>
                )}
                <button
                  className="act"
                  onClick={share}
                  tabIndex={open ? 0 : -1}
                >
                  <IconShare /> Share
                </button>
              </div>
              <div className="sheet__rows">
                <div className="sheet__row">
                  <span>Hours</span>
                  <span>
                    {hoursText(x)}
                    {!x.hoursConfirmed && x.hours && (
                      <span className="confirm">to confirm</span>
                    )}
                  </span>
                </div>
                <div className="sheet__row">
                  <span>Phone</span>
                  <span>
                    {x.phone ?? <span className="confirm">to confirm</span>}
                  </span>
                </div>
                {x.note && (
                  <div className="sheet__row">
                    <span>Also</span>
                    <span>{x.note}</span>
                  </div>
                )}
                {todays.length > 0 && (
                  <div
                    className="sheet__row"
                    style={{ display: "grid", gap: 8 }}
                  >
                    <span>
                      {update?.updated
                        ? `Demo cakes · ${update.updated}`
                        : `Sample cakes · ${cakeStoryDate}`}
                    </span>
                    <span className="sheet__cakes">
                      {todays.map((n) => (
                        <span key={n} className="pill pill--tan">
                          {n}
                        </span>
                      ))}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

/* --------------------------- section --------------------------- */
export default function Campsites() {
  const [sel, setSel] = useState<string | null>(null);
  const [now, setNow] = useState<ReturnType<typeof manilaNow> | null>(null);
  const [fav, setFav] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const [view, setView] = useState<"list" | "map">("list");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("camp");
    if (requested && branches.some((branch) => branch.id === requested))
      setSel(requested);
    setNow(manilaNow());
    const t = setInterval(() => setNow(manilaNow()), 60_000);
    try {
      setFav(localStorage.getItem("bb-fav-camp"));
    } catch {}
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(""), 2200);
    return () => clearTimeout(t);
  }, [msg]);

  const statuses = useMemo(
    () =>
      now
        ? Object.fromEntries(branches.map((b) => [b.id, statusOf(b, now)]))
        : {},
    [now],
  ) as Record<string, Status>;

  const toggleFav = () => {
    if (!sel) return;
    const next = fav === sel ? null : sel;
    setFav(next);
    try {
      if (next) localStorage.setItem("bb-fav-camp", next);
      else localStorage.removeItem("bb-fav-camp");
      window.dispatchEvent(new Event("bb:favorite"));
    } catch {}
    setMsg(next ? "Saved as your camp" : "Removed from favorites");
  };

  // favorite camp floats to the top of the list
  const ordered = [...branches].sort((a, b) =>
    a.id === fav ? -1 : b.id === fav ? 1 : 0,
  );
  const current = branches.find((b) => b.id === sel) ?? null;
  const close = useCallback(() => setSel(null), []);

  return (
    <section className="section camps" id="campsites">
      <div className="wrap">
        <div className="section-head section-head--split">
          <div>
            <span className="eyebrow" data-reveal>
              Find a campsite
            </span>
            <h2 className="display h2" data-reveal>
              Seven camps, one highway
            </h2>
          </div>
          <p className="lead" data-reveal>
            From Santiago up to Tuguegarao, there&apos;s a Black Bear along the
            Maharlika Highway. Tap a camp for directions, hours and a one-tap
            call.
          </p>
        </div>

        <div className="camp-tools">
          <label className="app-field">
            <span className="sr-only">Find a campsite by city</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Find your city or campsite…"
            />
          </label>
          <div
            className="camp-view-tabs"
            role="group"
            aria-label="Campsite view"
          >
            <button
              aria-pressed={view === "list"}
              onClick={() => setView("list")}
            >
              List
            </button>
            <button
              aria-pressed={view === "map"}
              onClick={() => setView("map")}
            >
              Trail map
            </button>
          </div>
        </div>
        <div className="camps__grid" data-view={view}>
          <TrailMap sel={sel} onSelect={setSel} />
          <div className="camp-list" data-stagger>
            {ordered
              .filter((branch) =>
                (branch.name + branch.address)
                  .toLowerCase()
                  .includes(query.toLowerCase()),
              )
              .map((b) => {
                const s = statuses[b.id];
                return (
                  <button
                    key={b.id}
                    className={`camp ${sel === b.id ? "is-active" : ""}`}
                    onClick={() => setSel(b.id)}
                    aria-haspopup="dialog"
                  >
                    <span className="camp__name">
                      {b.name}
                      {fav === b.id && (
                        <span className="fav-mark" title="Your camp">
                          <IconBookmark fill="currentColor" />
                        </span>
                      )}
                      {b.badge && (
                        <span className="pill" style={{ fontSize: 10 }}>
                          {b.badge}
                        </span>
                      )}
                    </span>
                    <span className="camp__go" aria-hidden>
                      <IconArrowRight />
                    </span>
                    <span
                      className={`status status--${s?.kind ?? "unknown"}`}
                      style={{ gridColumn: "1 / -1" }}
                    >
                      {s
                        ? `${s.label}${s.detail ? ` · ${s.detail}` : ""}`
                        : "Checking hours"}
                    </span>
                    <span className="camp__addr">{b.address}</span>
                  </button>
                );
              })}
          </div>
          {!ordered.some((branch) =>
            (branch.name + branch.address)
              .toLowerCase()
              .includes(query.toLowerCase()),
          ) && (
            <div className="app-empty">
              <p>No campsites match that search.</p>
              <button className="text-link" onClick={() => setQuery("")}>
                Show all campsites
              </button>
            </div>
          )}
        </div>
      </div>

      <Sheet
        b={current}
        status={current ? (statuses[current.id] ?? null) : null}
        fav={!!current && fav === current.id}
        onFav={toggleFav}
        onClose={close}
        toast={setMsg}
      />
      <div
        className={`toast ${msg ? "is-on" : ""}`}
        role="status"
        aria-live="polite"
      >
        {msg}
      </div>
    </section>
  );
}
