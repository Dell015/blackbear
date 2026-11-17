"use client";
import { useEffect, useState } from "react";
import { brand } from "@/lib/data";
import { lockScroll } from "./Motion";
import { IconFacebook, IconInstagram, IconMail, IconPin } from "./Icons";

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#cakes", label: "Cakes" },
  { href: "#campsites", label: "Campsites" },
  { href: "#story", label: "Story" },
  { href: "#events", label: "Events" },
];

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      setHidden(y > 400 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className={`header ${solid && !open ? "is-solid" : ""} ${hidden && !open ? "is-hidden" : ""}`}>
        <div className="wrap header__inner">
          <a href="#top" className="logo" aria-label="Black Bear Kitchen + Coffee, back to top" onClick={() => setOpen(false)}>
            <span className="wordmark">Black Bear</span>
            <small>KITCHEN+COFFEE</small>
          </a>
          <nav className="nav" aria-label="Main">
            {links.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <a href="#campsites" className="btn btn--small header__cta">
            <IconPin /> Find a campsite
          </a>
          <button className={`burger ${open ? "is-open" : ""}`} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav className="drawer__links" aria-label="Mobile">
          {links.map((l, i) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              <small>0{i + 1}</small>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="drawer__foot">
          <div className="row">
            <a className="btn btn--small" href={brand.instagram} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>
              <IconInstagram /> Instagram
            </a>
            <a className="btn btn--small" href={brand.facebook} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>
              <IconFacebook /> Facebook
            </a>
          </div>
          <a href={`mailto:${brand.email}`} tabIndex={open ? 0 : -1} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <IconMail width={18} /> {brand.email}
          </a>
        </div>
      </div>
    </>
  );
}
