import ScrollGauge from "./ScrollGauge";
import Hero from "./Hero";
import DispatchStrip from "./DispatchStrip";
import HowItWorks from "./HowItWorks";
import MenuPlate from "./MenuPlate";
import ContactPanel from "./ContactPanel";
import SiteFooter from "./SiteFooter";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <ScrollGauge phoneDisplay="923 921 581" phoneHref="tel:+34923921581" />
      <main className="flex flex-1 flex-col">
        <Hero />
        <DispatchStrip />
        <HowItWorks />
        <MenuPlate />
        <ContactPanel />
      </main>
      <SiteFooter />
    </div>
  );
}
