import Img from "./Img";
import { BearLine } from "./Doodles";

export default function Story() {
  return (
    <section className="section story" id="story">
      <div className="wrap story__grid">
        <div className="story__copy">
          <span className="eyebrow" data-reveal>
            Welcome to the campsite
          </span>
          <h2 className="display h2" data-reveal>
            Pitch a tent. <em>Pull up a cup.</em> Stay a while.
          </h2>
          <p className="lead" data-reveal>
            Black Bear started in Isabela in 2020 with a simple idea: a café that feels like a campsite. Big tables for the barkada, quiet corners for
            work, brunch whenever you wake up, and coffee poured with a bear hug.
          </p>
          <p className="lead" data-reveal>
            Today there are seven campsites from Santiago to Tuguegarao, each one with the same orange-and-forest camp, the same bold brews, and a
            cake case that changes every morning.
          </p>
          <div className="facts" data-stagger>
            <div>
              <b>2020</b>
              <span>Est. in Isabela</span>
            </div>
            <div>
              <b>7</b>
              <span>Campsites</span>
            </div>
            <div>
              <b>24/7</b>
              <span>Santiago never sleeps</span>
            </div>
          </div>
        </div>

        <div className="collage" data-parallax="0.12">
          <figure className="c1" data-reveal>
            <Img slug="interior-mural-tent-patches" alt="Black Bear dining area with the camp mural and patches" sizes="(min-width: 960px) 30vw, 58vw" />
            <figcaption>the campsite</figcaption>
          </figure>
          <figure className="c2" data-reveal data-delay="0.1">
            <Img slug="staff-kitchen-team-02" alt="Black Bear kitchen crew in Bear Hugs and Bold Brews shirts" sizes="(min-width: 960px) 24vw, 46vw" />
            <figcaption>the crew</figcaption>
          </figure>
          <figure className="c3" data-reveal data-delay="0.2">
            <Img slug="coffee-latte-art-pour" alt="Barista pouring latte art into a Black Bear cup" sizes="(min-width: 960px) 28vw, 52vw" />
            <figcaption>the bold brews</figcaption>
          </figure>
          <div className="bernie" data-reveal data-delay="0.3">
            <span className="hand">meet Bernie!</span>
            <Img slug="bernie-the-bear-meet" alt="Bernie the Bear, the Black Bear mascot" sizes="160px" />
          </div>
        </div>
      </div>
    </section>
  );
}
