/* Small inline icons (no emoji in UI). stroke = currentColor */
type P = React.SVGProps<SVGSVGElement>;
const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export const IconPhone = (p: P) => (<svg {...base} {...p}><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>);
export const IconDirections = (p: P) => (<svg {...base} {...p}><path d="M12 2.5 21.5 12 12 21.5 2.5 12z" /><path d="M9 14v-2.5a1.5 1.5 0 0 1 1.5-1.5H15m-2-2 2 2-2 2" /></svg>);
export const IconBookmark = (p: P) => (<svg {...base} {...p}><path d="M6 3h12v18l-6-4-6 4z" /></svg>);
export const IconShare = (p: P) => (<svg {...base} {...p}><path d="M12 15V3m-4 4 4-4 4 4" /><path d="M5 11v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8" /></svg>);
export const IconSearch = (p: P) => (<svg {...base} {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>);
export const IconClose = (p: P) => (<svg {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>);
export const IconArrowRight = (p: P) => (<svg {...base} {...p}><path d="M4 12h16m-6-6 6 6-6 6" /></svg>);
export const IconArrowLeft = (p: P) => (<svg {...base} {...p}><path d="M20 12H4m6-6-6 6 6 6" /></svg>);
export const IconPin = (p: P) => (<svg {...base} {...p}><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>);
export const IconMenu = (p: P) => (<svg {...base} {...p}><path d="M4 5h16M4 12h16M4 19h10" /></svg>);
export const IconCheck = (p: P) => (<svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" /></svg>);
export const IconInstagram = (p: P) => (<svg {...base} {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" /></svg>);
export const IconFacebook = (p: P) => (<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4V10.5H8v3h2.5V21z" /></svg>);
export const IconMail = (p: P) => (<svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>);

/* Menu tags: fan's favorite flag, signature bear, vegetarian leaf */
export const TagFav = (p: P) => (<svg viewBox="0 0 16 16" aria-hidden {...p}><path d="M3 1.5v13" stroke="#cd6128" strokeWidth="1.6" strokeLinecap="round" /><path d="M3.6 2h9l-2.4 3 2.4 3h-9z" fill="#cd6128" /></svg>);
export const TagVeg = (p: P) => (<svg viewBox="0 0 16 16" aria-hidden {...p}><path d="M2 13c0-6 4-10 12-11-1 8-5 12-11 12" fill="#7a8576" /><path d="M2.5 13.5 9 7" stroke="#fef6cf" strokeWidth="1.2" strokeLinecap="round" /></svg>);
export const TagSig = (p: P) => (<svg viewBox="0 0 16 16" aria-hidden {...p}><path d="M3.5 14V9.6C3.5 6.6 5 5 6.4 5c.2-1.4 1-2.4 2.2-2.4 1.1 0 1.6.6 2 1.4.8.2 1.4.9 1.4 1.8v1.5c.8.8 1.5 2 1.5 3.7V14h-2.2v-2.5l-.9 2.5H8.2V11H6.6v3z" fill="#12120f" /></svg>);

export function Tags({ tags }: { tags?: readonly ("fav" | "sig" | "veg")[] }) {
  if (!tags?.length) return <span />;
  const t = tags[0];
  const label = t === "fav" ? "Fan's favorite" : t === "sig" ? "Signature" : "Vegetarian";
  const I = t === "fav" ? TagFav : t === "sig" ? TagSig : TagVeg;
  return (<span title={label} aria-label={label} role="img"><I className="tag-icon" /></span>);
}
