import AboutSection from "./components/AboutSection";
import CartBar from "./components/CartBar";
import Checkout from "./components/Checkout";
import MenuSection from "./components/MenuSection";
import ModeDialog from "./components/ModeDialog";
import ProductDialog from "./components/ProductDialog";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import { StoreProvider } from "./components/StoreProvider";

export default function Home() {
  return (
    <StoreProvider>
      <SiteHeader />
      <main>
        <MenuSection />
        <AboutSection />
      </main>
      <SiteFooter />
      <ModeDialog />
      <ProductDialog />
      <CartBar />
      <Checkout />
    </StoreProvider>
  );
}
