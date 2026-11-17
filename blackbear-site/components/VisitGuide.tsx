"use client";
import { useEffect, useState } from "react";
import { branches } from "@/lib/data";
import { useDemo } from "@/lib/demo-store";
import { IconArrowRight, IconPin } from "./Icons";

export default function VisitGuide() {
  const demo = useDemo();
  const [camp, setCamp] = useState("cauayan-d1");
  const [intent, setIntent] = useState<"first" | "usual" | "new">("first");
  useEffect(() => { try { const saved = localStorage.getItem("bb-fav-camp"); if (saved && branches.some((branch) => branch.id === saved)) setCamp(saved); } catch {} }, []);
  const chooseCamp = (value: string) => {
    setCamp(value);
    try { localStorage.setItem("bb-fav-camp", value); window.dispatchEvent(new Event("bb:favorite")); } catch {}
  };
  const current = demo.camps[camp];
  return <section className="visit-guide" aria-labelledby="visit-title">
    <div className="wrap visit-guide__inner">
      <div className="visit-guide__intro"><span className="eyebrow">Make yourself at home</span><h2 id="visit-title">Your next good<br /><span className="script">little escape.</span></h2></div>
      <div className="visit-guide__body">
        <div className="visit-guide__tabs" role="group" aria-label="Plan your visit"><button aria-pressed={intent === "first"} onClick={() => setIntent("first")}>New around here</button><button aria-pressed={intent === "usual"} onClick={() => setIntent("usual")}>Back for my usual</button><button aria-pressed={intent === "new"} onClick={() => setIntent("new")}>What&apos;s happening</button></div>
        <p>{intent === "first" ? "Coffee, all-day brunch, and a place to settle in. Start with a kitchen favorite, then find your nearest campsite." : intent === "usual" ? "Your camp, your familiar faces, your favorite order. Save a campsite for next time and check its latest update." : current.note || "Discover the featured drink series, explore life at camp, or try the proposed Bear Scout Club."}</p>
        <div className="visit-guide__actions"><label className="camp-select"><IconPin /><span className="sr-only">Your campsite</span><select value={camp} onChange={(event) => chooseCamp(event.target.value)}>{branches.map((branch) => <option key={branch.id} value={branch.id}>{branch.name}</option>)}</select></label><a href={intent === "first" ? "#fuel" : intent === "usual" ? "#cakes" : "/club"} className="text-link">{intent === "first" ? "Meet the favorites" : intent === "usual" ? "Check the cake case" : "Explore the club"}<IconArrowRight /></a></div>
        {intent === "usual" && <span className="visit-guide__status">{current.updated ? `Local demo update: ${current.updated}` : "Cake lineup is a dated sample. Call your camp for availability."}</span>}
      </div>
    </div>
  </section>;
}
