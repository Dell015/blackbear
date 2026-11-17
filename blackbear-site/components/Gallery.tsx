import { campfireNotes, gallery, brand } from "@/lib/data";
import Img from "./Img";
import { IconInstagram } from "./Icons";

const ALT: Record<string, string> = {
  ghost: "Black Bear crew in ghost costumes and sunglasses at the café",
  interior: "Inside a Black Bear campsite",
  exterior: "Black Bear storefront",
  coffee: "Coffee at Black Bear",
  staff: "Black Bear crew",
};
const alt = (s: string) => ALT[s.split("-")[0]] ?? "Black Bear";

export default function Gallery() {
  return (
    <>
      <section className="section section--ink gallery" id="gallery">
        <div className="wrap">
          <div className="section-head section-head--split">
            <div>
              <span className="eyebrow" data-reveal>
                Life at camp
              </span>
              <h2 className="display h2" data-reveal>
                Big tables. Bold brews. The occasional ghost.
              </h2>
            </div>
            <p className="lead" data-reveal>
              Pendant lights, terrazzo tables, the camp mural, and a crew that doesn&apos;t take itself too seriously.
            </p>
          </div>
          <div className="masonry" data-stagger>
            {gallery.map((g) => (
              <figure key={g}>
                <Img slug={g} alt={alt(g)} sizes="(min-width: 1100px) 25vw, (min-width: 760px) 33vw, 50vw" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section notes" id="notes">
        <div className="wrap">
          <div className="section-head section-head--split">
            <div>
              <span className="eyebrow" data-reveal>
                From the campfire
              </span>
              <h2 className="display h2" data-reveal>
                Latest on the feed
              </h2>
            </div>
            <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
              <p className="lead" style={{ margin: 0 }} data-reveal>
                Promos, new drinks and the occasional meme. Follow along on Instagram.
              </p>
              <a className="btn" href={brand.instagram} target="_blank" rel="noreferrer">
                <IconInstagram /> {brand.instagramHandle}
              </a>
            </div>
          </div>
          <div className="notes__grid" data-stagger>
            {campfireNotes.map((n) => (
              <a className="note" key={n.image} href={brand.instagram} target="_blank" rel="noreferrer">
                <Img slug={n.image} alt={n.title} sizes="(min-width: 900px) 25vw, 50vw" />
                <span>{n.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
