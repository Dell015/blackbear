import { brand, branches } from "@/lib/data";
import { IconFacebook, IconInstagram, IconMail } from "./Icons";
import { DiamondRow } from "./Doodles";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__big wordmark" data-reveal>
          Black Bear
        </div>
        <div className="footer__kc">KITCHEN+COFFEE</div>
        <DiamondRow fill="#fef6cf" ink="#43553d" />
        <div className="footer__grid">
          <div>
            <h4>Say hello</h4>
            <ul>
              <li>
                <a href={`mailto:${brand.email}`} style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                  <IconMail width={18} /> {brand.email}
                </a>
              </li>
              <li>
                <a href={brand.instagram} target="_blank" rel="noreferrer" style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                  <IconInstagram width={18} /> Instagram {brand.instagramHandle}
                </a>
              </li>
              <li>
                <a href={brand.facebook} target="_blank" rel="noreferrer" style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                  <IconFacebook width={18} /> Facebook /BlackBearCoffeeIsabela
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Call a campsite</h4>
            <ul className="footer__phones">
              {branches.map((b) => (
                <li key={b.id}>
                  <span>{b.short}</span>
                  {b.phone ? <a href={`tel:${b.phone.replace(/\s/g, "")}`}>{b.phone}</a> : <span style={{ opacity: 0.6 }}>to confirm</span>}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li>
                <a href="#menu">Full menu</a>
              </li>
              <li>
                <a href="#cakes">Today&apos;s cakes</a>
              </li>
              <li>
                <a href="#campsites">Campsites &amp; hours</a>
              </li>
              <li>
                <a href="#events">Private events</a>
              </li>
              <li>
                <a href="#top">Back to top</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__small">
          <span>© {brand.est}–2026 Black Bear Kitchen + Coffee · {brand.tagline}</span>
          <span>Website concept preview. Menu, hours and photos marked &ldquo;to confirm&rdquo; are pending Black Bear&apos;s review.</span>
        </div>
      </div>
    </footer>
  );
}
