"use client";
import { useId, useState } from "react";
import { branches } from "@/lib/data";
import { useDialog } from "@/lib/useDialog";
import { IconArrowRight, IconClose, IconPin, IconSearch } from "./Icons";
export default function CampPicker({ value, onChange, label = "Your campsite" }: { value: string; onChange: (id: string) => void; label?: string }) {
  const [open, setOpen] = useState(false), [query, setQuery] = useState("");
  const id = useId(), dialog = useDialog<HTMLElement>(open, () => setOpen(false));
  const branch = branches.find(b => b.id === value) ?? branches[3];
  const list = branches.filter(b => `${b.name} ${b.address}`.toLowerCase().includes(query.toLowerCase().trim()));
  return <>
    <button className="camp-picker" onClick={() => { setQuery(""); setOpen(true); }} aria-haspopup="dialog" aria-expanded={open} aria-controls={id}>
      <IconPin/><span><small>{label}</small><b>{branch.name}</b></span><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden="true"><path d="m5 8 5 5 5-5"/></svg>
    </button>
    <div className={`sheet-backdrop ${open ? "is-open" : ""}`} onClick={() => setOpen(false)} aria-hidden="true"/>
    <aside ref={dialog} id={id} className={`sheet camp-choice ${open ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Choose your campsite" aria-hidden={!open} inert={!open} tabIndex={-1}>
      <button className="sheet__close" onClick={() => setOpen(false)} aria-label="Close campsite picker"><IconClose/></button><div className="sheet__handle"/>
      <div className="sheet__body"><span className="eyebrow">Seven places to settle in</span><h2>Where’s your camp?</h2><p>Choose a branch for its menu notes, cake case, and what’s happening there.</p>
        <label className="camp-choice__search"><IconSearch/><input type="search" aria-label="Search campsites" placeholder="Search town or branch" value={query} onChange={e => setQuery(e.target.value)}/></label>
        <div className="camp-choice__list">{list.map(b => <button key={b.id} onClick={() => { onChange(b.id); setOpen(false); }} aria-pressed={b.id === value}><span><b>{b.name}</b><small>{b.address}</small></span><span aria-hidden="true">{b.id === value ? "✓" : <IconArrowRight/>}</span></button>)}{!list.length && <p>No campsite matches that search.</p>}</div>
      </div>
    </aside>
  </>;
}
