import SiteChrome from "@/components/SiteChrome";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Unboxing from "@/components/Unboxing";
import Promise from "@/components/Promise";
import ThreeScents from "@/components/ThreeScents";
import Packaging from "@/components/Packaging";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <SiteChrome />
      <Hero />
      <Benefits />
      <Unboxing />
      <Promise />
      <ThreeScents />
      <Packaging />
      <Footer />
    </main>
  );
}
