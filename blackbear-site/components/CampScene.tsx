"use client";
import { useEffect, useRef, useState } from "react";
import { useMotionPreference } from "@/lib/motion-preference";
/** Bernie follows a firefly, then sits to watch it. */
export default function CampScene() {
  const [take, setTake] = useState(0), [playing, setPlaying] = useState(false);
  const preference = useMotionPreference(), timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  function replay() { if (timer.current) clearTimeout(timer.current); setTake(x => x + 1); setPlaying(true); timer.current = setTimeout(() => setPlaying(false), 6500); }
  return <div className="camp-scene">
    <svg className="camp-scene__hills" viewBox="0 0 1600 400" preserveAspectRatio="none" aria-hidden="true"><path fill="#516348" d="M0 190Q220 80 420 190T850 160T1250 170T1600 130V400H0Z"/><path fill="#43553d" d="M0 235Q200 170 410 230T820 190T1230 210T1600 180V400H0Z"/></svg>
    <img className="camp-scene__landscape" src="/img/camp-landscape-v2.webp" width="1536" height="1024" alt="A forest campsite with a canvas tent, books, and coffee" fetchPriority="high"/>
    <div key={take} className={`camp-scene__story ${preference === "full" ? "can-play" : ""}`} aria-hidden="true"><div className="camp-scene__bear"><div className="camp-scene__sprite"/></div><svg className="camp-scene__firefly" viewBox="0 0 32 32"><path d="M16 3v26M3 16h26M7 7l18 18M7 25 25 7" stroke="currentColor" strokeWidth="1.5"/><circle cx="16" cy="16" r="3" fill="currentColor"/></svg><span className="camp-scene__notice">Oh, hello there.</span></div>
    <button className="camp-scene__replay" onClick={replay} disabled={playing || preference !== "full"} aria-label="Replay Bernie following a firefly"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 8a8 8 0 1 1-1 8M4 3v6h6"/></svg><span>{preference === "full" ? "A moment with Bernie" : "Bernie at camp"}</span></button>
  </div>;
}
