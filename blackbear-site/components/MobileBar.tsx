"use client";
import { useCallback, useEffect, useState } from "react";
import { branches } from "@/lib/data";
import { lockScroll } from "./Motion";
import { IconClose, IconMenu, IconPhone, IconPin } from "./Icons";

/** Sticky action bar on phones: Menu, Campsites, Call (picks a branch). */
export default function MobileBar() {
  const [on, setOn] = useState(false);
  const [sheet, setSheet] = useState(false);
  useEffect(() => {
    const f = () => setOn(window.scrollY > window.innerHeight * 0.6);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  const close = useCallback(() => setSheet(false), []);
  useEffect(() => {
    if (!sheet) return;
    lockScroll(true);
    const k = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", k);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", k);
    };
  }, [sheet, close]);

  return (
    <>
      <nav className={`mbar ${on ? "is-on" : ""}`} aria-label="Quick actions">
        <a href="#menu">
          <IconMenu /> Menu
        </a>
        <a href="#campsites">
          <IconPin /> Camps
        </a>
        <button onClick={() => setSheet(true)} aria-haspopup="dialog">
          <IconPhone /> Call
        </button>
      </nav>
      <div className={`sheet-backdrop ${sheet ? "is-open" : ""}`} onClick={close} aria-hidden />
      <aside className={`sheet callsheet ${sheet ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Call a campsite" aria-hidden={!sheet} data-lenis-prevent>
        <button className="sheet__close" onClick={close} aria-label="Close" tabIndex={sheet ? 0 : -1}>
          <IconClose />
        </button>
        <div className="sheet__handle" />
        <div className="sheet__body">
          <h3 className="sheet__title">Call a campsite</h3>
          <div>
            {branches.map((b) => (
              <div className="camp-call" key={b.id}>
                <div>
                  <b>{b.short}</b>
                  <div style={{ fontSize: 12.5 }}>{b.phone ?? "Number to confirm"}</div>
                </div>
                {b.phone ? (
                  <a className="btn btn--small" href={`tel:${b.phone.replace(/\s/g, "")}`} tabIndex={sheet ? 0 : -1}>
                    <IconPhone /> Call
                  </a>
                ) : (
                  <span className="pill pill--line">soon</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
