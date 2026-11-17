import LogoMotion from "./LogoMotion";
import MotionToggle from "./MotionToggle";

export default function AppNav({
  active,
}: {
  active: "club" | "admin" | "pitch";
}) {
  return (
    <>
      <a href="#app-main" className="skip-link">
        Skip to content
      </a>
      <header className="app-nav">
        <a className="app-nav__brand" href="/" aria-label="Black Bear home">
          <LogoMotion />
          <span>
            <b className="wordmark">Black Bear</b>
            <small>KITCHEN + COFFEE</small>
          </span>
        </a>
        <nav aria-label="Website views">
          <a href="/">Visit</a>
          <a href="/club" aria-current={active === "club" ? "page" : undefined}>
            The club
          </a>
          <a
            href="/admin"
            aria-current={active === "admin" ? "page" : undefined}
          >
            Workspace
          </a>
          <a
            href="/pitch"
            aria-current={active === "pitch" ? "page" : undefined}
          >
            The pitch <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>
      <div className="prototype-strip">
        <span className="prototype-strip__dot" /> Frontend demo · saved on this
        device
        <MotionToggle />
      </div>
    </>
  );
}
