"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { branches, cakes, cakeStoryDate } from "@/lib/data";
import { campExperiences, campLocations, distanceKm } from "@/lib/camp-experiences";
import { useCamp } from "@/lib/camp-selection";
import { useDemo } from "@/lib/demo-store";
import { hoursText, manilaNow, statusOf } from "@/lib/hours";
import CampPicker from "./CampPicker";
import Img from "./Img";
import { IconArrowRight, IconDirections, IconPhone, IconPin, IconShare } from "./Icons";
const CampMap=dynamic(()=>import("./CampMap"),{ssr:false,loading:()=> <div className="camp-map camp-map--placeholder"><span className="map-loader"/>Loading the map…</div>});
export default function CampExplorer() {
  const [camp,setCamp]=useCamp(),state=useDemo();
  const [overview,setOverview]=useState(0),[message,setMessage]=useState(""),[locating,setLocating]=useState(false);
  const [now,setNow]=useState<ReturnType<typeof manilaNow>|null>(null);
  useEffect(()=>{const id=new URLSearchParams(location.search).get("camp");if(id&&branches.some(b=>b.id===id))setCamp(id);setNow(manilaNow());const t=setInterval(()=>setNow(manilaNow()),60000);return()=>clearInterval(t);},[]);
  const b=branches.find(b=>b.id===camp)!,local=state.camps[camp],experience=campExperiences[camp];
  const status=now?statusOf(b,now):null;
  function choose(id:string){setCamp(id);setMessage("");history.replaceState(null,"",`/campsites?camp=${id}`);}
  function nearby(){
    if(!navigator.geolocation){setMessage("Location is unavailable here. Choose a campsite by town instead.");return;}
    setLocating(true);setMessage("Finding your nearest campsite area…");
    navigator.geolocation.getCurrentPosition(p=>{
      const pos:[number,number]=[p.coords.longitude,p.coords.latitude];const sorted=branches.map(b=>({id:b.id,dist:distanceKm(pos,campLocations[b.id].center)})).sort((a,b)=>a.dist-b.dist);
      choose(sorted[0].id);setLocating(false);setMessage(`Closest area: ${branches.find(b=>b.id===sorted[0].id)!.name}. About ${sorted[0].dist.toFixed(1)} km in a straight line to the area center. Check Directions for the shop and route.`);
    },()=>{setLocating(false);setMessage("Couldn’t get your location. Choose a campsite by town instead.");},{timeout:10000,maximumAge:300000});
  }
  async function share(){const url=`${location.origin}/campsites?camp=${camp}`;try{if(navigator.share)await navigator.share({title:`Black Bear ${b.name}`,url});else{await navigator.clipboard.writeText(url);setMessage("Campsite link copied.");}}catch{setMessage("Use the address bar to copy this campsite link.");}}
  const sampleCakes=local.cakes.map(id=>cakes.find(c=>c.id===id)).filter(Boolean);
  return <section className="camp-explorer">
    <div className="wrap camp-explorer__heading"><div><span className="eyebrow">Isabela & Cagayan</span><h2>Find your camp<span>.</span></h2><p>Same Black Bear feeling. A little different at every campsite.</p></div><button className="text-link" onClick={nearby} disabled={locating}><IconPin/>{locating?"Finding you…":"Find the nearest area"}</button></div>
    <div className="wrap camp-explorer__controls"><CampPicker value={camp} onChange={choose}/><button className="text-link" onClick={()=>setOverview(n=>n+1)}>See all seven on the map <IconArrowRight/></button></div>
    <div className="wrap"><p className="camp-explorer__message" role="status" aria-live="polite">{message}</p></div>
    <div className="wrap camp-explorer__layout">
      <div className="camp-explorer__map"><CampMap selected={camp} onSelect={choose} overview={overview}/><p className="camp-explorer__map-note">Explore real streets and landmarks. Pins currently show town or district centers; Directions opens the branch business search.</p></div>
      <article className="camp-detail" key={camp}>
        <header><span className="eyebrow">Your campsite</span><div className="camp-detail__title"><h3>{b.name}</h3><button className="round" onClick={share} aria-label={`Share ${b.name} campsite`}><IconShare/></button></div>{b.hours==="24/7"&&<span className="camp-detail__open">Open 24 hours</span>}<p>{b.address}</p><div className="camp-detail__actions"><a className="btn btn--small" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.mapQuery)}`} target="_blank" rel="noreferrer"><IconDirections/>Directions</a>{b.phone&&<a className="text-link" href={`tel:${b.phone.replace(/\s/g,"")}`}><IconPhone/>Call the camp</a>}</div></header>
        <details className="camp-detail__hours"><summary>Hours & contact <span aria-hidden="true">+</span></summary><p>{b.hoursConfirmed?hoursText(b):b.hours?`Reference hours · ${hoursText(b)} · to confirm with the crew`:"Hours to confirm with the crew"}</p>{status?.kind!=="unknown"&&status&&<p>{status.label}</p>}{b.phone&&<a href={`tel:${b.phone.replace(/\s/g,"")}`}>{b.phone}</a>}{b.note&&<p>{b.note}</p>}</details>
        {(local.note||local.featuredPhoto)&&<div className="camp-detail__update"><span className="eyebrow">From the crew · local demo</span>{local.featuredPhoto&&<img className="camp-detail__shared-photo" src={local.featuredPhoto} alt="Photo selected by this campsite in the local workspace demo"/>}{local.note&&<p>{local.note}</p>}</div>}
        <div className="camp-detail__what"><h4>A little more at {b.short}.</h4><p className="camp-detail__demo">Illustrative specials & events · examples for the pitch, not live promotions.</p>
          <div className="camp-local-grid">
            <a className="camp-local" href={`/menu?search=${encodeURIComponent(experience.menuSearch)}`}><div className="ink-highlight"><Img slug={experience.specialImage} alt={experience.special} sizes="(max-width:700px) 45vw,230px"/><svg className="ink-sweep" viewBox="0 0 240 200" aria-hidden="true"><path pathLength="1" d="M27 112C16 37 218 25 220 108C232 177 39 188 27 112M196 31l12-15m1 30 16-1"/></svg></div><span className="eyebrow">Example · camp special</span><h5>{local.specialTitle||experience.special}</h5><p>{local.specialDescription||experience.specialDescription}</p><span className="text-link">See the menu <IconArrowRight/></span></a>
            <div className="camp-local"><div><Img slug={experience.eventImage} alt="Black Bear atmosphere, used to illustrate this sample event" sizes="(max-width:700px) 45vw,230px"/></div><span className="eyebrow">Example · at this camp</span><h5>{local.eventTitle||experience.event}</h5><p>{local.eventDescription||experience.eventDescription}</p><small>{local.eventWhen||experience.when} · sample schedule</small></div>
          </div>
        </div>
        <div className="camp-detail__cakes"><div><h4>In the cake case</h4><a className="text-link" href="/menu?type=cakes&category=cakes">Browse cakes <IconArrowRight/></a></div><p>{sampleCakes.length?sampleCakes.map(c=>c!.name).join(" · "):"Call the crew for the latest selection."}</p><small>{local.updated?`Local demo update · ${local.updated}`:`Sample selection · ${cakeStoryDate}`} · confirm today’s selection with the crew.</small></div>
        <a href={`/menu?type=drinks&category=coffee`} className="camp-detail__menu-link">Settle in. Pick your coffee. <IconArrowRight/></a>
      </article>
    </div>
  </section>;
}
