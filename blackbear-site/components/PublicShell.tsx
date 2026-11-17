import Header from "./Header";
import MobileBar from "./MobileBar";
import Motion from "./Motion";
import MotionToggle from "./MotionToggle";
import Preloader from "./Preloader";
import { brand } from "@/lib/data";

export default function PublicShell({
  children,
  title,
  home = false,
}: {
  children: React.ReactNode;
  title?: string;
  home?: boolean;
}) {
  return (
    <div className={`public-site ${home ? "public-site--home" : ""}`}>
      <Preloader />
      <Header />
      <main id="main" className="public-main" tabIndex={-1}>
        {title && <h1 className="sr-only">{title}</h1>}
        {children}
      </main>
      <footer className="public-footer">
        <div className="wrap">
          <span>
            Black Bear Kitchen + Coffee <small>Concept preview</small>
          </span>
          <nav aria-label="More from Black Bear">
            <a href="/story">Our story</a>
            <a href="/events">Gatherings</a>
            <a href="/gallery">Life at camp</a>
            <a href="/admin">Team workspace</a>
            <a href="/pitch">The pitch</a>
            <a href={`mailto:${brand.email}`}>Say hello</a>
          </nav>
          <MotionToggle />
        </div>
      </footer>
      <MobileBar />
      <Motion />
    </div>
  );
}
