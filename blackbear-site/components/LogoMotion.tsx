"use client";
import { useState } from "react";
import Img from "./Img";

/** Animate the supplied Black Bear badge; the original artwork is untouched. */
export default function LogoMotion({
  showcase = false,
}: {
  showcase?: boolean;
}) {
  const [replay, setReplay] = useState(0);
  return (
    <div className={`brand-motion ${showcase ? "brand-motion--showcase" : ""}`}>
      <span className="brand-motion__badge" key={replay} aria-hidden="true">
        <Img
          slug="logo-badge-cream-on-forest"
          alt=""
          sizes={showcase ? "200px" : "48px"}
        />
        <svg viewBox="0 0 100 100">
          <circle className="brand-motion__ring" cx="50" cy="50" r="48" />
        </svg>
        <span className="brand-motion__spark brand-motion__spark--one" />
        <span className="brand-motion__spark brand-motion__spark--two" />
      </span>
      {showcase && (
        <>
          <p className="hand">A familiar face. A little life.</p>
          <button
            className="btn btn--small btn--cream"
            onClick={() => setReplay((value) => value + 1)}
          >
            Replay logo animation
          </button>
          <small>
            Original badge artwork · motion respects your accessibility
            preference
          </small>
        </>
      )}
    </div>
  );
}
