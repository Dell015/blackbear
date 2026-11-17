import Motion from "@/components/Motion";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Story from "@/components/Story";
import Fuel from "@/components/Fuel";
import Menu from "@/components/Menu";
import Series from "@/components/Series";
import Cakes from "@/components/Cakes";
import Campsites from "@/components/Campsites";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";
import VisitGuide from "@/components/VisitGuide";
import ClubPreview from "@/components/ClubPreview";

export default function Page() {
  return (
    <>
      <Preloader />
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Ticker />
        <VisitGuide />
        <Story />
        <Fuel />
        <Series />
        <Menu />
        <Cakes />
        <Campsites />
        <Events />
        <ClubPreview />
        <Gallery />
      </main>
      <Footer />
      <MobileBar />
      <Motion />
    </>
  );
}
