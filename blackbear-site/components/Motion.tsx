"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import type Lenis from "lenis";
import { useMotionPreference } from "@/lib/motion-preference";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Global scroll + declarative motion:
 *  data-reveal        fade/slide up when it enters (data-delay="0.1")
 *  data-stagger       reveals its direct children one after another
 *  data-draw          (on SVG strokes) pen-draws when its <svg> enters
 *  data-pop           stamp pops in with a twist
 *  data-parallax="n"  drifts vertically at n * 100px across the viewport
 */
export default function Motion() {
  const motionPreference = useMotionPreference();
  useEffect(() => {
    document.documentElement.classList.toggle(
      "rm",
      motionPreference !== "full",
    );
    if (motionPreference !== "full") return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          delay: Number(el.dataset.delay || 0),
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((el) => {
        const kids = Array.from(el.children) as HTMLElement[];
        gsap.set(kids, { opacity: 0, y: 36 });
        gsap.to(kids, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        });
      });

      // group strokes per <svg> so each drawing pens in as one gesture
      const svgs = new Set<SVGSVGElement>();
      document.querySelectorAll<SVGElement>("[data-draw]").forEach((p) => {
        const svg = p.closest("svg");
        if (svg && !svg.closest("[data-manual-draw]")) svgs.add(svg);
      });
      svgs.forEach((svg) => {
        const strokes = svg.querySelectorAll("[data-draw]");
        gsap.set(strokes, { drawSVG: "0%" });
        gsap.to(strokes, {
          drawSVG: "100%",
          duration: 0.9,
          stagger: 0.12,
          ease: "power2.inOut",
          scrollTrigger: { trigger: svg, start: "top 90%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-pop]").forEach((el) => {
        if (el.closest("[data-manual-draw]")) return;
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.3, rotate: -40 },
          {
            opacity: 1,
            scale: 1,
            rotate: -12,
            duration: 0.9,
            ease: "back.out(2.2)",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amt = Number(el.dataset.parallax || 0.2) * 100;
        gsap.fromTo(
          el,
          { y: -amt },
          {
            y: amt,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    });

    // Native scrolling keeps filters, focus, and browser restoration predictable.
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!a) return;
      const id = a.getAttribute("href")!;
      if (id.length < 2) return;
      const target = document.getElementById(decodeURIComponent(id.slice(1)));
      if (!target) return;
      e.preventDefault();
      const offset = target.classList.contains("board")
        ? -parseFloat(getComputedStyle(target).scrollMarginTop)
        : -parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--header-h",
            ),
          ) - 16;
      requestAnimationFrame(() => {
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY + offset,
          behavior: "smooth",
        });
        if (id === "#main")
          (target as HTMLElement).focus({ preventScroll: true });
      });
      history.replaceState(null, "", id);
    };
    document.addEventListener("click", onClick);

    // images load late → recompute trigger positions
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    let refreshFrame = 0;
    const resize = new ResizeObserver(() => {
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(refresh);
    });
    const main = document.querySelector("main");
    if (main) resize.observe(main);
    document.fonts.ready.then(refresh);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      cancelAnimationFrame(refreshFrame);
      resize.disconnect();
      ctx.revert();
    };
  }, [motionPreference]);
  return null;
}

/** Lock page scroll (sheets, drawer). Counter so nested locks are safe. */
let locks = 0;
let previousOverflow = "";
export function lockScroll(on: boolean) {
  if (on && locks === 0)
    previousOverflow = document.documentElement.style.overflow;
  locks = Math.max(0, locks + (on ? 1 : -1));
  if (locks > 0) {
    document.documentElement.style.overflow = "hidden";
  } else {
    document.documentElement.style.overflow = previousOverflow;
  }
}
