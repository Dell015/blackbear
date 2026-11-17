"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
gsap.registerPlugin(DrawSVGPlugin);
import Img from "./Img";

declare global {
  interface Window {
    __bbReady?: boolean;
  }
}

export function onReady(fn: () => void) {
  if (window.__bbReady) fn();
  else window.addEventListener("bb:ready", fn, { once: true });
}
function ready() {
  window.__bbReady = true;
  window.dispatchEvent(new Event("bb:ready"));
}

/** Opening moment: badge draws in, counter runs, curtain lifts. Once per session. */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const el = root.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem("bb-intro") === "1";
      sessionStorage.setItem("bb-intro", "1");
    } catch {}
    if (reduced || seen) {
      setGone(true);
      ready();
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const count = el.querySelector(".preloader__count b")!;
    const obj = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.style.overflow = "";
        setGone(true);
      },
    });
    tl.fromTo(el.querySelectorAll("circle"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.1, stagger: 0.15, ease: "power2.inOut" })
      .fromTo(el.querySelector("img"), { scale: 0.6, opacity: 0, rotate: -20 }, { scale: 1, opacity: 1, rotate: 0, duration: 0.9, ease: "back.out(1.8)" }, 0.2)
      .to(obj, { v: 100, duration: 1.3, ease: "power2.inOut", onUpdate: () => (count.textContent = String(Math.round(obj.v))) }, 0)
      .to(el.querySelector(".preloader__badge"), { scale: 0.9, opacity: 0, duration: 0.45, ease: "power2.in" }, "+=0.15")
      .add(ready, "-=0.1")
      .to(el, { yPercent: -100, duration: 0.95, ease: "expo.inOut" }, "-=0.15");
    return () => {
      tl.kill();
    };
  }, []);

  if (gone) return null;
  return (
    <div className="preloader" ref={root} aria-hidden>
      <div className="preloader__badge">
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="none" stroke="#fef6cf" strokeWidth="1.2" />
          <circle cx="50" cy="50" r="44" fill="none" stroke="#cd6128" strokeWidth="1.2" strokeDasharray="2 3" />
        </svg>
        <Img slug="logo-badge-cream-on-forest" alt="" sizes="230px" priority />
      </div>
      <div className="preloader__count">
        Setting up camp <b>0</b>%
      </div>
    </div>
  );
}
