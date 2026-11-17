"use client";
import { useCallback, useEffect, useState } from "react";
import { branches } from "@/lib/data";
import { useDialog } from "@/lib/useDialog";
import { IconClose, IconMenu, IconPhone, IconPin } from "./Icons";

/** Sticky action bar on phones: Menu, Campsites, Call (picks a branch). */
export default function MobileBar() {
  const on = true;
  const [sheet, setSheet] = useState(false);
  const close = useCallback(() => setSheet(false), []);
  const dialog = useDialog<HTMLElement>(sheet, close);

  return (
    <>
      <nav
        className={`mbar ${on ? "is-on" : ""}`}
        aria-label="Quick actions"
        inert={!on}
        aria-hidden={!on}
      >
        <a href="/" aria-label="Home shortcuts">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="m3 11 9-8 9 8M5 10v11h5v-7h4v7h5V10" />
          </svg>
          Home
        </a>
        <a href="/menu">
          <IconMenu /> Menu
        </a>
        <a href="/campsites">
          <IconPin /> Camps
        </a>
        <button onClick={() => setSheet(true)} aria-haspopup="dialog">
          <IconPhone /> Call
        </button>
      </nav>
      <div
        className={`sheet-backdrop ${sheet ? "is-open" : ""}`}
        onClick={close}
        aria-hidden
      />
      <aside
        ref={dialog}
        className={`sheet callsheet ${sheet ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Call a campsite"
        aria-hidden={!sheet}
        inert={!sheet}
        tabIndex={-1}
        data-lenis-prevent
      >
        <button
          className="sheet__close"
          onClick={close}
          aria-label="Close"
          tabIndex={sheet ? 0 : -1}
        >
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
                  <div style={{ fontSize: 12.5 }}>
                    {b.phone ?? "Number to confirm"}
                  </div>
                </div>
                {b.phone ? (
                  <a
                    className="btn btn--small"
                    href={`tel:${b.phone.replace(/\s/g, "")}`}
                    tabIndex={sheet ? 0 : -1}
                  >
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
