"use client";
import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import MobileBar from "@/components/MobileBar";
import MotionToggle from "@/components/MotionToggle";
import CampPicker from "@/components/CampPicker";
import Img from "@/components/Img";
import {
  IconArrowRight,
  IconBookmark,
  IconCheck,
  IconPin,
} from "@/components/Icons";
import { branches } from "@/lib/data";
import { changeDemo, preparePhoto, useDemo } from "@/lib/demo-store";

export default function ClubPage() {
  const state = useDemo();
  const [camp, setCamp] = useState("cauayan-d1");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [photo, setPhoto] = useState("");
  const [formKey, setFormKey] = useState(0);
  const [previewError, setPreviewError] = useState("");
  const [activeTab, setActiveTab] = useState<"passport" | "crew" | "moments">(
    "passport",
  );
  const uploadVersion = useRef(0);
  useEffect(() => {
    if (window.location.hash === "#camp-moments") setActiveTab("moments");
    if (window.location.hash === "#crew") setActiveTab("crew");
    try {
      const saved = localStorage.getItem("bb-fav-camp");
      if (saved && branches.some((branch) => branch.id === saved))
        setCamp(saved);
    } catch {}
  }, []);
  const saveCamp = (id: string) => {
    setCamp(id);
    try {
      localStorage.setItem("bb-fav-camp", id);
      window.dispatchEvent(new Event("bb:favorite"));
      setMessage("Your campsite is saved on this device.");
    } catch {
      setMessage("Your browser could not save this preference.");
    }
  };
  const awardStamp = () => {
    if (state.stamps >= 6) return;
    const ok = changeDemo(
      (current) => ({ ...current, stamps: current.stamps + 1 }),
      "A simulated club visit added one demo stamp",
    );
    setMessage(
      ok
        ? "Demo stamp added. Real visits would be verified by the crew."
        : "Storage is full. This demo stamp could not be saved.",
    );
  };
  const redeem = () => {
    if (state.stamps < 6) return;
    const ok = changeDemo(
      (current) => ({
        ...current,
        stamps: current.stamps - 6,
        rewardHistory: [new Date().toISOString(), ...current.rewardHistory],
      }),
      "A proposed coffee reward was redeemed in the demo",
    );
    setMessage(
      ok
        ? "Demo reward redeemed. No real voucher or order has been created."
        : "Your browser could not save the demo reward.",
    );
  };
  const crew = state.crew.filter((person) => person.branch === camp);
  const approved = state.photos.filter((item) => item.approved);
  const pending = state.photos.filter((item) => !item.approved);
  return (
    <div className="club-page">
      <Header />
      <main id="main" className="app-main" tabIndex={-1}>
        <section className="club-hero wrap">
          <div>
            <span className="eyebrow">
              The Bear Scout Club · proposed program
            </span>
            <h1 className="display">
              Your camp.
              <br />
              Your people.
              <br />
              <span className="script">Your little perks.</span>
            </h1>
            <p className="lead">
              For first cups, familiar faces, and one more reason to come back.
              Make yourself a regular.
            </p>
            <div className="app-actions">
              <a className="btn" href="#passport">
                Try the club passport <IconArrowRight />
              </a>
              <a className="text-link" href="/menu">
                Explore the menu <IconArrowRight />
              </a>
            </div>
          </div>
          <div className="club-hero__photo">
            <Img
              slug="coffee-latte-art-two-cups"
              alt="Two cups of Black Bear coffee"
              sizes="(min-width:900px) 45vw,100vw"
              priority
            />
            <span className="hand">There&apos;s a place for you here.</span>
          </div>
        </section>
        <div className="wrap club-utilities">
          <details className="club-demo-details">
            <summary>About this concept preview</summary>
            <div className="inline-notice">
              <IconCheck />
              <p>
                <b>A working local preview.</b> Stamps, names, and photo
                challenges demonstrate the idea. Rewards, staff profiles, and
                program terms need Black Bear&apos;s approval. Nothing is sent
                to the shop.
              </p>
            </div>
          </details>
          <MotionToggle />
        </div>
        <nav className="club-tabs wrap" aria-label="Club sections">
          <button
            aria-pressed={activeTab === "passport"}
            onClick={() => {
              setActiveTab("passport");
              history.replaceState(null, "", "/club");
            }}
          >
            My passport
          </button>
          <button
            aria-pressed={activeTab === "crew"}
            onClick={() => {
              setActiveTab("crew");
              history.replaceState(null, "", "/club#crew");
            }}
          >
            The crew
          </button>
          <button
            aria-pressed={activeTab === "moments"}
            onClick={() => {
              setActiveTab("moments");
              history.replaceState(null, "", "/club#camp-moments");
            }}
          >
            Camp moments
          </button>
        </nav>
        {activeTab === "passport" && (
          <section className="wrap club-section" id="passport">
            <div className="app-section-head">
              <div>
                <span className="eyebrow">01 / Make it your camp</span>
                <h2 className="display h2">
                  The regular&apos;s
                  <br />
                  little passport.
                </h2>
              </div>
              <CampPicker value={camp} onChange={saveCamp}/>
            </div>
            <div className="passport-grid">
              <div className="passport">
                <div className="passport__head">
                  <span>BLACK BEAR / BEAR SCOUT</span>
                  <span>LOCAL DEMO</span>
                </div>
                <h3>
                  Good cups.
                  <br />
                  <span className="script">Even better company.</span>
                </h3>
                <div
                  className="stamp-grid"
                  aria-label={`${state.stamps} of 6 demo stamps collected`}
                >
                  {Array.from({ length: 6 }, (_, index) => (
                    <span
                      key={index}
                      className={index < state.stamps ? "is-stamped" : ""}
                    >
                      {index < state.stamps ? (
                        <IconCheck />
                      ) : (
                        String(index + 1).padStart(2, "0")
                      )}
                    </span>
                  ))}
                </div>
                <div className="passport__foot">
                  <b>{state.stamps} / 6 stamps</b>
                  <span>Proposed reward: one coffee</span>
                </div>
              </div>
              <div className="club-explainer">
                <h3 className="display h3">
                  A little thank-you
                  <br />
                  for showing up.
                </h3>
                <p>
                  One verified visit, one stamp. A shared passport could work
                  across all seven campsites, so your next stop still feels like
                  your usual.
                </p>
                <ol className="simple-steps">
                  <li>
                    <span>01</span>Choose your campsite
                  </li>
                  <li>
                    <span>02</span>Have the crew verify a visit
                  </li>
                  <li>
                    <span>03</span>Enjoy the proposed coffee reward
                  </li>
                </ol>
                <div className="app-actions">
                  {state.stamps < 6 ? (
                    <button className="btn" onClick={awardStamp}>
                      Simulate a visit +1 stamp
                    </button>
                  ) : (
                    <button className="btn" onClick={redeem}>
                      Try reward redemption
                    </button>
                  )}
                </div>
                <small>
                  Demo only. Six stamps is an illustrative rule; eligibility,
                  expiry, and reward value are not finalized.{" "}
                  {state.rewardHistory.length > 0 &&
                    `${state.rewardHistory.length} demo reward(s) tried.`}
                </small>
              </div>
            </div>
          </section>
        )}
        {activeTab === "crew" && (
          <section className="club-crew-band" id="crew">
            <div className="wrap club-section">
              <div className="app-section-head">
                <div>
                  <span className="eyebrow">02 / Familiar faces</span>
                  <h2 className="display h2">
                    The crew who
                    <br />
                    <span className="script">know your usual.</span>
                  </h2>
                </div>
                <p className="lead">
                  Pick a favorite crew profile and see a demo duty status. Real
                  names and schedules would be shared by the team with consent.
                </p>
              </div>
              <div className="crew-grid">
                {crew.length ? (
                  crew.map((person) => (
                    <article className="crew-card" key={person.id}>
                      <span className="crew-card__avatar" aria-hidden="true">
                        {person.name.slice(0, 1)}
                      </span>
                      <span className="concept-label">
                        Illustrative crew profile
                      </span>
                      <h3>{person.name}</h3>
                      <p>{person.specialty}</p>
                      <span
                        className={`crew-duty ${person.onDuty ? "is-on" : ""}`}
                      >
                        {person.onDuty ? "On duty in demo" : "Off duty in demo"}{" "}
                        ·{" "}
                        {
                          branches.find((branch) => branch.id === person.branch)
                            ?.short
                        }
                      </span>
                      <button
                        className="btn btn--small btn--cream"
                        aria-pressed={state.favoriteCrew === person.id}
                        onClick={() => {
                          const ok = changeDemo((current) => ({
                            ...current,
                            favoriteCrew:
                              current.favoriteCrew === person.id
                                ? null
                                : person.id,
                          }));
                          setMessage(
                            ok
                              ? "Crew preference updated locally. This does not request a shift or booking."
                              : "Could not save your preference.",
                          );
                        }}
                      >
                        <IconBookmark />
                        {state.favoriteCrew === person.id
                          ? "Your familiar face"
                          : "Save crew preference"}
                      </button>
                    </article>
                  ))
                ) : (
                  <div className="app-empty">
                    <h3>No demo crew at this camp yet.</h3>
                    <p>Add a profile in the workspace to see it here.</p>
                    <a className="text-link" href="/admin?tab=crew">
                      Open crew workspace <IconArrowRight />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
        {activeTab === "moments" && (
          <section className="wrap club-section" id="camp-moments">
            <div className="app-section-head">
              <div>
                <span className="eyebrow">03 / Made by the people at camp</span>
                <h2 className="display h2">
                  Your moments.
                  <br />
                  <span className="script">Our kind of magic.</span>
                </h2>
              </div>
              <p className="lead">
                A proposed monthly photo spotlight: share a moment from camp,
                let the crew review it, and celebrate a favorite with a coffee.
              </p>
            </div>
            <div className="community-grid">
              <div>
                <div className="photo-challenge">
                  <span className="pill">Proposed monthly spotlight</span>
                  <h3>
                    A cup. A corner.
                    <br />A good little moment.
                  </h3>
                  <p>
                    Show us what camp looks like through your eyes. Reward
                    concept: one coffee for the selected photo. This is not an
                    active contest.
                  </p>
                  <small>
                    Real participation rules, permission to reuse, and prize
                    terms require owner review.
                  </small>
                </div>
                <div className="community-wall">
                  {approved.length ? (
                    approved.map((item) => (
                      <figure key={item.id}>
                        <img src={item.src} alt={item.caption} />
                        <figcaption>
                          {item.winner && (
                            <b className="pill">Demo spotlight</b>
                          )}
                          <b>{item.caption}</b>
                          <span>
                            By {item.author} ·{" "}
                            {
                              branches.find(
                                (branch) => branch.id === item.branch,
                              )?.short
                            }
                          </span>
                        </figcaption>
                      </figure>
                    ))
                  ) : (
                    <div className="app-empty">
                      <h3>The next moment could be yours.</h3>
                      <p>
                        No customer submissions yet. Add a local photo, then
                        approve it in the workspace to see the full journey.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <form
                key={formKey}
                className="app-card photo-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (!photo || busy || state.photos.length >= 12) return;
                  const form = new FormData(event.currentTarget);
                  if (
                    !String(form.get("name")).trim() ||
                    !String(form.get("caption")).trim()
                  ) {
                    setPreviewError(
                      "Add a display name and a short caption before sharing.",
                    );
                    return;
                  }
                  const item = {
                    id: crypto.randomUUID(),
                    src: photo,
                    caption: String(form.get("caption")).trim(),
                    author: String(form.get("name")).trim(),
                    branch: camp,
                    approved: false,
                    winner: false,
                    created: new Date().toISOString(),
                  };
                  const ok = changeDemo(
                    (current) => ({
                      ...current,
                      photos: [...current.photos, item],
                    }),
                    `A photo was submitted locally for ${branches.find((branch) => branch.id === camp)?.short}`,
                  );
                  if (ok) {
                    setPhoto("");
                    setFormKey((key) => key + 1);
                    setMessage(
                      "Photo saved for local review. Open Workspace → Media to approve it.",
                    );
                  } else
                    setMessage(
                      "Browser storage is full. Try a smaller photo or remove a demo photo in the workspace.",
                    );
                }}
              >
                <span className="eyebrow">Share a camp moment</span>
                <h3 className="display h3">Your point of view.</h3>
                <label className="app-field">
                  <span>Display name</span>
                  <input
                    name="name"
                    maxLength={40}
                    required
                    placeholder="What should we call you?"
                  />
                </label>
                <label className="app-field">
                  <span>A little caption</span>
                  <input
                    name="caption"
                    maxLength={120}
                    required
                    placeholder="The good part of your day…"
                  />
                </label>
                <label className="app-field">
                  <span>Your photo · JPG, PNG, WebP · up to 8 MB</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    required
                    onChange={async (event) => {
                      const version = ++uploadVersion.current;
                      const file = event.target.files?.[0];
                      setPhoto("");
                      setPreviewError("");
                      if (!file) {
                        setBusy(false);
                        return;
                      }
                      setBusy(true);
                      try {
                        const prepared = await preparePhoto(file);
                        if (version === uploadVersion.current)
                          setPhoto(prepared);
                      } catch (error) {
                        if (version === uploadVersion.current)
                          setPreviewError(
                            error instanceof Error
                              ? error.message
                              : "Could not read the photo.",
                          );
                      } finally {
                        if (version === uploadVersion.current) setBusy(false);
                      }
                    }}
                  />
                </label>
                {photo && (
                  <img
                    className="photo-form__preview"
                    src={photo}
                    alt="Your photo preview before submission"
                  />
                )}
                {previewError && (
                  <p className="form-error" role="alert">
                    {previewError}
                  </p>
                )}
                <label className="check-field">
                  <input type="checkbox" required />
                  <span>
                    I took this photo and have permission from anyone shown. I
                    allow its use in this local website demo.
                  </span>
                </label>
                <button
                  className="btn"
                  type="submit"
                  disabled={!photo || busy || state.photos.length >= 12}
                >
                  {busy
                    ? "Preparing photo…"
                    : state.photos.length >= 12
                      ? "Demo photo limit reached"
                      : "Submit for local review"}
                </button>
                <small>
                  Saved only on this device. Never uploaded.{" "}
                  {pending.length > 0 &&
                    `${pending.length} ${pending.length === 1 ? "photo" : "photos"} awaiting local review.`}
                </small>
              </form>
            </div>
          </section>
        )}
        <div className="wrap app-end">
          <a className="text-link" href="/">
            Back to the campsite <IconArrowRight />
          </a>
          <a className="text-link" href="/pitch">
            See how it all connects <IconArrowRight />
          </a>
        </div>
      </main>
      <MobileBar />
      <div
        className={`app-toast ${message ? "is-on" : ""}`}
        role="status"
        aria-live="polite"
      >
        {message}
        {message && (
          <button
            aria-label="Dismiss notification"
            onClick={() => setMessage("")}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
