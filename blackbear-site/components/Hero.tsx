"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { brand } from "@/lib/data";
import { onReady } from "./Preloader";
import { IconFacebook, IconInstagram, IconPin } from "./Icons";
import { useMotionPreference } from "@/lib/motion-preference";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

// coordinates in the cut-out scene's own pixel space (1448 x 819)
const STEAM = [
  { x: 618, y: 560 },
  { x: 1026, y: 410 },
];
const STARS = [
  { x: 210, y: 120, s: 1 },
  { x: 1240, y: 70, s: 0.8 },
  { x: 880, y: 40, s: 0.6 },
  { x: 120, y: 330, s: 0.5 },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const motionPreference = useMotionPreference();

  useEffect(() => {
    const el = root.current!;
    if (motionPreference !== "full") return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      let cancelReady = () => {};
      const ctx = gsap.context(() => {
        gsap.set(".steam path", { drawSVG: "0% 0%" });
        gsap.set(".twinkle", { scale: 0, transformOrigin: "50% 50%" });
        gsap.set(".hero__scene-inner", { yPercent: 18, opacity: 0 });
        gsap.set(".hero__sun", { yPercent: 70 });

        const loops = gsap.timeline({ paused: true, repeat: -1 });
        gsap.utils
          .toArray<SVGPathElement>(".steam path")
          .forEach((path, index) => {
            loops
              .fromTo(
                path,
                { drawSVG: "0% 0%", opacity: 0.9 },
                { drawSVG: "0% 100%", duration: 1.5, ease: "expo.out" },
                index * 0.16,
              )
              .to(
                path,
                {
                  drawSVG: "100% 100%",
                  opacity: 0,
                  duration: 1.1,
                  ease: "expo.out",
                },
                1.5 + index * 0.16,
              );
          });
        loops.to(
          ".twinkle",
          {
            scale: 0.65,
            duration: 1.5,
            stagger: 0.15,
            yoyo: true,
            repeat: 1,
            ease: "expo.out",
          },
          0,
        );
        const intro = gsap.timeline({
          paused: true,
          defaults: { ease: "expo.out" },
        });
        intro
          .to(".hero__scene-inner", { yPercent: 0, opacity: 1, duration: 1.6 })
          .to(
            ".hero__title .word > span",
            { y: 0, duration: 1.3, stagger: 0.09 },
            0.15,
          )
          .to(
            "[data-intro]",
            { opacity: 1, y: 0, duration: 1, stagger: 0.07 },
            0.45,
          )
          .to(
            ".hero__sun",
            { yPercent: 0, duration: 2.2, ease: "power3.out" },
            0.4,
          )
          .to(
            ".twinkle",
            { scale: 1, duration: 0.8, stagger: 0.12, ease: "back.out(3)" },
            1,
          )
          .add(() => loops.play(), 1.6);
        gsap.set("[data-intro]", { y: 20 });

        ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          onLeave: () => loops.pause(),
          onEnterBack: () => loops.play(),
        });

        cancelReady = onReady(() => intro.play());

        // scroll: copy lifts away, camp drifts slower than the page
        gsap.to(".hero__top", {
          yPercent: -10,
          opacity: 0.65,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(".hero__sun", {
          y: 120,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }, el);
      return () => {
        cancelReady();
        ctx.revert();
      };
    });
    return () => media.revert();
  }, [motionPreference]);

  return (
    <section
      className="hero"
      id="top"
      ref={root}
      aria-label="Black Bear Kitchen + Coffee"
    >
      <div className="hero__socials">
        <a href={brand.instagram} target="_blank" rel="noreferrer" data-intro>
          <IconInstagram /> BLACKBEARCOFFEEPH
        </a>
        <a href={brand.facebook} target="_blank" rel="noreferrer" data-intro>
          <IconFacebook /> BLACKBEARCOFFEEISABELA
        </a>
      </div>

      <div className="hero__top">
        <div className="est" data-intro>
          <small>EST.</small>
          <b>2020</b>
        </div>
        <div className="hero__place" data-intro>
          ISABELA, PH
        </div>
        <h1 className="hero__title wordmark">
          <span className="word">
            <span>Black</span>
          </span>
          <span className="word">
            <span>Bear</span>
          </span>
        </h1>
        <div className="hero__kc" data-intro>
          KITCHEN+COFFEE
        </div>
        <p className="hero__tag" data-intro>
          Bear hugs &amp; bold brews
        </p>
        <div className="hero__ctas" data-intro>
          <a href="#campsites" className="btn">
            <IconPin /> Find your campsite
          </a>
          <a href="#menu" className="btn btn--ghost">
            See the menu
          </a>
        </div>
        <p className="hero__note" data-intro>
          Coffee, all-day brunch &amp; cake.
          <br />
          Seven campsites across Isabela &amp; Cagayan.
        </p>
      </div>

      <div className="hero__scene" aria-hidden>
        <div className="hero__scene-inner">
          <div className="hero__sun" />
          <img
            src="/img/camp-scene-cutout-1448.webp"
            srcSet="/img/camp-scene-cutout-800.webp 800w, /img/camp-scene-cutout-1448.webp 1448w"
            sizes="100vw"
            width={1448}
            height={819}
            alt=""
            fetchPriority="high"
          />
          <svg
            className="hero__fx"
            viewBox="0 0 1448 819"
            preserveAspectRatio="xMidYMid meet"
          >
            <g className="steam">
              {STEAM.map((s, i) => (
                <g key={i} transform={`translate(${s.x} ${s.y})`}>
                  <path d="M0 0c-14-18 14-30 0-50s14-32 0-52" />
                  <path d="M18 -6c-12-16 12-26 0-44s12-28 0-44" />
                </g>
              ))}
            </g>
            {STARS.map((s, i) => (
              <path
                key={i}
                className="twinkle"
                transform={`translate(${s.x} ${s.y}) scale(${s.s})`}
                d="M0-22C2-6 6-2 22 0 6 2 2 6 0 22-2 6-6 2-22 0-6-2-2-6 0-22z"
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden>
        <i /> Scroll to camp
      </div>
      <div className="hero__field-note" data-intro>
        <span>YOUR EVERYDAY ESCAPE</span>
        <span>Seven campsites. One familiar feeling.</span>
      </div>
    </section>
  );
}
