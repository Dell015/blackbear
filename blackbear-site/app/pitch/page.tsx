"use client";
import { useState } from "react";
import AppNav from "@/components/AppNav";
import LogoMotion from "@/components/LogoMotion";
import { IconArrowRight, IconCheck } from "@/components/Icons";
import { useDemo } from "@/lib/demo-store";

const audiences = [
  {
    id: "first",
    label: "First-time guest",
    title: "Make the first visit feel familiar.",
    problem: "“What is this place, what should I order, and where do I go?”",
    benefit:
      "A clear introduction, signature dishes with real prices, a searchable menu, and seven campsites with direct calls and directions.",
    features: [
      "A recognizable Black Bear welcome",
      "Kitchen favorites and featured drink series",
      "Menu search, dietary tags, and cup sizes",
      "A saved campsite, directions, and a one-tap call",
    ],
    link: "/",
    action: "Explore the customer experience",
  },
  {
    id: "regular",
    label: "The regular",
    title: "Give a familiar face a reason to return.",
    problem:
      "“What’s in the cake case? Is my favorite crew around? What’s new?”",
    benefit:
      "A branch-aware Cake Story, short notes from the camp, crew preferences, a proposed reward passport, and a customer photo spotlight.",
    features: [
      "Local branch updates and unavailable-item labels",
      "A proposed cross-campsite stamp passport",
      "Favorite crew profiles and demo duty status",
      "Photo submissions, review, and a monthly spotlight concept",
    ],
    link: "/club",
    action: "Try the Bear Scout Club",
  },
  {
    id: "team",
    label: "The crew",
    title: "Less explaining. More good service.",
    problem: "“We need a simple way to keep today’s information in one place.”",
    benefit:
      "A focused campsite desk for cake lineups, notes, and item availability. A shared photo pool keeps the brand consistent without hunting through chats.",
    features: [
      "Publish a local cake lineup and branch note",
      "Flag a menu item unavailable at one campsite",
      "Reuse approved photos across branch updates",
      "Keep public crew introductions and duty flags current",
    ],
    link: "/admin?tab=camps",
    action: "Open the campsite desk",
  },
  {
    id: "owner",
    label: "The owner",
    title: "Seven campsites. One quick look.",
    problem:
      "“Which branches need attention, and what can I do from my phone?”",
    benefit:
      "A compact overview of today’s local updates, availability flags, photo reviews, and demo crew status, with a direct path to the next task.",
    features: [
      "A seven-branch daily review overview",
      "A shared menu with per-branch availability",
      "One image library and a customer review queue",
      "An activity feed that makes local changes visible",
    ],
    link: "/admin",
    action: "Open the owner overview",
  },
];
const features = [
  {
    number: "01",
    name: "The public campsite",
    text: "A branded, responsive website that introduces Black Bear and turns interest into a menu browse, call, or visit.",
    href: "/",
    label: "Explore the site",
  },
  {
    number: "02",
    name: "A menu people can use",
    text: "A coffee-first menu with a plain category index, search across drinks, kitchen and cakes, quick photo views, saved picks, and branch availability notes.",
    href: "/menu",
    label: "Browse the menu",
  },
  {
    number: "03",
    name: "A reason to come back",
    text: "A working demo stamp card, crew preferences, and a proposed photo spotlight with a clear review process.",
    href: "/club",
    label: "Try the Club",
  },
  {
    number: "04",
    name: "A campsite publishing desk",
    text: "Choose a branch, update its cake case, special, event and crew note, then see the result on the customer side in this browser.",
    href: "/admin?tab=camps",
    label: "Publish a demo update",
  },
  {
    number: "05",
    name: "An owner’s daily overview",
    text: "See which camps need a review, how many items are unavailable, and which customer photos need attention.",
    href: "/admin",
    label: "See the overview",
  },
  {
    number: "06",
    name: "A shared creative pool",
    text: "Choose existing brand assets, review a local customer submission, and reuse an approved image at a campsite.",
    href: "/admin?tab=media",
    label: "Open the media pool",
  },
  {
    number: "07",
    name: "A map that feels like Black Bear",
    text: "Explore real streets on a cream-and-forest map. Selecting a campsite moves to its area. An optional location button finds the closest area, with direct links to business directions. Shop pins still need owner verification.",
    href: "/campsites",
    label: "Explore the campsites",
  },
];

export default function PitchPage() {
  const [pitchTab, setPitchTab] = useState("tour");
  const [audience, setAudience] = useState(0);
  const state = useDemo();
  const current = audiences[audience];
  return (
    <div className="pitch-page">
      <AppNav active="pitch" />
      <main id="app-main" tabIndex={-1}>
        <section className="pitch-hero">
          <div className="wrap">
            <div className="pitch-hero__top">
              <span className="eyebrow">Black Bear / the website concept</span>
              <span className="pitch-edition">
                A CLIENT PRESENTATION
                <br />
                FRONTEND PROTOTYPE / 01
              </span>
            </div>
            <h1 className="display">
              One familiar brand.
              <br />
              Every campsite
              <br />
              <span className="script">a little more connected.</span>
            </h1>
            <div className="pitch-hero__bottom">
              <p className="lead">
                A place for customers to discover the camp, for regulars to feel
                remembered, and for the team to keep seven campsites moving
                together.
              </p>
              <div className="app-actions">
                <a
                  href="#walkthrough"
                  className="btn btn--cream"
                  onClick={() => setPitchTab("tour")}
                >
                  Walk through the idea <IconArrowRight />
                </a>
                <a href="/admin" className="text-link">
                  Open the working demo <IconArrowRight />
                </a>
              </div>
            </div>
            <div className="pitch-proof">
              <span>
                <IconCheck /> Real source menu and photos
              </span>
              <span>
                <IconCheck /> Responsive customer & workspace views
              </span>
              <span>
                <IconCheck /> Working browser-local interactions
              </span>
            </div>
          </div>
        </section>
        <nav className="pitch-tabs" aria-label="Pitch sections">
          <div className="wrap">
            {[
              { id: "tour", label: "The experience" },
              { id: "features", label: "Working features" },
              { id: "workflow", label: "How it connects" },
              { id: "brand", label: "Brand & motion" },
              { id: "roadmap", label: "Next phase" },
            ].map((item) => (
              <button
                key={item.id}
                aria-pressed={pitchTab === item.id}
                onClick={() => setPitchTab(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
        <section
          className="wrap pitch-section"
          id="walkthrough"
          hidden={pitchTab !== "tour"}
        >
          <div className="app-section-head">
            <div>
              <span className="eyebrow">01 / Designed around real visits</span>
              <h2 className="display h2">
                One website.
                <br />A different kind of useful.
              </h2>
            </div>
            <p className="lead">
              The same identity, with the right information for the person using
              it. Choose a perspective to walk through its value.
            </p>
          </div>
          <div
            className="audience-tabs"
            role="group"
            aria-label="Choose a website perspective"
          >
            {audiences.map((item, index) => (
              <button
                key={item.id}
                aria-pressed={audience === index}
                onClick={() => setAudience(index)}
              >
                <small>0{index + 1}</small>
                {item.label}
              </button>
            ))}
          </div>
          <article className="audience-panel" key={current.id}>
            <div>
              <span className="eyebrow">{current.label}</span>
              <blockquote>{current.problem}</blockquote>
              <h3>{current.title}</h3>
              <p>{current.benefit}</p>
              <a className="btn" href={current.link}>
                {current.action}
                <IconArrowRight />
              </a>
            </div>
            <div className="audience-panel__features">
              <span className="eyebrow">What the experience provides</span>
              {current.features.map((feature, index) => (
                <div key={feature}>
                  <span>0{index + 1}</span>
                  <p>{feature}</p>
                  <IconCheck />
                </div>
              ))}
              <div className="audience-panel__next">
                <small>Perspective {audience + 1} of 4</small>
                <button
                  className="text-link"
                  onClick={() =>
                    setAudience((value) => (value + 1) % audiences.length)
                  }
                >
                  Next perspective <IconArrowRight />
                </button>
              </div>
            </div>
          </article>
        </section>
        <section className="pitch-connected" hidden={pitchTab !== "workflow"}>
          <div className="wrap pitch-section">
            <div className="app-section-head">
              <div>
                <span className="eyebrow">02 / A connected local demo</span>
                <h2 className="display h2">
                  Make an update.
                  <br />
                  <span className="script">See the difference.</span>
                </h2>
              </div>
              <p className="lead">
                The frontend shares a small local data store. A branch update,
                reward action, or approved photo carries across views on this
                device.
              </p>
            </div>
            <div className="connection-flow">
              <a href="/admin?tab=camps">
                <span>THE CREW</span>
                <b>Update the campsite</b>
                <small>Cakes, notes, availability</small>
              </a>
              <span aria-hidden="true">→</span>
              <div>
                <span>ONE LOCAL SOURCE</span>
                <b>Black Bear</b>
                <small>Shared menu, camps & media</small>
              </div>
              <span aria-hidden="true">→</span>
              <a href="/club">
                <span>THE CUSTOMER</span>
                <b>Find something worth a visit</b>
                <small>Discover, save, return, share</small>
              </a>
            </div>
            <div className="pitch-local-stats">
              <span>
                <b>
                  {
                    Object.values(state.camps).filter((item) => item.updated)
                      .length
                  }
                </b>{" "}
                camps with local updates
              </span>
              <span>
                <b>{state.photos.length}</b> local photo submissions
              </span>
              <span>
                <b>{state.stamps}</b> stamps on this device
              </span>
              <span>
                <b>{state.activity.length}</b> local activity entries
              </span>
            </div>
            <p className="pitch-small">
              These figures reflect interactions in this browser. They are not
              business performance metrics.
            </p>
          </div>
        </section>
        <section
          className="wrap pitch-section"
          hidden={pitchTab !== "features"}
        >
          <div className="app-section-head">
            <div>
              <span className="eyebrow">03 / Ready to demonstrate</span>
              <h2 className="display h2">
                More than
                <br />a good first look.
              </h2>
            </div>
            <p className="lead">
              Each feature below has an interactive frontend you can open during
              the pitch.
            </p>
          </div>
          <div className="pitch-feature-grid">
            {features.map((feature) => (
              <a
                key={feature.number}
                href={feature.href}
                className="pitch-feature"
              >
                <span className="pitch-feature__number">
                  {feature.number} /
                </span>
                <span className="pill">Working local demo</span>
                <h3>{feature.name}</h3>
                <p>{feature.text}</p>
                <span className="text-link">
                  {feature.label}
                  <IconArrowRight />
                </span>
              </a>
            ))}
          </div>
        </section>
        <section className="pitch-brand-band" hidden={pitchTab !== "brand"}>
          <div className="wrap pitch-brand-grid">
            <div>
              <span className="eyebrow">
                04 / Still unmistakably Black Bear
              </span>
              <h2 className="display h2">
                A familiar face.
                <br />
                <span className="script">A little more life.</span>
              </h2>
              <p className="lead">
                The supplied bear badge, engraved illustration style, orange
                and forest palette, and bold typography stay at the heart of
                the experience. A layered camp scene gives Bernie a small story:
                he follows a firefly, then sits to watch it.
              </p>
              <ul className="pitch-checks">
                <li>
                  <IconCheck /> A short logo entrance and a quiet hover response
                </li>
                <li>
                  <IconCheck /> Brief food outlines, soft page transitions,
                  scroll reveals, and responsive controls
                </li>
                <li>
                  <IconCheck /> Reduced-motion support and keyboard navigation
                </li>
              </ul>
            </div>
            <LogoMotion showcase />
          </div>
        </section>
        <section className="wrap pitch-section" hidden={pitchTab !== "roadmap"}>
          <div className="app-section-head">
            <div>
              <span className="eyebrow">05 / A clear path forward</span>
              <h2 className="display h2">
                Start with the experience.
                <br />
                Grow the operations.
              </h2>
            </div>
            <p className="lead">
              The prototype proves the workflows. A production phase would
              connect them securely across people, devices, and branches.
            </p>
          </div>
          <div className="roadmap-grid">
            <article>
              <span className="pill">Built now / frontend</span>
              <h3>Make the idea tangible.</h3>
              <ul>
                <li>Responsive branded customer website</li>
                <li>Coffee-first menu with integrated cakes and quick views</li>
                <li>Themed street map and campsite-specific examples</li>
                <li>Local cake, special, event, and availability publishing</li>
                <li>Demo loyalty passport and crew preferences</li>
                <li>Local photo submission and approval flow</li>
                <li>Owner overview and shared media library</li>
              </ul>
            </article>
            <article>
              <span className="pill">Next / needs a backend</span>
              <h3>Connect the real camps.</h3>
              <ul>
                <li>Staff sign-in and role-based access</li>
                <li>Shared database and cross-device updates</li>
                <li>Verified visits, reward rules, and vouchers</li>
                <li>Secure photo storage, consent, and moderation</li>
                <li>Pickup requests and customer notifications</li>
                <li>POS integration and real business reporting</li>
              </ul>
            </article>
            <article>
              <span className="pill">Before a real launch</span>
              <h3>Make it Black Bear&apos;s.</h3>
              <ul>
                <li>Owner approval of content and program terms</li>
                <li>Confirmed branch hours, addresses, and pins</li>
                <li>Original brand files and photo usage rights</li>
                <li>Consented staff profiles and schedules</li>
                <li>Clear privacy, photo, and loyalty policies</li>
                <li>Production hosting and operational testing</li>
              </ul>
            </article>
          </div>
          <div className="pitch-faq">
            <details>
              <summary>Does this work without a backend?</summary>
              <p>
                Yes, as a frontend prototype. Demo changes persist in this
                browser using local storage and can appear across tabs on the
                same origin. They are not shared with another device or a real
                branch.
              </p>
            </details>
            <details>
              <summary>Is the workspace secure for real operations?</summary>
              <p>
                It is an openly accessible demonstration with no authentication.
                Do not use it for private staff data, customer records,
                transactions, or actual rewards. Production access and auditing
                belong in the next phase.
              </p>
            </details>
            <details>
              <summary>
                Are the rewards and photo spotlight already offered?
              </summary>
              <p>
                No. They are proposals to discuss with Black Bear. Stamps are
                simulated, no voucher is issued, and no actual prize is
                promised. The owner would approve rules and terms before launch.
              </p>
            </details>
            <details>
              <summary>What does the owner gain from the full version?</summary>
              <p>
                A common source for branch information, a faster path to the
                camps that need attention, a consistent menu and image library,
                and a clearer view of customer engagement. Real analytics and
                revenue impact would need a production system and measurement.
              </p>
            </details>
          </div>
        </section>
        <section className="pitch-close">
          <div className="wrap">
            <span className="eyebrow">The next conversation</span>
            <h2 className="display">
              More good visits.
              <br />
              <span className="script">Less everyday friction.</span>
            </h2>
            <p>
              Start with one camp. Refine it with the crew. Bring the rest
              along.
            </p>
            <div className="app-actions">
              <a className="btn btn--cream" href="/">
                Explore the campsite <IconArrowRight />
              </a>
              <a className="btn btn--outline-light" href="/admin">
                Try the workspace <IconArrowRight />
              </a>
              <button className="text-link" onClick={() => window.print()}>
                Print pitch overview
              </button>
            </div>
            <small>
              Black Bear Kitchen + Coffee · website concept preview · frontend
              only
            </small>
          </div>
        </section>
      </main>
    </div>
  );
}
