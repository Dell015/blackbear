"use client";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { branches, cakes } from "@/lib/data";
import { useDemo, localDate } from "@/lib/demo-store";
import { useCamp } from "@/lib/camp-selection";
import { useDialog } from "@/lib/useDialog";
import { campExperiences } from "@/lib/camp-experiences";
import { pitchAudiences, pitchChapters, pitchFeatures, pitchRoute, readPitchRoute, type PitchAudience, type PitchChapter } from "@/lib/pitch";
import CampPicker from "./CampPicker";
import CampScene from "./CampScene";
import Img from "./Img";
import LogoMotion from "./LogoMotion";
import MotionToggle from "./MotionToggle";
import { IconArrowRight, IconCheck, IconClose } from "./Icons";

function DemoLink({href,children,className="text-link"}:{href:string;children:React.ReactNode;className?:string}) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}<span className="sr-only"> (opens a separate demo tab)</span><span aria-hidden="true">↗</span></a>;
}
function ChapterPicker({selected,onSelect}:{selected:PitchChapter;onSelect:(id:PitchChapter)=>void}) {
  const [open,setOpen]=useState(false),[mounted,setMounted]=useState(false);
  const dialog=useDialog<HTMLElement>(open,()=>setOpen(false));
  useEffect(()=>setMounted(true),[]);
  const index=pitchChapters.findIndex(c=>c.id===selected);
  return <>
    <button className="proposal-chapter-trigger" onClick={()=>setOpen(true)} aria-haspopup="dialog" aria-expanded={open}><span><small>{String(index+1).padStart(2,"0")} / 05</small>{pitchChapters[index].label}</span><span aria-hidden="true">⌄</span></button>
    {mounted&&createPortal(<><div className={`sheet-backdrop ${open?"is-open":""}`} onClick={()=>setOpen(false)} aria-hidden="true"/><aside className={`sheet proposal-chapter-picker ${open?"is-open":""}`} ref={dialog} role="dialog" aria-modal="true" aria-label="Choose a pitch chapter" aria-hidden={!open} inert={!open} tabIndex={-1}><button className="sheet__close" onClick={()=>setOpen(false)} aria-label="Close pitch chapters"><IconClose/></button><div className="sheet__handle"/><div className="sheet__body"><span className="eyebrow">The website proposal</span><h2>Pick a chapter.</h2>{pitchChapters.map((c,i)=><button className="proposal-chapter-option" key={c.id} aria-current={selected===c.id?"true":undefined} onClick={()=>{onSelect(c.id);setOpen(false);}}><span>{String(i+1).padStart(2,"0")}</span><span><b>{c.label}</b><small>{c.description}</small></span><IconArrowRight/></button>)}</div></aside></>,document.body)}
  </>;
}
function OutlineDemo() {
  const [take,setTake]=useState(0);
  return <button className="proposal-outline-demo ink-highlight is-ink-visible" onClick={()=>setTake(t=>t+1)} aria-label="Replay the brief cream outline around the Loco Moco image"><Img slug="food-loco-moco" alt="Black Bear Loco Moco" sizes="(max-width:699px) 100vw,380px"/><svg key={take} className="ink-sweep" viewBox="0 0 300 260" aria-hidden="true"><path pathLength="1" d="M24 146C10 55 273 47 277 143C287 233 36 249 24 146M45 195Q147 247 262 192M257 49l11-16m4 31 15-3"/></svg><span>Replay the little highlight <span aria-hidden="true">↻</span></span></button>;
}

export default function PitchPresentation() {
  const [chapter,setChapter]=useState<PitchChapter>("experience"),[audience,setAudience]=useState<PitchAudience>("guest");
  const [camp,setCamp]=useCamp(),state=useDemo(),content=useRef<HTMLDivElement>(null);
  useEffect(()=>{const sync=()=>{const next=readPitchRoute(location.search);setChapter(next.chapter);setAudience(next.audience);};sync();window.addEventListener("popstate",sync);return()=>window.removeEventListener("popstate",sync);},[]);
  function chooseChapter(id:PitchChapter) {setChapter(id);history.pushState(null,"",pitchRoute(id,audience));requestAnimationFrame(()=>content.current?.scrollIntoView({block:"start",behavior:document.documentElement.classList.contains("rm")?"instant":"smooth"}));}
  function chooseAudience(id:PitchAudience) {setAudience(id);history.replaceState(null,"",pitchRoute(chapter,id));}
  function keyboardTab<T extends string>(event:KeyboardEvent<HTMLButtonElement>,items:readonly {id:T}[],current:T,change:(id:T)=>void,prefix:string) {
    const currentIndex=items.findIndex(i=>i.id===current);let next=currentIndex;
    if(event.key==="ArrowRight")next=(currentIndex+1)%items.length;else if(event.key==="ArrowLeft")next=(currentIndex+items.length-1)%items.length;else if(event.key==="Home")next=0;else if(event.key==="End")next=items.length-1;else return;
    event.preventDefault();change(items[next].id);requestAnimationFrame(()=>document.getElementById(`${prefix}-${items[next].id}`)?.focus({preventScroll:true}));
  }
  const b=branches.find(b=>b.id===camp)!,update=state.camps[camp],examples=campExperiences[camp];
  const reviewed=Object.values(state.camps).filter(c=>c.updated===localDate()).length,pending=state.photos.filter(p=>!p.approved).length;
  return <div className="pitch-page proposal">
    <a className="skip-link" href="#pitch-content">Skip to the proposal</a>
    <header className="proposal-nav"><div className="wrap"><a className="proposal-brand" href="/" aria-label="Black Bear home"><LogoMotion/><span><b className="wordmark">Black Bear</b><small>The website proposal</small></span></a><nav aria-label="Proposal quick links"><DemoLink href="/">View the café</DemoLink><DemoLink href="/admin" className="text-link proposal-nav__workspace">Workspace</DemoLink></nav></div></header>
    <main id="app-main">
      <section className="proposal-intro"><div className="wrap"><div><span className="eyebrow">Black Bear / a frontend concept</span><h1>One brand.<br/>Seven camps.</h1><p className="script">A more connected everyday.</p></div><div><p className="proposal-intro__lead">A faster way to pick a drink, find a camp, and keep each branch up to date.</p><p>One Black Bear identity, with useful views for customers, regulars, the crew, and the owner.</p><DemoLink href="/" className="btn btn--cream">Open the customer preview</DemoLink><small>Frontend prototype · demo updates stay in this browser.</small></div></div></section>
      <nav className="proposal-navigation" aria-label="Pitch chapters"><div className="wrap"><div className="proposal-desktop-chapters" role="tablist" aria-label="Pitch chapters">{pitchChapters.map((c,i)=><button role="tab" id={`proposal-tab-${c.id}`} aria-selected={chapter===c.id} aria-controls={`proposal-panel-${c.id}`} tabIndex={chapter===c.id?0:-1} key={c.id} onClick={()=>chooseChapter(c.id)} onKeyDown={e=>keyboardTab(e,pitchChapters,chapter,chooseChapter,"proposal-tab")}><small>{String(i+1).padStart(2,"0")}</small>{c.short}</button>)}</div><ChapterPicker selected={chapter} onSelect={chooseChapter}/></div></nav>
      <div ref={content} id="pitch-content" tabIndex={-1} className="proposal-content">
        <section className="wrap proposal-chapter" id="proposal-panel-experience" role="tabpanel" aria-labelledby="proposal-tab-experience" hidden={chapter!=="experience"}>
          <div className="proposal-section-heading"><span className="eyebrow">01 / The experience</span><h2>Useful for the person<br/>on either side of the counter.</h2><p>Choose a perspective. The design stays Black Bear; the next useful action changes.</p></div>
          <div className="proposal-audiences" role="tablist" aria-label="Choose a perspective">{pitchAudiences.map(a=><button key={a.id} role="tab" id={`audience-tab-${a.id}`} aria-selected={audience===a.id} aria-controls={`audience-panel-${a.id}`} tabIndex={audience===a.id?0:-1} onClick={()=>chooseAudience(a.id)} onKeyDown={e=>keyboardTab(e,pitchAudiences,audience,chooseAudience,"audience-tab")}>{a.short}</button>)}</div>
          {pitchAudiences.map(a=><article className="proposal-audience" id={`audience-panel-${a.id}`} role="tabpanel" aria-labelledby={`audience-tab-${a.id}`} key={a.id} hidden={audience!==a.id}><div><span className="eyebrow">{a.label}</span><blockquote>“{a.question}”</blockquote><h3>{a.title}</h3><p>{a.description}</p><DemoLink href={a.href} className="btn">{a.action}</DemoLink></div><div><ul>{a.features.map(f=><li key={f}><IconCheck/><span>{f}</span></li>)}</ul><p className="proposal-boundary">{a.boundary}</p></div></article>)}
          <p className="proposal-demo-note">Demo links open in a separate tab, keeping this walkthrough in place.</p>
        </section>
        <section className="wrap proposal-chapter" id="proposal-panel-features" role="tabpanel" aria-labelledby="proposal-tab-features" hidden={chapter!=="features"}>
          <div className="proposal-section-heading"><span className="eyebrow">02 / What you can try</span><h2>Open it. Try it.<br/>See what is working.</h2><p>Each link opens a real frontend view. The label distinguishes a local workflow from illustrative content.</p></div>
          <div className="proposal-feature-list">{pitchFeatures.map((f,i)=><article key={f.id}><span className="proposal-feature-number">{String(i+1).padStart(2,"0")}</span><div><h3>{f.title}</h3><p>{f.description}</p></div><div><span className="proposal-feature-status">{f.status}</span><DemoLink href={f.href}>{f.action}</DemoLink></div></article>)}</div>
        </section>
        <section className="wrap proposal-chapter" id="proposal-panel-operations" role="tabpanel" aria-labelledby="proposal-tab-operations" hidden={chapter!=="operations"}>
          <div className="proposal-section-heading"><span className="eyebrow">03 / Behind the counter</span><h2>A branch update.<br/>A clearer customer visit.</h2><p>Try this loop with one campsite. Changes stay on this browser origin; the preview below responds to updates from another demo tab.</p></div>
          <div className="proposal-operations"><div className="proposal-demo-steps"><CampPicker value={camp} onChange={setCamp}/><ol><li><span>01</span><div><h3>Open the campsite desk.</h3><p>Change a cake selection, write a crew note, or edit an example special or event.</p><DemoLink href={`/admin?tab=camps&camp=${camp}`}>Edit {b.short}</DemoLink></div></li><li><span>02</span><div><h3>Publish a local update.</h3><p>The workspace saves it to this browser. Return to this tab to see it reflected here.</p></div></li><li><span>03</span><div><h3>See it as a customer.</h3><p>Open the same campsite. The menu also reflects its cake lineup and unavailable-item notes.</p><DemoLink href={`/campsites?camp=${camp}`}>View this campsite</DemoLink></div></li></ol></div>
            <aside className="proposal-live-preview" aria-label="Current local campsite data"><span className="eyebrow">Local preview / {b.short}</span><h3>{update.note||"A note from the crew will appear here."}</h3><small>{update.updated?`Local update · ${update.updated}`:"Using the dated sample cake selection"}</small><dl><div><dt>In the sample cake case</dt><dd>{update.cakes.map(id=>cakes.find(c=>c.id===id)?.name).filter(Boolean).join(" · ")||"No selection listed"}</dd></div><div><dt>Example special</dt><dd>{update.specialTitle||examples.special}</dd></div><div><dt>Example event</dt><dd>{update.eventTitle||examples.event}<small>{update.eventWhen||examples.when} · sample schedule</small></dd></div><div><dt>Unavailable-item notes</dt><dd>{update.soldOut.length} in this local demo</dd></div></dl><DemoLink href={`/campsites?camp=${camp}`}>Open the customer view</DemoLink></aside>
          </div><div className="proposal-operating-state"><span><b>{reviewed} / 7</b> camps reviewed today</span><span><b>{pending}</b> photos awaiting local review</span><DemoLink href="/admin">Open the owner overview</DemoLink></div><p className="proposal-demo-note">These are workflow indicators from this browser, not live business performance.</p>
        </section>
        <section className="wrap proposal-chapter" id="proposal-panel-design" role="tabpanel" aria-labelledby="proposal-tab-design" hidden={chapter!=="design"}>
          <div className="proposal-section-heading"><span className="eyebrow">04 / The Black Bear feeling</span><h2>Keep the character.<br/>Give it a little life.</h2><p>The original badge, engraved camp style, forest green, warm orange and real café photos lead the design. Motion stays brief and supports the interaction.</p></div>
          <div className="proposal-motion-grid"><article className="proposal-camp-demo"><div className="proposal-camp-window"><CampScene/></div><h3>A small story at camp.</h3><p>Bernie follows a firefly, then sits to watch it. The terrain, props and bear share one scene, so their positions stay together.</p><DemoLink href="/">See it on the home page</DemoLink></article><article className="proposal-logo-demo"><LogoMotion showcase/><h3>The same badge. A warmer hello.</h3><p>A short entrance and ring draw use the supplied logo artwork. The replay lets you show it during the pitch.</p></article><article className="proposal-food-demo"><OutlineDemo/><h3>A little emphasis, then quiet.</h3><p>A cream line draws around the image and disappears. It echoes the café’s own illustrated food posters.</p></article><article className="proposal-motion-notes"><span className="eyebrow">Motion with a purpose</span><h3>Fast to use.<br/>Calm to look at.</h3><ul><li>Soft page transitions where the browser supports them.</li><li>Short feedback for categories, quick views and drawers.</li><li>Selected scroll reveals, without taking over scrolling.</li><li>A system-aware reduced-motion option.</li></ul><MotionToggle/></article></div>
        </section>
        <section className="wrap proposal-chapter" id="proposal-panel-scope" role="tabpanel" aria-labelledby="proposal-tab-scope" hidden={chapter!=="scope"}>
          <div className="proposal-section-heading"><span className="eyebrow">05 / From concept to café</span><h2>Start with one camp.<br/>Build around its real day.</h2><p>The prototype demonstrates the experience. A pilot can confirm the details and connect the workflows that the team actually needs.</p></div>
          <div className="proposal-scope-grid"><article><span className="eyebrow">Built / frontend</span><h3>Try the experience now.</h3><ul><li>Customer menu, quick views and saved picks</li><li>Branch selection, street map and directions</li><li>Local branch publishing and owner overview</li><li>Club, crew and photo-review concepts</li></ul></article><article><span className="eyebrow">Next / connected system</span><h3>Bring the branches together.</h3><ul><li>Staff accounts and branch permissions</li><li>A shared menu, media store and database</li><li>Verified visits, rewards and consented uploads</li><li>Optional pickup, notifications or POS integration</li></ul></article><article><span className="eyebrow">Pilot / owner & crew</span><h3>Confirm the useful details.</h3><ul><li>Exact shop pins, hours and current menu</li><li>Approved brand assets and staff profiles</li><li>Real publishing responsibilities and update cadence</li><li>Agreed loyalty rules and photo permissions</li></ul></article></div>
          <div className="proposal-faq"><details><summary>What would the owner be able to manage?</summary><p>The proposed connected system brings branch content, shared menus and media, availability notes, crew profiles and moderation into one workspace. The current demo lets you try these workflows on one browser. Live inventory, sales reporting and cross-device access would need a backend and any relevant integrations.</p></details><details><summary>Are the branch specials and rewards real?</summary><p>No. The specials, events, crew profiles, stamp rewards and photo challenge demonstrate how the product could work. They remain labeled as examples until Black Bear agrees the content and program terms.</p></details><details><summary>How would we know the website is helping?</summary><p>A pilot could measure menu views, requests for directions, calls and the time the crew needs to keep branch information current. Real analytics and any revenue impact would be measured after a connected launch; this prototype does not claim results.</p></details></div>
        </section>
      </div>
      <footer className="proposal-footer"><div className="wrap"><div><b>Try the day-to-day.</b><span>Then decide what to connect first.</span></div><nav aria-label="Presentation actions"><DemoLink href="/">Customer preview</DemoLink><DemoLink href="/admin">Team workspace</DemoLink><button className="text-link" onClick={()=>window.print()}>Print the full overview <span aria-hidden="true">↗</span></button></nav><MotionToggle/></div></footer>
    </main>
  </div>;
}
