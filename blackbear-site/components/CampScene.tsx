"use client";
import { useEffect, useRef, useState } from "react";
import { useMotionPreference } from "@/lib/motion-preference";
/** Shared SVG coordinates keep the hills, props and Bernie's path together. */
export default function CampScene() {
  const [take, setTake] = useState(0), [playing, setPlaying] = useState(false);
  const preference = useMotionPreference(), timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  function replay() { if (timer.current) clearTimeout(timer.current); setTake(x => x + 1); setPlaying(true); timer.current = setTimeout(() => setPlaying(false), 7200); }
  return <div className="camp-scene">
    <svg className="camp-scene__world" viewBox="0 0 1600 720" aria-hidden="true">
      <path fill="#516348" d="M0 540C230 567 410 518 570 458C750 390 818 282 1050 288C1270 294 1430 255 1600 310V720H0Z"/>
      <path fill="#43553d" d="M0 584C270 613 450 536 690 500C916 466 1100 504 1310 462C1440 436 1520 453 1600 447V720H0Z"/>
      <image href="/img/camp-props-v3.webp" x="800" y="50" width="900" height="600"/>
      <g key={take} className={`camp-scene__story ${preference === "full" ? "can-play" : ""}`}>
        <g className="camp-scene__bear">
          <ellipse cx="805" cy="576" rx="53" ry="7" fill="#12120f" opacity=".16"/>
          <svg x="700" y="400" width="200" height="200" viewBox="0 0 200 200" overflow="hidden">
            <image className="camp-scene__sprite-frame" href="/img/bernie-walk-v2.webp" x="-400" width="600" height="200"/>
          </svg>
        </g>
        <g className="camp-scene__firefly" color="#fef6cf">
          <path d="M923 388v24M911 400h24M915 392l16 16m-16 0 16-16" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="923" cy="400" r="2.5" fill="currentColor"/>
        </g>
        <text className="camp-scene__notice" x="718" y="382">Oh, hello there.</text>
      </g>
    </svg>
    <button className="camp-scene__replay" onClick={replay} disabled={playing || preference !== "full"} aria-label="Replay Bernie following a firefly"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 8a8 8 0 1 1-1 8M4 3v6h6"/></svg><span>{preference === "full" ? "A moment with Bernie" : "Bernie at camp"}</span></button>
  </div>;
}
