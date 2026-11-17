import { Diamond } from "./Doodles";

const items = ["Bear hugs & bold brews", "7 campsites", "Open 24/7 in Santiago", "Brunch all day", "23g protein series", "Wild. Fresh. Blended."];

export default function Ticker() {
  const group = (hidden: boolean) => (
    <div className="ticker__group" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <span className="ticker__item" key={i}>
          {t}
          <Diamond kind={(["compass", "bear", "word"] as const)[i % 3]} fill="#fef6cf" ink="#43553d" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="ticker">
      <div className="ticker__track">
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
