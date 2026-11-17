"use client";
import { useCallback, useEffect, useState } from "react";
import { campfireNotes, gallery, brand } from "@/lib/data";
import { useDialog } from "@/lib/useDialog";
import Img from "./Img";
import {
  IconArrowLeft,
  IconArrowRight,
  IconClose,
  IconInstagram,
} from "./Icons";

const captions: Record<string, string> = {
  "interior-mural-tent-patches": "A little camp, right in the city.",
  "ghost-shoot-08-group": "The crew, in full camp spirit.",
  "interior-lounge-bear-window": "Your new favorite corner.",
  "coffee-latte-art-pour": "A little care in every cup.",
  "interior-bernie-poster-wall": "Bernie makes himself at home.",
  "ghost-shoot-04-table": "Good company comes in all forms.",
  "interior-communal-table": "There is always room at the table.",
  "staff-kitchen-team-02": "Meet the people behind your favorites.",
  "exterior-logo-window-sign": "Follow the bear.",
  "ghost-shoot-06-bar": "Spirited service at the coffee bar.",
  "interior-counter-menu-boards": "Decisions, decisions.",
  "coffee-espresso-shots": "The start of something bold.",
  "interior-bear-hugs-wall-sign": "Bear hugs & bold brews.",
  "ghost-shoot-01-logo-sign": "The occasional friendly ghost.",
  "exterior-green-door-entrance": "Come on in. Stay a while.",
};

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const [visiblePhotos, setVisiblePhotos] = useState(6);
  const close = useCallback(() => setSelected(null), []);
  const dialog = useDialog<HTMLDivElement>(selected !== null, close);
  const move = useCallback(
    (direction: number) =>
      setSelected((index) =>
        index === null
          ? null
          : (index + direction + gallery.length) % gallery.length,
      ),
    [],
  );
  useEffect(() => {
    if (selected === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        move(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        move(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, move]);

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
                Good company.
                <br />
                Great little moments.
              </h2>
            </div>
            <p className="lead" data-reveal>
              Pendant lights, familiar faces, and a crew that doesn&apos;t take
              itself too seriously. A few moments from our side of the coffee
              bar.
            </p>
          </div>
          <div className="masonry" data-stagger>
            {gallery.slice(0, visiblePhotos).map((image, index) => (
              <button
                className="gallery__photo"
                key={image}
                onClick={() => setSelected(index)}
                aria-label={`View photo ${index + 1}: ${captions[image]}`}
                aria-haspopup="dialog"
              >
                <Img
                  slug={image}
                  alt={captions[image]}
                  sizes="(min-width: 1100px) 25vw, (min-width: 760px) 33vw, 50vw"
                />
                <span className="gallery__expand" aria-hidden="true">
                  ↗
                </span>
              </button>
            ))}
          </div>
          {visiblePhotos < gallery.length && (
            <button
              className="btn btn--cream gallery__more"
              onClick={() =>
                setVisiblePhotos((count) => Math.min(count + 6, gallery.length))
              }
            >
              More camp moments ({gallery.length - visiblePhotos})
            </button>
          )}
          <div className="gallery__foot">
            <span>Little moments, big bear energy.</span>
            <span>
              Tap a photo to step inside <span aria-hidden="true">↗</span>
            </span>
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
                A little more
                <br />
                Black Bear.
              </h2>
            </div>
            <div className="notes__intro">
              <p className="lead" data-reveal>
                New drinks, camp moments, and the occasional meme. Keep in touch
                with the crew.
              </p>
              <a
                className="btn"
                href={brand.instagram}
                target="_blank"
                rel="noreferrer"
              >
                <IconInstagram /> Follow along
              </a>
            </div>
          </div>
          <div className="notes__grid" data-stagger>
            {campfireNotes.slice(0, 4).map((note) => (
              <a
                className="note"
                key={note.image}
                href={brand.instagram}
                target="_blank"
                rel="noreferrer"
              >
                <Img
                  slug={note.image}
                  alt={note.title}
                  sizes="(min-width: 900px) 25vw, 50vw"
                />
                <span>
                  {note.title} <span aria-hidden="true">↗</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <div
        ref={dialog}
        className={`lightbox ${selected !== null ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Life at camp photo viewer"
        aria-hidden={selected === null}
        inert={selected === null}
        tabIndex={-1}
        data-lenis-prevent
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <button
          className="round lightbox__close"
          aria-label="Close photo viewer"
          onClick={close}
        >
          <IconClose />
        </button>
        {selected !== null && (
          <>
            <figure className="lightbox__figure" key={selected}>
              <Img
                slug={gallery[selected]}
                alt={captions[gallery[selected]]}
                sizes="(min-width: 900px) 75vw, 100vw"
                priority
              />
              <figcaption aria-live="polite">
                {captions[gallery[selected]]}
              </figcaption>
            </figure>
            <div className="lightbox__controls">
              <button
                className="round"
                aria-label="Previous photo"
                onClick={() => move(-1)}
              >
                <IconArrowLeft />
              </button>
              <span aria-live="polite">
                {String(selected + 1).padStart(2, "0")} / {gallery.length}
              </span>
              <button
                className="round"
                aria-label="Next photo"
                onClick={() => move(1)}
              >
                <IconArrowRight />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
