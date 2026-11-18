"use client";
import { useCamp } from "@/lib/camp-selection";
import CampPicker from "./CampPicker";
import CampScene from "./CampScene";
import Img from "./Img";
import { IconArrowRight } from "./Icons";
export default function HomeEditorial() {
  const [camp, setCamp] = useCamp();
  return <>
    <section className="camp-hero">
      <div className="wrap camp-hero__copy"><span className="eyebrow">Kitchen + coffee · Isabela & Cagayan</span><h1 className="wordmark">Black Bear</h1><p className="script">Bear hugs & bold brews.</p><p className="camp-hero__intro">A good cup. A proper meal.<br/>A little room to stay a while.</p><a href="/menu" className="btn">What’s on the menu <IconArrowRight/></a></div>
      <CampScene/><div className="camp-hero__caption"><span>Your everyday escape</span><a href="/story">Get to know Black Bear <IconArrowRight/></a></div>
    </section>
    <section className="home-menu wrap" aria-labelledby="home-menu-title">
      <div className="home-menu__copy" data-reveal><span className="eyebrow">First, something good</span><h2 id="home-menu-title">Come for coffee.<br/><em>Stay for a little more.</em></h2><p>Your usual latte, an all-day brunch, or a slice to share. Find something for the moment you’re in.</p><a className="text-link" href="/menu">Browse the menu <IconArrowRight/></a></div>
      <div className="home-menu__photos">
        <a href="/menu?category=coffee" className="home-product ink-highlight"><Img slug="coffee-iced-latte-outdoor" alt="Iced Black Bear latte" sizes="(max-width:600px) 47vw, 23vw"/><span>Coffee & drinks <IconArrowRight/></span><svg className="ink-sweep" viewBox="0 0 300 380" aria-hidden="true"><path pathLength="1" d="M85 320Q48 180 72 97Q149 55 224 98L208 320Q146 347 85 320M80 91Q139 72 225 91M235 66l16-17m-9 37 23-5"/></svg></a>
        <a href="/menu?type=food" className="home-product ink-highlight"><Img slug="food-loco-moco" alt="Black Bear Loco Moco" sizes="(max-width:600px) 47vw, 23vw"/><span>Kitchen & cake <IconArrowRight/></span><svg className="ink-sweep" viewBox="0 0 300 380" aria-hidden="true"><path pathLength="1" d="M26 224C13 131 269 119 274 218C280 310 31 325 26 224M42 265Q133 323 262 264M245 104l14-18m1 35 22-5"/></svg></a>
      </div>
    </section>
    <section className="home-camp" aria-labelledby="home-camp-title"><div className="wrap home-camp__inner">
      <a className="home-camp__photo" href={`/campsites?camp=${camp}`} aria-label="Explore your campsite"><Img slug="interior-lounge-bear-window" alt="A quiet corner inside Black Bear" sizes="(max-width:700px) 100vw, 48vw"/></a>
      <div data-reveal><span className="eyebrow">A familiar feeling, closer to you</span><h2 id="home-camp-title">Find your<br/><em>little escape.</em></h2><p>Seven campsites, each with its own corner of Black Bear. Find the way there and see what’s happening at your branch.</p><CampPicker value={camp} onChange={setCamp}/><a href={`/campsites?camp=${camp}`} className="text-link">Explore this campsite <IconArrowRight/></a></div>
    </div></section>
    <section className="home-community wrap" aria-labelledby="home-community-title">
      <div data-reveal><span className="eyebrow">For the ones who stay a while</span><h2 id="home-community-title">Make yourself<br/><em>a regular.</em></h2><p>A familiar face behind the bar. A photo worth sharing. A little thank-you for coming back. There’s more to camp than your coffee.</p><a href="/club" className="text-link">Meet the club <IconArrowRight/></a></div>
      <a href="/gallery" className="home-community__photo"><Img slug="staff-kitchen-team-02" alt="Good company with the Black Bear crew" sizes="(max-width:700px) 100vw, 38vw"/><span>Life at camp <IconArrowRight/></span></a>
      <div className="home-community__gather"><h3>Bring your people.</h3><p>A catch-up, a celebration, or a room for your next good idea.</p><a className="text-link" href="/events">Plan a gathering <IconArrowRight/></a></div>
    </section>
  </>;
}
