import Hero from "@/components/sections/Hero";
import Destinations from "@/components/sections/Destinations";
import Packages from "@/components/sections/Packages";
import Services from "@/components/sections/Services";
import CtaVideo from "@/components/sections/CtaVideo";
import StatsBar from "@/components/sections/StatsBar";
import WhyUs from "@/components/sections/WhyUs";
import About from "@/components/sections/About";
import Trips from "@/components/sections/Trips";
import Dreaming from "@/components/sections/Dreaming";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Destinations />
      <Packages />
      <Services />
      <CtaVideo />
      <StatsBar />
      <WhyUs />
      <About />
      <Trips />
      <Dreaming />
      <Contact />
    </>
  );
}
