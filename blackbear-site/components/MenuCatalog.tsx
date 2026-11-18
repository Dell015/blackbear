"use client";
import { useEffect, useState } from "react";
import { brand, cakes, drinks, food, foodAddOns, drinkAddOns, readyToDrink, cakeStoryDate, type Tag } from "@/lib/data";
import { useDemo } from "@/lib/demo-store";
import { useCamp } from "@/lib/camp-selection";
import { menuDetails, menuKey } from "@/lib/menu-details";
import { useDialog } from "@/lib/useDialog";
import { ItemSheet, type Pick } from "./Menu";
import CampPicker from "./CampPicker";
import Img from "./Img";
import { IconArrowRight, IconBookmark, IconClose, IconMenu, IconSearch, Tags } from "./Icons";

type Mode = "drinks" | "food" | "cakes";
type Section = { id: string; title: string; script?: string; items: Pick[]; mode: Mode };
const sections: Section[] = [
  ...drinks.map(s => ({...s, mode: "drinks" as const, items: s.items.map(i => ({...i, sizes:s.sizes, category:s.title}))})),
  {id:"drink-add-ons",title:"Drink add-ons & bottled",mode:"drinks",items:[...drinkAddOns,...readyToDrink].map(i=>({...i,prices:[i.price],sizes:["Price"],category:"Add-ons & Ready to Drink"}))},
  ...food.map(s=>({...s, mode:"food" as const, items:s.items.map(i=>({...i,prices:[i.price],sizes:["Plate"],category:s.title}))})),
  {id:"food-add-ons",title:"Kitchen add-ons",mode:"food",items:foodAddOns.map(i=>({...i,prices:[i.price],sizes:["Add-on"],category:"Food Add-ons"}))},
  {id:"cakes",title:"The cake case",script:"a little something sweet",mode:"cakes",items:cakes.map(i=>({name:i.name,prices:[null],sizes:["Slice"],category:"Cakes"}))},
];
const labels: Record<Mode,string> = {drinks:"Coffee & drinks",food:"The kitchen",cakes:"Cakes"};
const defaults: Record<Mode,string> = {drinks:"coffee",food:"brunch",cakes:"cakes"};
const normal = (s:string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f'’]/g,"");
type Filter = "all" | "fav" | "sig" | "veg" | "saved";
const filterOptions: {value:Filter;label:string}[] = [{value:"all",label:"Every pick"},{value:"fav",label:"Fan favorites"},{value:"sig",label:"Black Bear signatures"},{value:"veg",label:"Vegetarian"},{value:"saved",label:"My saved picks"}];

export default function MenuCatalog() {
  const state = useDemo(), [camp,setCamp] = useCamp();
  const [mode,setMode] = useState<Mode>("drinks"), [category,setCategory] = useState("coffee");
  const [query,setQuery] = useState(""), [filter,setFilter] = useState<Filter>("all");
  const [browse,setBrowse] = useState(false), [selected,setSelected] = useState<Pick|null>(null);
  const dialog = useDialog<HTMLElement>(browse,()=>setBrowse(false));
  useEffect(()=>{
    const p=new URLSearchParams(location.search), m=p.get("type");
    const next:Mode=m==="food"?"food":m==="cakes"||p.get("category")==="cakes"?"cakes":"drinks";
    const cat=p.get("category"); setMode(next);setCategory(sections.some(s=>s.id===cat&&s.mode===next)?cat!:defaults[next]);setQuery(p.get("search")?.slice(0,80)??"");
  },[]);
  function choose(id:string,m:Mode) {setMode(m);setCategory(id);setQuery("");setFilter("all");setBrowse(false);const p=new URLSearchParams({type:m,category:id});history.replaceState(null,"",`/menu?${p}`);}
  const search = normal(query.trim());
  const visible = sections.filter(s=>search||filter==="saved"?true:s.mode===mode&&(category==="all"||s.id===category)).map(s=>({...s,items:s.items.filter(i=>(!search||normal(`${i.name} ${i.category}`).includes(search))&&(filter==="all"||filter==="saved"?filter!=="saved"||state.savedPicks.includes(menuKey(i.category,i.name)):i.tags?.includes(filter as Tag)))})).filter(s=>s.items.length);
  const count = visible.reduce((n,s)=>n+s.items.length,0), active = sections.find(s=>s.id===category);
  const navigation = (scope: string) => <>
    <div className="menu-index__heading"><span className="eyebrow">Browse the menu</span></div>
    {(["drinks","food","cakes"] as Mode[]).map(m=><div className="menu-index__group" key={m}><h3>{labels[m]}</h3>{sections.filter(s=>s.mode===m).map((s,i)=><button key={s.id} onClick={()=>choose(s.id,m)} aria-current={category===s.id&&mode===m&&!query?"true":undefined}><span><small>{String(i+1).padStart(2,"0")}</small>{s.title}</span><span>{s.items.length}</span></button>)}</div>)}
    <details className="menu-refinement"><summary>Find a particular pick <span aria-hidden="true">+</span></summary><fieldset><legend className="sr-only">Refine menu</legend>{filterOptions.map(f=><label key={f.value}><input type="radio" name={`${scope}-filter`} value={f.value} checked={filter===f.value} onChange={()=>{setFilter(f.value);setCategory("all");setBrowse(false);}}/>{f.label}{f.value==="saved"&&` (${state.savedPicks.length})`}</label>)}</fieldset></details>
    <a className="menu-original" href="https://blackbearcoffee.my.canva.site/big-stores" target="_blank" rel="noreferrer">Original QR menu <IconArrowRight/></a>
  </>;
  return <section className="catalog" id="menu">
    <div className="wrap catalog__intro"><div><span className="eyebrow">Coffee first. Stay for the rest.</span><h2>The menu<span>.</span></h2></div><CampPicker value={camp} onChange={setCamp}/></div>
    <div className="wrap catalog__layout">
      <aside className="menu-index" aria-label="Menu categories">{navigation("sidebar")}</aside>
      <div className="catalog__content">
        <div className="catalog__tools"><div className="catalog__tabs" role="group" aria-label="Menu section">{(["drinks","food","cakes"] as Mode[]).map(m=><button key={m} aria-pressed={mode===m&&!query} onClick={()=>choose(defaults[m],m)}>{labels[m]}</button>)}</div>
          <div className="catalog__search-row"><button className="catalog__browse" onClick={()=>setBrowse(true)} aria-haspopup="dialog" aria-expanded={browse}><IconMenu/><span>{query?"All categories":active?.title??"Browse categories"}</span><span aria-hidden="true">⌄</span></button><label className="catalog__search"><IconSearch/><input type="search" placeholder="Search the whole menu" aria-label="Search food, drinks and cakes" value={query} onChange={e=>setQuery(e.target.value)}/></label></div>
        </div>
        <div className="catalog__resultline"><span role="status" aria-live="polite">{search?`${count} results for “${query}”`:filter!=="all"?`${filterOptions.find(f=>f.value===filter)?.label} · ${count} picks`:`${count} picks · tap for a closer look`}</span>{(query||filter!=="all")&&<button onClick={()=>{setQuery("");setFilter("all");setCategory(defaults[mode]);}}>Clear</button>}</div>
        <div className="catalog__boards" key={`${mode}-${category}-${filter}`}>
          {visible.map(s=><article className={`catalog-board ${s.mode==="cakes"?"catalog-board--cakes":""}`} key={s.id}>
            <header className="catalog-board__head"><div><span className="eyebrow">Black Bear / {labels[s.mode]}</span><h3>{s.title}</h3>{s.script&&<p className="script">{s.script}</p>}</div>{s.id==="coffee"&&<div className="catalog-board__coffee ink-highlight"><Img slug="coffee-cappuccino" alt="Black Bear cappuccino" sizes="150px"/><svg className="ink-sweep" viewBox="0 0 160 160" aria-hidden="true"><path pathLength="1" d="M18 92C6 32 143 18 145 82C159 135 27 152 18 92M131 23l10-13m0 29 14-3"/></svg></div>}</header>
            {s.mode==="drinks"&&s.items[0]?.prices.length>1&&<div className="catalog-board__sizes"><span>Black Bear <b>hot</b></span><span>Grizzly <b>16oz iced</b></span><span>Polar <b>22oz iced</b></span></div>}
            {s.mode==="cakes"&&<p className="catalog-board__note">A different selection at every campsite. <b>Sample case · {state.camps[camp].updated??cakeStoryDate}.</b> Call ahead for today’s slices and prices.</p>}
            <div className="catalog-board__items">{s.items.map(i=>{
              const detail=menuDetails[i.name],cake=cakes.find(c=>c.name===i.name),image=detail?.image??cake?.image;
              const prices=i.prices.filter((p):p is number=>p!==null), unavailable=state.camps[camp].soldOut.includes(menuKey(i.category,i.name));
              return <button className={`menu-pick ${image?"has-photo":""}`} key={i.name} onClick={()=>setSelected(i)} aria-haspopup="dialog">
                {image&&<span className="menu-pick__thumb"><Img slug={image} alt="" sizes="64px"/></span>}<span className="menu-pick__body"><span className="menu-pick__name">{i.name}<Tags tags={i.tags}/>{state.savedPicks.includes(menuKey(i.category,i.name))&&<IconBookmark className="menu-pick__saved"/>}</span><span className="menu-pick__meta">{unavailable?"Unavailable · local demo":cake?(state.camps[camp].cakes.includes(cake.id)?"In this camp’s sample case":"Ask about today’s selection"):i.kcal?`${i.kcal} kcal`:detail?.description.split(".")[0]??"See sizes & details"}</span></span>
                <span className="menu-pick__dots"/><span className="menu-pick__price">{prices.length?<>{prices.length>1&&<small>from</small>}₱{Math.min(...prices)}</>:<small>Ask crew</small>}</span><span className="menu-pick__arrow" aria-hidden="true">↗</span>
              </button>;
            })}</div>
          </article>)}
        </div>
        {!count&&<div className="catalog__empty"><h3>No picks on this trail.</h3><p>Try a different name or browse another category.</p><button className="text-link" onClick={()=>{setQuery("");setFilter("all");setCategory(defaults[mode]);}}>Back to the menu <IconArrowRight/></button></div>}
        <p className="catalog__foot">Prices in pesos · {brand.serviceCharge}. Call your camp to confirm current availability.</p>
      </div>
    </div>
    <div className={`sheet-backdrop ${browse?"is-open":""}`} onClick={()=>setBrowse(false)} aria-hidden="true"/>
    <aside ref={dialog} className={`sheet category-drawer ${browse?"is-open":""}`} role="dialog" aria-modal="true" aria-label="Browse menu categories" aria-hidden={!browse} inert={!browse} tabIndex={-1}><button className="sheet__close" onClick={()=>setBrowse(false)} aria-label="Close categories"><IconClose/></button><div className="sheet__handle"/><div className="sheet__body">{navigation("drawer")}</div></aside>
    <ItemSheet item={selected} camp={camp} onClose={()=>setSelected(null)}/>
  </section>;
}
