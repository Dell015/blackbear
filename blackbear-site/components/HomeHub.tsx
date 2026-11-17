"use client";
import { useEffect, useState } from "react";
import { branches } from "@/lib/data";
import { useDemo } from "@/lib/demo-store";
import Img from "./Img";
import { IconArrowRight, IconPin } from "./Icons";

const shortcuts = [
  {
    href: "/menu",
    number: "01",
    title: "The menu",
    line: "Find your next favorite.",
    image: "food-loco-moco",
    label: "Browse food and drinks",
  },
  {
    href: "/campsites",
    number: "02",
    title: "Find a camp",
    line: "Directions, hours & calls.",
    image: "exterior-green-door-entrance",
    label: "Find a campsite",
  },
  {
    href: "/cakes",
    number: "03",
    title: "Cake Story",
    line: "A peek inside the cake case.",
    image: "cake-biscoff-cheesecake-slice",
    label: "Explore Cake Story",
  },
  {
    href: "/club",
    number: "04",
    title: "The club",
    line: "Your people. A little extra.",
    image: "coffee-latte-art-two-cups",
    label: "Explore the Bear Scout Club",
  },
  {
    href: "/story",
    number: "05",
    title: "Our story",
    line: "Get to know Black Bear.",
    image: "staff-kitchen-team-02",
    label: "Read our story",
  },
  {
    href: "/events",
    number: "06",
    title: "Gatherings",
    line: "A little room for good company.",
    image: "branch-cauayan-sf-conference-room",
    label: "Explore private gatherings",
  },
  {
    href: "/gallery",
    number: "07",
    title: "Life at camp",
    line: "See the place. Share a moment.",
    image: "interior-mural-tent-patches",
    label: "Explore life at camp",
  },
  {
    href: "/pitch",
    number: "08",
    title: "The vision",
    line: "Explore the website concept.",
    image: "logo-badge-cream-on-forest",
    label: "Open the client pitch",
  },
];
export default function HomeHub() {
  const state = useDemo();
  const [camp, setCamp] = useState("cauayan-d1");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bb-fav-camp");
      if (saved && branches.some((item) => item.id === saved)) setCamp(saved);
    } catch {}
  }, []);
  return (
    <>
      <section className="hub-hero">
        <div className="wrap hub-hero__inner">
          <div>
            <span className="eyebrow">
              Kitchen + coffee / Isabela & Cagayan
            </span>
            <h1 className="wordmark">Black Bear</h1>
            <p className="hub-hero__tag script">Bear hugs &amp; bold brews.</p>
            <p className="hub-hero__intro">
              Coffee, all-day brunch, and a little room to stay a while. What
              brings you to camp?
            </p>
            <div className="app-actions">
              <a className="btn" href="/menu">
                Explore the menu <IconArrowRight />
              </a>
              <a className="text-link" href="/campsites">
                <IconPin />
                Find your campsite
              </a>
            </div>
          </div>
          <div className="hub-hero__art" aria-hidden="true">
            <img
              src="/img/camp-scene-cutout-800.webp"
              width={1448}
              height={819}
              alt=""
              loading="lazy"
            />
          </div>
        </div>
      </section>
      <section className="hub-shortcuts wrap" aria-labelledby="shortcut-title">
        <div className="hub-shortcuts__head">
          <h2 id="shortcut-title">Straight to the good stuff.</h2>
          <span>
            Pick a trail <span aria-hidden="true">↘</span>
          </span>
        </div>
        <div className="hub-grid">
          {shortcuts.map((item) => (
            <a
              className="hub-card"
              key={item.href}
              href={item.href}
              aria-label={item.label}
            >
              <span className="hub-card__number">{item.number}</span>
              <Img slug={item.image} alt="" sizes="64px" />
              <h3>{item.title}</h3>
              <p>{item.line}</p>
              <IconArrowRight />
            </a>
          ))}
        </div>
      </section>
      <div className="hub-your-camp wrap">
        <label>
          <IconPin />
          <span>Your camp</span>
          <select
            value={camp}
            onChange={(event) => {
              setCamp(event.target.value);
              try {
                localStorage.setItem("bb-fav-camp", event.target.value);
                window.dispatchEvent(new Event("bb:favorite"));
              } catch {}
            }}
          >
            {branches.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <a href={`/campsites?camp=${camp}`}>
          {state.camps[camp].updated
            ? "See your camp’s local update"
            : "View camp details"}
          <IconArrowRight />
        </a>
      </div>
    </>
  );
}
