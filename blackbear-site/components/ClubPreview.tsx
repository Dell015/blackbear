import Img from "./Img";
import { IconArrowRight } from "./Icons";
export default function ClubPreview() {
  return (
    <section className="club-preview" id="club">
      <div className="wrap club-preview__grid">
        <div>
          <span className="eyebrow">A place for the regulars</span>
          <h2 className="display h2">
            Good company.
            <br />
            <span className="script">A little extra.</span>
          </h2>
          <p className="lead">
            A proposed Bear Scout Club: your camp, your favorite crew, a stamp
            for each visit, and your best little moments at Black Bear.
          </p>
          <a className="btn" href="/club">
            Step inside the club <IconArrowRight />
          </a>
          <small className="concept-label">
            Concept preview · rewards and photo challenges await owner approval
          </small>
        </div>
        <div className="club-preview__visual">
          <Img
            slug="coffee-latte-art-two-cups"
            alt="Two Black Bear coffees, ready for good company"
            sizes="(min-width:900px) 40vw,100vw"
          />
          <span className="club-preview__note hand">
            Your usual, with a little more.
          </span>
          <span className="club-preview__stamp">
            BEAR SCOUT
            <br />
            <b>CLUB</b>
            <small>CONCEPT / 01</small>
          </span>
        </div>
      </div>
    </section>
  );
}
