"use client";
import { useEffect, useRef, useState } from "react";
import type { Map as LibreMap, Marker } from "maplibre-gl";
import { branches } from "@/lib/data";
import { campLocations } from "@/lib/camp-experiences";
import { useMotionPreference } from "@/lib/motion-preference";
import { IconDirections } from "./Icons";

export default function CampMap({selected,onSelect,overview=0}:{selected:string;onSelect:(id:string)=>void;overview?:number}) {
  const container=useRef<HTMLDivElement>(null),map=useRef<LibreMap|null>(null),markers=useRef<Marker[]>([]),selectRef=useRef(onSelect),selectedRef=useRef(selected);
  const [ready,setReady]=useState(false),[failed,setFailed]=useState(false),[retry,setRetry]=useState(0);
  const preference=useMotionPreference();
  selectRef.current=onSelect; selectedRef.current=selected;
  useEffect(()=>{
    let disposed=false,instance:LibreMap|null=null;let resize:ResizeObserver|undefined;
    setFailed(false);setReady(false);
    import("maplibre-gl").then(({Map,Marker,NavigationControl,AttributionControl})=>{
      if(disposed||!container.current)return;
      try {
        instance=new Map({container:container.current,style:"/maps/blackbear.json",center:campLocations[selectedRef.current].center,zoom:12.2,attributionControl:false,cooperativeGestures:true,dragRotate:false,pitchWithRotate:false,maxZoom:18,minZoom:7});
        map.current=instance;
        instance.addControl(new NavigationControl({showCompass:false}),"top-right");
        instance.addControl(new AttributionControl({compact:true}),"bottom-right");
        branches.forEach((b,i)=>{
          const pin=document.createElement("button");pin.className="camp-map-pin";pin.type="button";pin.textContent=String(i+1).padStart(2,"0");pin.setAttribute("aria-label",`${b.name} area preview`);pin.dataset.camp=b.id;
          pin.title=b.name;
          pin.addEventListener("click",()=>selectRef.current(b.id));
          markers.current.push(new Marker({element:pin,anchor:"center"}).setLngLat(campLocations[b.id].center).addTo(instance!));
        });
        instance.on("load",()=>{if(!disposed){setReady(true);setFailed(false);}});
        instance.on("error",()=>{if(!disposed)setFailed(true);});
        resize=new ResizeObserver(()=>instance?.resize());resize.observe(container.current);
      } catch {if(!disposed)setFailed(true);}
    }).catch(()=>{if(!disposed)setFailed(true);});
    return ()=>{disposed=true;resize?.disconnect();markers.current.forEach(m=>m.remove());markers.current=[];instance?.remove();map.current=null;};
  },[retry]);
  useEffect(()=>{
    if(!ready||!map.current)return;
    map.current.flyTo({center:campLocations[selected].center,zoom:12.8,duration:preference==="full"?1100:0});
    markers.current.forEach(m=>{const e=m.getElement();e.classList.toggle("is-selected",e.dataset.camp===selected);e.setAttribute("aria-pressed",String(e.dataset.camp===selected));});
  },[selected,ready,preference]);
  useEffect(()=>{if(overview&&ready&&map.current)map.current.fitBounds([[121.43,16.61],[121.97,17.72]],{padding:48,duration:preference==="full"?1000:0});},[overview,ready,preference]);
  const branch=branches.find(b=>b.id===selected)!;
  return <div className="camp-map">
    <div ref={container} className="camp-map__canvas" aria-label={`Street map near ${branch.name}. Area preview; use Directions for the business location.`}/>
    {!ready&&!failed&&<div className="camp-map__loading"><span className="map-loader"/><span>Finding the trail…</span></div>}
    {failed&&<div className="camp-map__fallback"><p>{ready?"Some map details couldn’t load.":"The map couldn’t load here."}</p><button onClick={()=>setRetry(n=>n+1)}>Try again</button><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.mapQuery)}`} target="_blank" rel="noreferrer">Open Maps <IconDirections/></a></div>}
    <div className="camp-map__label"><span className="camp-map__dot"/>{branch.name}<small>Area preview · exact shop pin to verify</small></div>
  </div>;
}
