import Img from "./Img";
import { IconCheck, IconPhone } from "./Icons";
import { Sparkle } from "./Doodles";

export default function Events() {
  return (
    <section className="section section--orange" id="events">
      <div className="wrap events__grid">
        <div className="events__img" data-reveal>
          <Img slug="branch-cauayan-sf-conference-room" alt="The Black Bear conference room in Cauayan San Fermin" sizes="(min-width: 900px) 45vw, 100vw" />
        </div>
        <div className="events__copy">
          <span className="eyebrow" data-reveal>
            Private events
          </span>
          <h2 className="display h2" data-reveal>
            Book the <span className="script">Conference Room</span>
          </h2>
          <p className="lead" data-reveal>
            Our Cauayan San Fermin camp has a private conference room for rent: team meetings, small celebrations, workshops and barkada
            get-togethers, with the kitchen and coffee bar right outside.
          </p>
          <ul className="checks" data-stagger>
            <li>
              <IconCheck /> Long wooden table, comfortable chairs and a TV screen
            </li>
            <li>
              <IconCheck /> Food and drinks from the full Black Bear menu
            </li>
            <li>
              <IconCheck /> Reservations by phone: 0917 500 0324
            </li>
          </ul>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }} data-reveal>
            <a className="btn" href="tel:09175000324">
              <IconPhone /> Call to reserve
            </a>
            <Sparkle className="doodle" style={{ width: 48, height: 48 }} />
          </div>
        </div>
      </div>
    </section>
  );
}
