"use client";
import { useEffect, useState } from "react";
import { brand } from "@/lib/data";
import { useDialog } from "@/lib/useDialog";
import { IconClose, IconFacebook, IconInstagram, IconMail, IconPin } from "./Icons";

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#cakes", label: "Cakes" },
  { href: "#campsites", label: "Campsites" },
  { href: "#story", label: "Our story" },
  { href: "#events", label: "Gatherings" },
];

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const drawer = useDialog<HTMLDivElement>(open, () => setOpen(false));
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(`#${entry.target.id}`); });
    }, { rootMargin: "-15% 0px -65% 0px" });
    document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
    const desktop = window.matchMedia("(min-width: 1000px)");
    const onResize = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      desktop.removeEventListener("change", onResize);
      observer.disconnect();
    };
  }, []);
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <header className={`header ${solid ? "is-solid" : ""}`}>
        <div className="wrap header__inner">
          <a href="#top" className="logo" aria-label="Black Bear Kitchen + Coffee, back to top"><span className="wordmark">Black Bear</span><small>KITCHEN+COFFEE</small></a>
          <nav className="nav" aria-label="Main">
            {links.map((link) => <a key={link.href} href={link.href} aria-current={active === link.href ? "location" : undefined}>{link.label}</a>)}
          </nav>
          <a href="#campsites" className="btn btn--small header__cta"><IconPin /> Find a campsite</a>
          <button className="burger" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(true)}><span /><span /></button>
        </div>
      </header>
      <div ref={drawer} id="mobile-navigation" className={`drawer ${open ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Explore Black Bear" aria-hidden={!open} inert={!open} tabIndex={-1} data-lenis-prevent>
        <span className="drawer__brand wordmark">Black Bear</span>
        <button className="round drawer__close" aria-label="Close menu" onClick={() => setOpen(false)}><IconClose /></button>
        <nav className="drawer__links" aria-label="Mobile">
          {links.map((link, index) => <a key={link.href} href={link.href} onClick={() => setOpen(false)}><small>0{index + 1}</small>{link.label}</a>)}
        </nav>
        <div className="drawer__foot">
          <span className="hand">Good company starts here.</span>
          <div className="row">
            <a className="btn btn--small" href={brand.instagram} target="_blank" rel="noreferrer"><IconInstagram /> Instagram</a>
            <a className="btn btn--small btn--ghost" href={brand.facebook} target="_blank" rel="noreferrer"><IconFacebook /> Facebook</a>
          </div>
          <a className="drawer__email" href={`mailto:${brand.email}`}><IconMail width={18} /> {brand.email}</a>
        </div>
      </div>
    </>
  );
}
